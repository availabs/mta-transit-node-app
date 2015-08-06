#!/usr/bin/env node


'use strict';


var async       = require('async'),
    geolib      = require('geolib'),
    fs          = require('fs'),
    Converter   = require("csvtojson").Converter,
    //sizeof      = require('sizeof').sizeof,
    _           = require('lodash'),

    gtfsDataDir = __dirname + '/../Subway_GTFS_Data/';



/* The primary data structure created to handle
 * GTFSr latitude, longitude, distance. 
 *
 *  { tripKey: { 
 *                  shapeID  : shapeID
 *                  stopsPts : [ { dist_traveled : x,
 *                                 pathIndex     : y, } ]
 *             }
 *  }
 */


function getShapeID2Coords (cbak) {
    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'shapes.txt');

    converter.on("end_parsed", function (parsedTable) {
        var indexedShapes = {},
            curShape,
            lat,
            lon,
            distTrav,
            seqNum;

        _.forEach(parsedTable, function (row) {
            seqNum = row.shape_pt_sequence;

            lat = row.shape_pt_lat;
            lon = row.shape_pt_lon;

            if (seqNum === 0) {
                indexedShapes[row.shape_id] = curShape = [];
                distTrav = 0;
            } else {
                distTrav += geolib.getDistance(
                                    {  latitude  : curShape[seqNum - 1].lat,
                                       longitude : curShape[seqNum - 1].lon,  },

                                    {  latitude  : lat,
                                       longitude : lon, }
                                );
            }

            curShape.push( { lat: lat, lon: lon, dist_traveled: distTrav, } );

        });

        cbak(null, indexedShapes);
    });

    fileStream.pipe(converter);
}

function getTripID2ShapeID (cbak) {
    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'trips.txt');

    converter.on("end_parsed", function (parsedTable) {
        var t2sMap = {};

        _.forEach(parsedTable, function (row) {
            t2sMap[row.trip_id] = row.shape_id;
        });

        cbak(null, t2sMap);
    });

    fileStream.pipe(converter);
}


function getTripID2StopIDs (cbak) {
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

        cbak(null, stopTimesMap);
    });

    fileStream.pipe(converter);
}


function getStopIDToCoords (cbak) {
    var converter  = new Converter({constructResult:true}),
        fileStream = fs.createReadStream(gtfsDataDir + 'stops.txt');

    converter.on("end_parsed", function (parsedTable) {
        var stopCoordsMap = {};

        _.forEach(parsedTable, function (row) {
            stopCoordsMap[row.stop_id] = {
                lat: row.stop_lat,
                lon: row.stop_lon,
            };
        });

        cbak(null, stopCoordsMap);
    });

    fileStream.pipe(converter);
}


var parsers = {
    shapeID2Coords : getShapeID2Coords,
    tripID2ShapeID : getTripID2ShapeID,
    tripID2StopIDs : getTripID2StopIDs,
    stopID2Coords  : getStopIDToCoords,
};



function finale (err, results) {
    var theDataStructure = {};

    if (err) {
        console.log(err);
        return;
    }

    _.forEach(results.tripID2ShapeID, function (shapeID, tripID) {

        var tripKey  = tripID.substring(9),
            stops    = results.tripID2StopIDs[tripID],
            points   = results.shapeID2Coords[shapeID],

            lastShapePt = (points && points.length) && { latitude  : _.last(points).lat,
                                                         longitude : _.last(points).lon, },

            stopLoci = {},
            i        = 0;

        // FIXME: Figure out why some have no points.
        if (!points) { return; }

        
        // Do do, clean up the logic in here. Rough draft procedures.
        _.forEach(stops, function(stopID) {
            var stopCoords  = results.stopID2Coords[stopID],
                stopPt      = { latitude  : stopCoords.lat,
                                longitude : stopCoords.lon, },

                distA,
                distB = Number.POSITIVE_INFINITY,

                midPt;

            if (i >= (points.length - 2)) {

                distA = geolib.getDistance(lastShapePt, stopPt);

                ++i;
                stopLoci[stopID] = { dist_traveled: distA, pathIndex: i, };

            } else {
                // TODO: Check for edge cases.
                //       Handle instances where stop point equals path point,
                //          and cases where they're equal by using integers for
                //          the pathIndex and reals otherwise.
                //       Handle case where stop is the first point.
                do {
                    distA = distB;

                    midPt = { latitude  : (points[i].lat + points[i+1].lat) / 2,
                              longitude : (points[i].lon + points[i+1].lon) / 2, };

                    distB = geolib.getDistance(stopPt, midPt);
                    ++i;
                } while ((distA > distB) && (i < (points.length - 2)));

                stopLoci[stopID] = { dist_traveled: distA, pathIndex: i, };
            }
        });

        theDataStructure[tripKey] = {
            shapeID  : shapeID,
            stopsPts : stopLoci,
        };
    });

    fs.writeFile(gtfsDataDir + 'GTFS_Spatial_Data.json', JSON.stringify(theDataStructure, null, 4));
}

async.parallel(parsers, finale);
