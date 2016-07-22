#!/usr/bin/env node


'use strict';


var async       = require('async'),
    fs          = require('fs'),
    path        = require('path'),
    Converter   = require("csvtojson").Converter,
    turf        = require('turf'),
    _           = require('lodash'),

    gtfsDataDir = path.join(__dirname, '../../Subway_GTFS_Data/');


// Make these config options.
var LOG_STATS = true,
    DEVIANCE_THRESHOLD = 50;  // How many feet to allow between GTFS stop location
                              // and its projection onto the path
                              // before logging the deviance.
var logOutput = '';


var miniCases = 0,  // Cases where simple minification worked.
    lsqCases = 0;   // Cases requiring least squares fit.



// Used in async.parallel to run the required GTFS data parsers.
var gtfsFileParsers = {
    shapeID2Coords : getShapeID2Coords,
    tripID2ShapeID : getTripID2ShapeID,
    tripID2StopIDs : getTripID2StopIDs,
    stopID2Coords  : getStopIDToCoords,
};



// Starts the ball rolling...
async.parallel(gtfsFileParsers, buildTheSpatialDataDictionary);



// The main function that brings it all together.
function buildTheSpatialDataDictionary (err, results) {
    var theSpatialData = { paths     : results.shapeID2Coords ,
                           tripStops : {}                     , } ,
        statsString;


    if (err) { console.log(err); return; }

    console.time('buildTheSpatialDataDictionary');

    // Fit the stops to the paths.
    _.forEach(results.tripID2ShapeID, function (shapeID, tripID) {

        var tripKey        = tripID.substring(9),
            stopIDs        = results.tripID2StopIDs[tripID],
            waypointCoords = results.shapeID2Coords[shapeID],

            stopPointCoords = stopIDs.map(function(stopID) { return results.stopID2Coords[stopID]; }),

            stopsToPathKey = stopIDs.join(',') + shapeID,

            stopProjections;


        if ( ! waypointCoords ) { return; } // Some trips don't have a shape.


        stopProjections = fitStopsToPath(stopsToPathKey, stopPointCoords, waypointCoords, tripID);

        if (stopProjections) {
            theSpatialData.tripStops[tripKey] = {
                stops : stopProjections,
            };
        } else {
            logOutput += ('\n\n!!! WARNING: No projections for ' + tripID + ' !!!\n\n');
        }
    });


    console.timeEnd('buildTheSpatialDataDictionary');

    statsString = '\n============================== Statistics ================================\n' +
                  '\tSimple Minimization Cases : ' + miniCases + '\n' +
                  '\tLeast Squares Fit Cases   : ' + lsqCases + '\n' +
                  '============================================================================\n\n\n';

    results = null; // Allow garbage collection of no-longer-needed GTFS data before stringifying the result.
    fs.writeFile(gtfsDataDir + 'GTFS_Spatial_Data.json', 
                 JSON.stringify(theSpatialData));

    if (logOutput && LOG_STATS) {
        fs.writeFile(gtfsDataDir + 'log.out', statsString + logOutput);
    }
}



var fitStopsToPath = _.memoize(function (stopsToPathKey, stopPointCoords, waypointCoords, tripID) {
    var stopPoints      = getGeoJSPointsForGTFSPoints(stopPointCoords),
        waypoints       = getGeoJSPointsForGTFSPoints(waypointCoords),
        pathSegments    = getGeoJSLineSegmentsForGTFSPathWaypoints(waypointCoords),

        theTable        = getStopsProjectedToPathSegmentsTable(stopPoints, waypoints, pathSegments),

        stopProjections = trySimpleMinification(theTable);


        if ( ! stopProjections ) {
            logOutput += '\nWARNING: Trip ' + tripID + ' required the least squares fitting algorithm.\n\n';
            stopProjections = fitStopsToPathUsingLeastSquares(theTable);
        }

        if (LOG_STATS) {
            logStatsForStopsToPathProjection(stopProjections, tripID);
        }

    return stopProjections;
});


function logStatsForStopsToPathProjection (stopProjections, tripID) {
    var numExceedingThreshold = 0,
        maxDeviation          = _.first(stopProjections).deviation * 5280,
        i;

    for (i=0; i < stopProjections.length; ++i) {
        if ((stopProjections[i].deviation * 5280) > DEVIANCE_THRESHOLD) {
            ++numExceedingThreshold;
            if ((stopProjections[i].deviation * 5280) > maxDeviation) {
              maxDeviation = stopProjections[i].deviation * 5280;  
            }
        }
    }

    // TODO: Add mean and stdDev to the stats.
    if (numExceedingThreshold) {
        logOutput +=  '\n======================= Deviation Threshold Exceeded =======================\n' +
                    'Trip ID: '+ tripID + '\n' +
                    '\tNumber of projected stops exceeding the deviation threshold : ' +
                    numExceedingThreshold + '\n' +
                    '\tMax deviation: ' + maxDeviation + ' feet.' + '\n' + 
                    '============================================================================\n';
    }


}


