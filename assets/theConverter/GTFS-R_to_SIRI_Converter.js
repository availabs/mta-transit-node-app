'use strict';

//TODO: Remove next line
/* jshint unused: false */

// TODO: make simple getters for indexed GTFSr data.


var _     = require('lodash'),

    GTFS  = require('./GTFS_Data'),
    GTFSr = require('./GTFS-R_Data'),
    utils = require('./utils');


// Prob should index timestamps, and set all at end of response.

function getStopMonitoringResponse (getParams) {
    var response = {
        "Siri" : {
            "ServiceDelivery" : getStopMonitoringServiceDelivery(getParams),
        },
    };

    return response;
}

function getVehicleMonitoringResponse (getParams) {
    var response = {
        "Siri" : {
            "ServiceDelivery" : getVehicleMonitoringServiceDelivery(getParams),
        },
    };

    return response;
}



function getStopMonitoringServiceDelivery (getParams) {
    return {
        "ResponseTimestamp"         : utils.getTimestamp()                    ,
        "StopMonitoringDelivery"    : getStopMonitoringDelivery(getParams)    ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery(getParams) ,
    };
}

function getVehicleMonitoringServiceDelivery (getParams) {
    
    return {
        "ResponseTimestamp"         : utils.getTimestamp()                    , 
        "VehicleMonitoringDelivery" : getVehicleMonitoringDelivery(getParams) ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery(getParams) ,
    };
}


function getStopMonitoringServiceDeliveryResponseTimestamp (getParams) {
    //TODO: Implement;
    return null;
}


function getVehicleMonitoringServiceDeliveryResponseTimestamp (getParams) {
    //TODO: Implement;
    return null;
}


function getStopMonitoringDelivery (getParams) {
    return {
        "MonitoredStopVisit" : getMonitoredStopVisit(getParams)                      ,
        "ResponseTimestamp"  : getStopMonitoringDeliveryResponseTimestamp(getParams) ,
        "ValidUntil"         : getStopMonitoringDeliveryValidUntil(getParams)        ,
   };
}


function getVehicleMonitoringDelivery (getParams) {
    return {
        "VehicleActivity"   : getVehicleActivity(getParams)                                   ,
        "ResponseTimestamp" : getVehicleMonitoringServiceDeliveryResponseTimestamp(getParams) ,
        "ValidUntil"        : getVehicleMonitoringDeliveryValidUntil(getParams)               ,
    };
}


function getSituationExchangeDelivery (getParams) {
    //TODO: Implement;
    return null;
}


function getMonitoredStopVisit (getParams) {
    var stopID                       = getParams.MonitoringRef,
        routeID                      = getParams.LineRef,
        maxOnwardCalls               = getParams.MaximumNumberOfCallsOnwards,
        vehicleMonitoringDetailLevel = getParams.VehicleMonitoringDetailLevel,

        requestedTrains = (routeID) ? 
                            GTFSr.getTrainsServicingStopForRoute(stopID, routeID) : 
                            GTFSr.getTrainsServicingStop(stopID)                  ;

    return requestedTrains.map(function (trainID) {
        return {
            "MonitoredVehicleJourney" : 
                getStopMonitoringMonitoredVehicleJourney(trainID,
                                                         stopID,
                                                         maxOnwardCalls,
                                                         vehicleMonitoringDetailLevel),
            "RecordedAtTime" : 
                getMonitoredStopVisitRecordedAtTime(getParams) ,
        };
    });
}


