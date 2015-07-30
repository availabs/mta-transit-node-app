'use strict';

//TODO: Remove next line
/* jshint unused: false */


var GTFS_Data  = require('./GTFS_Data'),
    GTFSr_Data = require('./GTFS-R_Data');


function getStopMonitoringResponse (getParams) {
    return {
        "Siri" : {
            "ServiceDelivery" : getStopMonitoringServiceDelivery(getParams),
        },
    };
}

function getVehicleMonitoringResponse (getParams) {
    return {
        "Siri" : {
            "ServiceDelivery" : getVehicleMonitoringServiceDelivery(getParams),
        },
    };
}



function getStopMonitoringServiceDelivery (getParams) {
    return {
        "ResponseTimestamp"         : getStopMonitoringServiceDeliveryResponseTimestamp(getParams) ,
        "StopMonitoringDelivery"    : getStopMonitoringDelivery(getParams)                         ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery(getParams)                      ,
    };
}

function getVehicleMonitoringServiceDelivery (getParams) {
    return {
        "ResponseTimestamp"         : getVehicleMonitoringServiceDeliveryResponseTimestamp(getParams) ,
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
        "MonitoredCall"            : getMonitoredCall(getParams)            ,
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


function getMonitoredCall (getParams) {
    return {
        "Extensions"            : { "Distances" : getDistances(getParams), },

        "ExpectedArrivalTime"   : getExpectedArrivalTime(getParams)   ,
        "ExpectedDepartureTime" : getExpectedDepartureTime(getParams) ,

        "StopPointRef"          : getStopPointRef(getParams)          ,
        "StopPointName"         : getStopPointName(getParams)         ,

        "VisitNumber"           : getVisitNumber(getParams)           ,
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


function getVehicleRef (getParams) {
    //TODO: Implement
    return null;
}


function getOnwardCalls (getParams) {
    //TODO: Implement
    return null;
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


function getExpectedArrivalTime (getParams) {
    //TODO: Implement
    return null;
}


function getExpectedDepartureTime (getParams) {
    //TODO: Implement
    return null;
}


function getStopPointRef (getParams) {
    //TODO: Implement
    return null;
}


function getVisitNumber (getParams) {
    //TODO: Implement
    return null;
}


function getStopPointName (getParams) {
    //TODO: Implement
    return null;
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



function convertToStopMonitoringResponse (gtfsr_msg) {}

function convertToVehicleMonitoringResponse (gtfsr_msg) {}


function test (getParams) {
    console.log(GTFS_Data.agency);
    console.log(GTFSr_Data.vehicleIndex);
    console.log(JSON.stringify(getStopMonitoringResponse(getParams), null, '\t'));
    //console.log(JSON.stringify(getVehicleMonitoringResponse(getParams), null, '\t'));
}


module.exports = {
    test : test,
};