// O(S W lg W) where S is the number of stops, W is the number of waypointCoords in the path.
function trySimpleMinification (theTable) {
    var possibleOptimal = theTable.map(function (row) {
        return _.first(_.sortByAll(row, ['deviation', 'snapped_dist_traveled'])); 
    });


    function invariantCheck (projectedPointA, projectedPointB) {
        return (projectedPointA.snapped_dist_traveled <= projectedPointB.snapped_dist_traveled);
    }

    if (_.every(_.rest(possibleOptimal), function (currPossOpt, i) { return invariantCheck(possibleOptimal[i], currPossOpt); })) {
        ++miniCases;
        return possibleOptimal;
    } else {
        return null;
    }
}


// Finds the stops-to-path fitting with the minimum 
//      total squared distance between stops and their projection onto path line segments
//      while maintaining the strong no-backtracking constraint.
//
// O(SW^2) where S is the number of stops, W is the number of waypointCoords in the path.
//
// NOTE: O(S W lg^2 W) is possible by using Willard's range trees on each row to find the optimal
//       cell from the previous row from which to advance.
function fitStopsToPathUsingLeastSquares (theTable) {

    var bestAssignmentOfSegments;

    ++lsqCases; 

    // Initialize the first row.
    _.forEach(_.first(theTable), function (cell) { 
        cell.cost = (cell.deviation * cell.deviation);
        cell.path = [cell.segmentNum];
    });

    // Do dynamic programing...
    _.forEach(_.rest(theTable), function (stopRow, i) {
        _.forEach(stopRow, function (thisCell) {

            var bestFromPreviousRow = {
                cost : Number.POSITIVE_INFINITY,
            };

            _.forEach(theTable[i], function (fromCell) {
                if ((fromCell.snapped_dist_traveled <= thisCell.snapped_dist_traveled) && 
                    (fromCell.cost < bestFromPreviousRow.cost)) {

                    bestFromPreviousRow = fromCell;
                }
            });

            thisCell.cost = bestFromPreviousRow.cost + (thisCell.deviation * thisCell.deviation);

            if (thisCell.cost < Number.POSITIVE_INFINITY) {
                thisCell.path = bestFromPreviousRow.path.slice(0); // This can be done once.
                thisCell.path.push(thisCell.segmentNum);
            } else {
                thisCell.path = null;
            }
        });
    });


    // Did we find a path that works satisfies the constraint???
    if ((bestAssignmentOfSegments = _.min(_.last(theTable), 'cost').path)) {

        return bestAssignmentOfSegments.map(function (segmentNum, stopIndex) {
            var bestProjection = theTable[stopIndex][segmentNum];

            return {
                segmentNum            : segmentNum                           ,
                snapped_coords        : bestProjection.snapped_coords        ,
                snapped_dist_traveled : bestProjection.snapped_dist_traveled ,
                deviation             : bestProjection.deviation             , 
                // Kept for analyzing the GTFS data. Not necessary for GTFSr to SIRI mapping.
            };
        });

    } else {

        return null;
    }
}


function getGeoJSPointsForGTFSPoints (gtfsPts) {
    return gtfsPts.map(function (pt) {
        return turf.point([pt.latitude, pt.longitude]);
    }); 
}


function getGeoJSLineSegmentsForGTFSPathWaypoints (waypointCoords) {
    return _.rest(waypointCoords).map(function (current, index) {
        var prevCoords = [waypointCoords[index].latitude, waypointCoords[index].longitude],
            currCoords = [current.latitude, current.longitude];

        return turf.linestring([prevCoords, currCoords], { start_dist_along: waypointCoords[index].dist_traveled });
    });
}



/* ======================================= Parse the GTFS Data ======================================= */

function getStopsProjectedToPathSegmentsTable (stopPoints, waypoints, pathSegments) {
    return stopPoints.map(function (stopPt) {
        return pathSegments.map(function (segment, i) {
            var snapped             = turf.pointOnLine(segment, stopPt),
                snappedCoords       = snapped.geometry.coordinates,

                segmentStartPt      = waypoints[i],
                snappedDistTraveled = turf.distance(segmentStartPt, snapped, 'miles') + segment.properties.start_dist_along,

                deviation           = turf.distance(stopPt, snapped, 'miles');

            return { 
                 segmentNum            : i                   , 
                 snapped_coords        : snappedCoords       ,
                 snapped_dist_traveled : snappedDistTraveled , 
                 deviation             : deviation           , 
            };
        });
    });
}