function getVehicleActivity (getParams) {
    var trainID                      = (getParams.VehicleRef && getParams.VehicleRef.replace('MTA ', '')),
        routeID                      = getParams.LineRef,
        maxOnwardCalls               = getParams.MaximumNumberOfCallsOnwards,
        vehicleMonitoringDetailLevel = getParams.VehicleMonitoringDetailLevel,
        requestedTrains;
            
    if (trainID && routeID) {
       requestedTrains = _.intersection(GTFSr.getTrainsServicingRoute(routeID), [trainID]);
    } else if (routeID) {
        requestedTrains = GTFSr.getTrainsServicingRoute(routeID);
    } else {
        requestedTrains = GTFSr.getAllMonitoredTrains();
    }

    // FIXME: Handle alert only trains. 
    requestedTrains = requestedTrains.filter(function (trainID) { return !!GTFSr.trainsIndex[trainID].tripUpdate; });

        
    return requestedTrains.map(function (trainID) {
        return {
            "MonitoredVehicleJourney" : 
                getVehicleMonitoringMonitoredVehicleJourney(trainID, 
                                                            maxOnwardCalls,
                                                            vehicleMonitoringDetailLevel) ,
            "RecordedAtTime" : 
                getMonitoredStopVisitRecordedAtTime(getParams) ,
        };
    });
}


function getStopMonitoringDeliveryResponseTimestamp (getParams) {
    //TODO: Implement;
    return null;
}


function getStopMonitoringDeliveryValidUntil (getParams) {
    //TODO: Implement;
    return null;
}


function getVehicleMonitoringDeliveryValidUntil (getParams) {
    //TODO: Implement;
    return null;
}


function getSituationExchangeDelivery (getParams) {
    //TODO: Implement;
    return null;
}


function getStopMonitoringMonitoredVehicleJourney (trainID, stopID, maxOnwardCalls, detailLevel) {
    return getMonitoredVehicleJourney(trainID, stopID,  maxOnwardCalls, detailLevel);
}


function getVehicleMonitoringMonitoredVehicleJourney (trainID, maxOnwardCalls, detailLevel) {
    return getMonitoredVehicleJourney(trainID, null, maxOnwardCalls, detailLevel);
}


function getMonitoredVehicleJourney (trainID, stopID, maxOnwardCalls, detailLevel) {
    return {
        "LineRef"                  : getLineRef(trainID)                                                      ,
        "DirectionRef"             : getDirectionRef(trainID)                                                 ,
        "FramedVehicleJourneyRef"  : getFramedVehicleJourneyRef(trainID)                                      ,
        "JourneyPatternRef"        : getJourneyPatternRef(trainID)                                            ,
        "PublishedLineName"        : getPublishedLineName(trainID)                                            ,
        "OperatorRef"              : getOperatorRef()                                                         ,
        "OriginRef"                : getOriginRef(trainID)                                                    ,
        "DestinationRef"           : getDestinationRef(trainID)                                               ,
        "DestinationName"          : getDestinationName(trainID)                                              ,
        "OriginAimedDepartureTime" : getOriginAimedDepartureTime(trainID)                                     ,
        "SituationRef"             : getSituationRef(trainID)                                                 ,
        "Monitored"                : getMonitored()                                                           ,
        "VehicleLocation"          : getVehicleLocation(trainID)                                              ,
        "Bearing"                  : getBearing(trainID)                                                      ,
        "ProgressRate"             : getProgressRate(trainID)                                                 ,
        "ProgressStatus"           : getProgressStatus(trainID)                                               ,
        "BlockRef"                 : getBlockRef(trainID)                                                     ,
        "VehicleRef"               : getVehicleRef(trainID)                                                   ,
        "MonitoredCall"            : getMonitoredCall(trainID, stopID)                                        ,
        "OnwardCalls"              : (detailLevel === 'calls') ? getOnwardCalls(trainID, maxOnwardCalls) : {} ,
    };
}


function getMonitoredStopVisitRecordedAtTime (getParams) {
    //TODO: Implement;
    return null;
}


function getFramedVehicleJourneyRef (dataFrameRefDate, tripKey) {
    return null;
    //return {
        //"DataFrameRef"           : utils.dateToString(dataFrameRefDate) ,
        //"DatedVehicleJourneyRef" : getDatedVehicleJourneyRef(tripKey)   ,
    //};
}


