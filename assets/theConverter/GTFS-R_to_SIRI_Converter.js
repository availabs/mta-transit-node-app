'use strict';

//TODO: Remove next line
/* jshint unused: false */


var GTFS_Data  = require('./GTFS_Data'),
    GTFSr_Data = require('./GTFS-R_Data'),
    utils      = require('./utils');


function getStopMonitoringResponse (getParams) {
    var response = {
        "Siri" : {
            "ServiceDelivery" : getStopMonitoringServiceDelivery(getParams),
        },
    };

    response.Siri.ServiceDelivery.ResponseTimestamp = utils.getTimestamp();

    return response;
}

function getVehicleMonitoringResponse (getParams) {
    var response = {
        "Siri" : {
            "ServiceDelivery" : getVehicleMonitoringServiceDelivery(getParams),
        },
    };

    response.Siri.ServiceDelivery.ResponseTimestamp = utils.getTimestamp();

    return response;
}



function getStopMonitoringServiceDelivery (getParams) {
    return {
        // "ResponseTimestamp" applied in caller.
        "StopMonitoringDelivery"    : getStopMonitoringDelivery(getParams)    ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery(getParams) ,
    };
}

function getVehicleMonitoringServiceDelivery (getParams) {
    return {
        // "ResponseTimestamp" applied in caller
        "VehicleMonitoringDelivery" : getVehicleMonitoringDelivery(getParams)                         ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery(getParams)                         ,
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
    return {
        "MonitoredVehicleJourney" : getMonitoredVehicleJourney(getParams)          ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime(getParams) ,
    };
}


function getVehicleActivity (getParams) {
    return {
        "MonitoredVehicleJourney" : getMonitoredVehicleJourney(getParams)          ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime(getParams) ,
    };
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

function getStopMonitoringMonitoredVehicleJourney (getParams) {
    var mvj = getMonitoredVehicleJourney();

    mvj.MonitoredCall = getStopMonitoringMonitoredCall();

    return mvj;
}

function getVehicleMonitoringMonitoredVehicleJourney (getParams) {
    var mvj = getMonitoredVehicleJourney();

    mvj.MonitoredCall = getVehicleMonitoringMonitoredCall();

    return mvj;
}

function getMonitoredVehicleJourney (getParams) {
    return {
        "LineRef"                  : getLineRef(getParams)                  ,
        "DirectionRef"             : getDirectionRef(getParams)             ,
        "FramedVehicleJourneyRef"  : getFramedVehicleJourneyRef(getParams)  ,
        "JourneyPatternRef"        : getJourneyPatternRef(getParams)        ,
        "PublishedLineName"        : getPublishedLineName(getParams)        ,
        "OperatorRef"              : getOperatorRef(getParams)              ,
        "OriginRef"                : getOriginRef(getParams)                ,
        "DestinationRef"           : getDestinationRef(getParams)           ,
        "DestinationName"          : getDestinationName(getParams)          ,
        "OriginAimedDepartureTime" : getOriginAimedDepartureTime(getParams) ,
        "SituationRef"             : getSituationRef(getParams)             ,
        "Monitored"                : getMonitored(getParams)                ,
        "VehicleLocation"          : getVehicleLocation(getParams)          ,
        "Bearing"                  : getBearing(getParams)                  ,
        "ProgressRate"             : getProgressRate(getParams)             ,
        "ProgressStatus"           : getProgressStatus(getParams)           ,
        "BlockRef"                 : getBlockRef(getParams)                 ,
        "VehicleRef"               : getVehicleRef(getParams)               ,
        //"MonitoredCall"            Filled in by caller for stop or vehicle reponse.
        "OnwardCalls"              : getOnwardCalls(getParams)              ,
    };
}


function getMonitoredStopVisitRecordedAtTime (getParams) {
    //TODO: Implement;
    return null;
}


function getFramedVehicleJourneyRef (getParams) {
    return {
        "DataFrameRef"           : getDataFrameRef(getParams)           ,
        "DatedVehicleJourneyRef" : getDatedVehicleJourneyRef(getParams) ,
    };
}


function getVehicleLocation (getParams) {
    return {
        "Longitude" : getLongitude(getParams) ,
        "Latitude"  : getLatitude(getParams)  ,
    };
}


function getStopMonitoringMonitoredCall (stop_id) {
    // TODO: Implement.
    return null;
}


function getVehicleMonitoringMonitoredCall (train_id) {
    //TODO: Implement;
    return null;
}


function getCall (stop_time_update) {
    return {
        "Extensions"            : { "Distances" : getDistances(stop_time_update), },

        "ExpectedArrivalTime"   : getExpectedArrivalTime(stop_time_update)   ,
        "ExpectedDepartureTime" : getExpectedDepartureTime(stop_time_update) ,

        "StopPointRef"          : getStopPointRef(stop_time_update)          ,
        "StopPointName"         : getStopPointName(stop_time_update)         ,

        "VisitNumber"           : getVisitNumber(stop_time_update)           ,
    };
}


function getLineRef (getParams) {
    //TODO: Implement
    return null;
}


function getDirectionRef (getParams) {
    //TODO: Implement
    return null;
}


function getJourneyPatternRef (getParams) {
    //TODO: Implement
    return null;
}


function getPublishedLineName (getParams) {
    //TODO: Implement
    return null;
}


function getOperatorRef (getParams) {
    //TODO: Implement
    return null;
}


function getOriginRef (getParams) {
    //TODO: Implement
    return null;
}


function getDestinationRef (getParams) {
    //TODO: Implement
    return null;
}


function getDestinationName (getParams) {
    //TODO: Implement
    return null;
}

function getOriginAimedDepartureTime (getParams) {
    //TODO: Implement
    return null;
}


function getSituationRef (getParams) {
    //TODO: Implement
    return null;
}


function getMonitored (getParams) {
    //TODO: Implement
    return null;
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


function getBlockRef (getParams) {
    //TODO: Implement
    return null;
}


function getVehicleRef (getParams) { //TODO: Implement
    return null;
}


function getOnwardCalls (getParams) { //TODO: Implement
    var train_id = getParams.train_id;

    var stop_time_updates = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.stop_time_update;

    return stop_time_updates.map(getCall);
}


function getDataFrameRef (getParams) {
    //TODO: Implement
    return null;
}


function getDatedVehicleJourneyRef (getParams) {
    //TODO: Implement
    return null;
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
    console.log(stop_time_update);
    return utils.getTimestampFromPosix(stop_time_update.arrival.time.low);
}


function getExpectedDepartureTime (stop_time_update) {
    if (stop_time_update.departure) {
        return utils.getTimestampFromPosix(stop_time_update.departure.time.low);
    }

    return null;
}


function getStopPointRef (stop_time_update) {
    return 'MTA_' + stop_time_update.stop_id;
}


function getVisitNumber (getParams) {
    return 1;
}


function getStopPointName (stop_time_update) {
    return GTFS_Data.stops[stop_time_update.stop_id].stop_name;
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



function test (getParams) {
    console.log(getParams);
    //console.log(JSON.stringify(getStopMonitoringResponse(getParams), null, '\t'));
    console.log(JSON.stringify(getVehicleMonitoringResponse(getParams), null, '\t'));
}


module.exports = {
    test : test,
};