// ShapeID to shape path coordinates
function getShapeID2Coords (cbak) {
    console.time ('getShapeID2Coords');

    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'shapes.txt');

    converter.on("end_parsed", function (parsedTable) {
        var shapeIDs2Coords = {},
            currPath,
            prevPoint,
            currPoint,
            distTraveled,
            seqNum,

            lastSeqNum = Number.POSITIVE_INFINITY;

        
        _.forEach(parsedTable, function (row) {
            currPoint = turf.point([row.shape_pt_lat, row.shape_pt_lon]);

            seqNum = row.shape_pt_sequence;

            if (seqNum < lastSeqNum) {
                shapeIDs2Coords[row.shape_id] = currPath = [];
                distTraveled = 0;
            } else {
                distTraveled += turf.distance(prevPoint, currPoint, 'miles');
            }

            currPath.push( { latitude      : row.shape_pt_lat ,
                             longitude     : row.shape_pt_lon ,
                             dist_traveled : distTraveled     , } );

            lastSeqNum = seqNum;
            prevPoint = currPoint;
        });

        //fs.writeFile('shapeID2Coords.json', JSON.stringify(shapeIDs2Coords, null, 4));

        console.timeEnd('getShapeID2Coords');
        cbak(null, shapeIDs2Coords);
    });

    fileStream.pipe(converter);
}



function getTripID2ShapeID (cbak) {
    console.time('getTripID2ShapeID');

    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'trips.txt');

    converter.on("end_parsed", function (parsedTable) {
        var tripID2ShapeIDMap = {};

        _.forEach(parsedTable, function (row) {
            tripID2ShapeIDMap[row.trip_id] = row.shape_id;
        });

        //fs.writeFile('tripID2ShapeID.json', JSON.stringify(tripID2ShapeIDMap, null, 4));
        
        console.timeEnd('getTripID2ShapeID');
        cbak(null, tripID2ShapeIDMap);
    });

    fileStream.pipe(converter);
}



function getTripID2StopIDs (cbak) {
    console.time('getTripID2StopIDs');

    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'stop_times.txt');

    converter.on("end_parsed", function (parsedTable) {
        var stopTimesMap = {},
            curStopSeq,
            seqNum;

        _.forEach(parsedTable, function (row) {
            seqNum = row.stop_sequence;

            if (seqNum === 1) {
                stopTimesMap[row.trip_id] = curStopSeq = [];
            }

            curStopSeq.push(row.stop_id);
        });

        //fs.writeFile('tripID2StopIDs.json', JSON.stringify(stopTimesMap, null, 4));

        console.timeEnd('getTripID2StopIDs');
        cbak(null, stopTimesMap);
    });

    fileStream.pipe(converter);
}



function getStopIDToCoords (cbak) {
    console.time('getStopIDToCoords');

    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'stops.txt');

    converter.on("end_parsed", function (parsedTable) {
        var stopCoordsMap = {};

        _.forEach(parsedTable, function (row) {
            stopCoordsMap[row.stop_id] = { latitude  : row.stop_lat , 
                                           longitude : row.stop_lon , };
        });

        //fs.writeFile('stopID2Coords.json', JSON.stringify(stopCoordsMap, null, 4));

        console.timeEnd('getStopIDToCoords');
        cbak(null, stopCoordsMap);
    });

    fileStream.pipe(converter);
}






// TODO: Move these into functions called if process.env == 'development'
//
// For development, use serialized parsing results.
//var mocks = Object.keys(gtfsFileParsers).reduce(function (previous, filename) {

    //previous[filename] =  function (callback) {
        //jsonfile.readFile(filename + '.json', function (err, theObject) {
            //callback(null, theObject);
        //});
    //};

    //return previous;
//}, {});
//
//async.parallel(mocks, buildTheSpatialDataDictionary);
//

// Can put this in the if(LOG_STATS) conditional block of fitStopsToPath
// To test the algorithms, comparing the results of two algorithms.
//if (miniAlgo){
    //if (miniAlgo.length !== lsqAlgo.length) {
        //console.log('For trip', tripID);
        //console.log('\tDifferent sized results for the simple minimization and the least squares algorithms.');
    //}

    //for (i=0; i < miniAlgo.length; ++i) {
        //if (miniAlgo[i].snapped_dist_traveled !== lsqAlgo[i].snapped_dist_traveled) {
            //console.log('miniAlgo.snapped_dist_traveled - lsqAlgo.snapped_dist_traveled =', miniAlgo[i].snapped_dist_traveled - lsqAlgo[i].snapped_dist_traveled);
        //}
        //if (miniAlgo[i].deviation !== lsqAlgo[i].deviation) {
            //console.log('miniAlgo.deviation - lsqAlg.deviation:', miniAlgo[i].deviation - lsqAlgo[i].deviation);
        //}
    //}

//} 