function getVehicleLocation (trainID) {
    return {
        "Longitude" : getLongitude(trainID) ,
        "Latitude"  : getLatitude(trainID)  ,
    };
}


function getMonitoredCall (trainID, stopID) {
    var stopTimeUpdate = (stopID) ?
                            GTFSr.getStopTimeUpdateForStopForTrain(stopID, trainID) :
                            GTFSr.getFirstOnwardCallForTrain(trainID)               ;

    return getCall(stopTimeUpdate);
}


function getCall (stopTimeUpdate) {
    return {
        "Extensions"            : { "Distances" : getDistances(stopTimeUpdate), },

        "ExpectedArrivalTime"   : getExpectedArrivalTime(stopTimeUpdate)   ,
        "ExpectedDepartureTime" : getExpectedDepartureTime(stopTimeUpdate) ,

        "StopPointRef"          : getStopPointRef(stopTimeUpdate)          ,
        "StopPointName"         : getStopPointName(stopTimeUpdate)         ,

        "VisitNumber"           : getVisitNumber(stopTimeUpdate)           ,
    };
}


function getLineRef (trainID) {
    return 'MTA ' + GTFSr.getRouteIDForTrain(trainID);
}

/* I think this means always 0. Not the N or S bound directions, 
   but a GTFS specific meaning. Always 0 for trains, it seems.
   https://developers.google.com/transit/gtfs/reference?hl=en#trips_direction_id_field */
function getDirectionRef () {
    return 0;
}


// ??? Use the shape id encoded in the route name ???
function getJourneyPatternRef (trainID) {
    var shapeID = GTFSr.getGTFSShapeIDForTrain(trainID);

    return (shapeID) ? ('MTA ' + shapeID) : null;
}


function getPublishedLineName (trainID) {
    return GTFSr.getGTFSRouteShortNameForTrain(trainID) || null;
}


function getOperatorRef () {
    return 'MTA';
}


function getOriginRef (getParams) {
    //TODO: Implement
    return null;
}


function getDestinationRef (trainID) { //FIXME: Mess. At least make more defensively coded.
    var destinationID = GTFSr.getDestinationIDForTrain(trainID);

    return (destinationID) ? 'MTA_' + destinationID : null;
}

function getDestinationName (trainID) {
    return GTFSr.getGTFSTripHeadsignForTrain (trainID);
}

// <!-- If a bus has not yet departed, OriginAimedDepartureTime indicates 
// the scheduled departure time of that bus from that terminal in ISO8601 format -->
function getOriginAimedDepartureTime (getParams) {
    //TODO: Implement
    return null;
}


function getSituationRef (getParams) {
    //TODO: Implement
    return null;
}


function getMonitored () {
    return true;
}


function getBearing (getParams) {
    //TODO: Implement
    return null;
}


function getProgressRate (getParams) {
    //TODO: Implement
    return null;
}


function getProgressStatus (getParams) {
    //TODO: Implement
    return null;
}


/*  PJT: I don't think this applies.... all in GTFS empty.
    
    From https://developers.google.com/transit/gtfs/reference#trips_block_id_field
    The block_id field identifies the block to which the trip belongs. 
    A block consists of two or more sequential trips made using the same vehicle, 
    where a passenger can transfer from one trip to the next just by staying in the vehicle. 
    The block_id must be referenced by two or more trips in trips.txt.
 */
function getBlockRef (getParams) {
    //TODO: Implement
    return null;
}


function getVehicleRef (trainID) { //TODO: Implement
    return 'MTA ' + trainID;
}


function getOnwardCalls (trainID, maxOnwardCalls) { //TODO: Implement
    var stopTimeUpdates = GTFSr.getStopTimeUpdatesForTrain(trainID);

    if (maxOnwardCalls) {
        stopTimeUpdates = _.take(stopTimeUpdates, maxOnwardCalls);
    }

    return stopTimeUpdates.map(getCall);
}


function getDataFrameRefDate (start_date, origin_time) {
    var refDate = new Date(start_date);

    if      ( origin_time < 0)      { refDate.setDate(refDate.getDate() + 1); }
    else if ( origin_time > 144000) { refDate.setDate(refDate.getDate() - 1); }

    return refDate;
}


function getScheduledTripKey (tripDate, trip_id) {
    var day = tripDate.getDay(),
        serviceCode,
        coreTripID,
        trip;
    
    if      (day === 0) { serviceCode = 'SUN'; } 
    else if (day === 6) { serviceCode = 'SAT'; }
    else                { serviceCode = 'WKD'; }

    coreTripID = trip_id.substring(0, trip_id.lastIndexOf('.') + 2);

    return serviceCode + '_' + coreTripID;
}

function getDatedVehicleJourneyRef (tripKey) {
    var tripID = GTFS.trips[tripKey];

    return (tripID) ? GTFS.trips[tripKey].trip_id : null;
}


function getLongitude (getParams) {
    //TODO: Implement
    return null;
}


function getLatitude (getParams) {
    //TODO: Implement
    return null;
}


function getDistances (getParams) {
    return {
        "PresentableDistance"    : getPresentableDistance(getParams)    ,
        "DistanceFromCall"       : getDistanceFromCall(getParams)       ,
        "StopsFromCall"          : getStopsFromCall(getParams)          ,
        "CallDistanceAlongRoute" : getCallDistanceAlongRoute(getParams) ,
    };
}


function getExpectedArrivalTime (stop_time_update) { // Note: in docs, but not in actual SIRI.
    //FIXME: Handle no arrival time.
    return (stop_time_update.arrival) ? utils.getTimestampFromPosix(stop_time_update.arrival.time.low) : null;
}


function getExpectedDepartureTime (stop_time_update) {
    if (stop_time_update.departure) {
        return utils.getTimestampFromPosix(stop_time_update.departure.time.low);
    }

    return null;
}


function getStopPointRef (stop_time_update) {
    return 'MTA ' + stop_time_update.stop_id;
}


function getVisitNumber (getParams) {
    return 1;
}


function getStopPointName (stop_time_update) {
    return GTFS.stops[stop_time_update.stop_id].stop_name;
}


function getPresentableDistance (getParams) {
    //TODO: Implement
    return null;
}


function getDistanceFromCall (getParams) {
    //TODO: Implement
    return null;
}


function getStopsFromCall (getParams) {
    //TODO: Implement
    return null;
}


function getCallDistanceAlongRoute (getParams) {
    //TODO: Implement
    return null;
}


function padLeft (str, num) {        // For testing output.
    return _.padLeft(str, 2, '0');
}

function getTimestampForTestOutput () {
    var time  = new Date(),
        stamp = time.getFullYear() + 
                padLeft( time.getMonth()   ) + 
                padLeft( time.getDate()    ) +
                '_'                          +
                padLeft( time.getHours()   ) +
                ':'                          +
                padLeft( time.getMinutes() ) +
                ':'                          +
                padLeft( time.getSeconds() ) ;
 
    return stamp;
}


function test (getParams) {
    //var fs    = require('fs'),
        //stamp = getTimestampForTestOutput();

    //var siriOutput = JSON.stringify(getVehicleMonitoringResponse(getParams), null, '  ');


    //fs.writeFileSync(__dirname + '/testsOutput/' + 'siri_test_' + stamp + '.json', siriOutput);

    //console.log(JSON.stringify(getStopMonitoringResponse(getParams), null, '\t'));
    //getVehicleMonitoringResponse(getParams);
    //
    //console.log(GTFSr.stopsIndex);
    

    var siriOutput = JSON.stringify(getVehicleMonitoringResponse(getParams), null, '  ');
    console.log(siriOutput);
}


module.exports = {
    test : test,
};
