'use strict';



//TODO: Remove next line
/* jshint unused: false */



function getStopMonitoringResponse () {
    return {
        "Siri" : {
            "ServiceDelivery" : getStopMonitoringServiceDelivery(),
        },
    };
}

function getVehicleMonitoringResponse () {
    return {
        "Siri" : {
            "ServiceDelivery" : getVehicleMonitoringServiceDelivery(),
        },
    };
}



function getStopMonitoringServiceDelivery () {
    return {
        "ResponseTimestamp"         : getBusMonitoringServiceDeliveryResponseTimestamp() ,
        "StopMonitoringDelivery"    : getStopMonitoringDelivery()                        ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery()                     ,
    };
}

function getVehicleMonitoringServiceDelivery () {
    return {
        "ResponseTimestamp"         : getVehicleMonitoringServiceDeliveryResponseTimestamp() ,
        "VehicleMonitoringDelivery" : getVehicleMonitoringDelivery()                         ,
        "SituationExchangeDelivery" : getSituationExchangeDelivery()                         ,
    };
}



function getBusMonitoringServiceDeliveryResponseTimestamp () {
    //TODO: Implement;
    return null;
}


function getVehicleMonitoringServiceDeliveryResponseTimestamp () {
    //TODO: Implement;
    return null;
}


function getStopMonitoringDelivery () {
    return {
        "MonitoredStopVisit" : getMonitoredStopVisit()                      ,
        "ResponseTimestamp"  : getStopMonitoringDeliveryResponseTimestamp() ,
        "ValidUntil"         : getStopMonitoringDeliveryValidUntil()        ,
   };
}


function getVehicleMonitoringDelivery () {
    return {
        "VehicleActivity"   : getVehicleActivity()                                   ,
        "ResponseTimestamp" : getVehicleMonitoringServiceDeliveryResponseTimestamp() ,
        "ValidUntil"        : getVehicleMonitoringDeliveryValidUntil()               ,
    };
}


function getSituationExchangeDelivery () {
    //TODO: Implement;
    return null;
}


function getMonitoredStopVisit () {
    return {
        "MonitoredVehicleJourney" : getMonitoredVehicleJourney()          ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime() ,
    };
}


function getVehicleActivity () {
    return {
        "MonitoredVehicleJourney" : getMonitoredVehicleJourney()          ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime() ,
    };
}


function getStopMonitoringDeliveryResponseTimestamp () {
    //TODO: Implement;
    return null;
}


function getStopMonitoringDeliveryValidUntil () {
    //TODO: Implement;
    return null;
}


function getVehicleMonitoringDeliveryValidUntil () {
    //TODO: Implement;
    return null;
}


function getSituationExchangeDelivery () {
    //TODO: Implement;
    return null;
}


function getMonitoredVehicleJourney () {
    return {
        "LineRef"                  : getLineRef()                  ,
        "DirectionRef"             : getDirectionRef()             ,
        "FramedVehicleJourneyRef"  : getFramedVehicleJourneyRef()  ,
        "JourneyPatternRef"        : getJourneyPatternRef()        ,
        "PublishedLineName"        : getPublishedLineName()        ,
        "OperatorRef"              : getOperatorRef()              ,
        "OriginRef"                : getOriginRef()                ,
        "DestinationRef"           : getDestinationRef()           ,
        "DestinationName"          : getDestinationName()          ,
        "OriginAimedDepartureTime" : getOriginAimedDepartureTime() ,
        "SituationRef"             : getSituationRef()             ,
        "Monitored"                : getMonitored()                ,
        "VehicleLocation"          : getVehicleLocation()          ,
        "Bearing"                  : getBearing()                  ,
        "ProgressRate"             : getProgressRate()             ,
        "ProgressStatus"           : getProgressStatus()           ,
        "BlockRef"                 : getBlockRef()                 ,
        "VehicleRef"               : getVehicleRef()               ,
        "MonitoredCall"            : getMonitoredCall()            ,
        "OnwardCalls"              : getOnwardCalls()              ,
    };
}


function getMonitoredStopVisitRecordedAtTime () {
    //TODO: Implement;
    return null;
}


function getFramedVehicleJourneyRef () {
    return {
        "DataFrameRef"           : getDataFrameRef()           ,
        "DatedVehicleJourneyRef" : getDatedVehicleJourneyRef() ,
    };
}


function getVehicleLocation () {
    return {
        "Longitude" : getLongitude() ,
        "Latitude"  : getLatitude()  ,
    };
}


function getMonitoredCall () {
    return {
        "Extensions"            : { "Distances" : getDistances(), },

        "ExpectedArrivalTime"   : getExpectedArrivalTime()   ,
        "ExpectedDepartureTime" : getExpectedDepartureTime() ,

        "StopPointRef"          : getStopPointRef()          ,
        "StopPointName"         : getStopPointName()         ,

        "VisitNumber"           : getVisitNumber()           ,
    };
}


function getLineRef () {
    //TODO: Implement
    return null;
}


function getDirectionRef() {
    //TODO: Implement
    return null;
}


function getJourneyPatternRef() {
    //TODO: Implement
    return null;
}


function getPublishedLineName() {
    //TODO: Implement
    return null;
}


function getOperatorRef() {
    //TODO: Implement
    return null;
}


function getOriginRef() {
    //TODO: Implement
    return null;
}


function getDestinationRef() {
    //TODO: Implement
    return null;
}


function getDestinationName() {
    //TODO: Implement
    return null;
}

function getOriginAimedDepartureTime() {
    //TODO: Implement
    return null;
}


function getSituationRef() {
    //TODO: Implement
    return null;
}


function getMonitored() {
    //TODO: Implement
    return null;
}


function getBearing() {
    //TODO: Implement
    return null;
}


function getProgressRate() {
    //TODO: Implement
    return null;
}


function getProgressStatus() {
    //TODO: Implement
    return null;
}


function getBlockRef() {
    //TODO: Implement
    return null;
}


function getVehicleRef() {
    //TODO: Implement
    return null;
}


function getOnwardCalls() {
    //TODO: Implement
    return null;
}


function getDataFrameRef() {
    //TODO: Implement
    return null;
}


function getDatedVehicleJourneyRef() {
    //TODO: Implement
    return null;
}


function getLongitude() {
    //TODO: Implement
    return null;
}


function getLatitude() {
    //TODO: Implement
    return null;
}


function getDistances () {
    return {
        "PresentableDistance"    : getPresentableDistance()    ,
        "DistanceFromCall"       : getDistanceFromCall()       ,
        "StopsFromCall"          : getStopsFromCall()          ,
        "CallDistanceAlongRoute" : getCallDistanceAlongRoute() ,
    };
}


function getExpectedArrivalTime () {
    //TODO: Implement
    return null;
}


function getExpectedDepartureTime () {
    //TODO: Implement
    return null;
}


function getStopPointRef() {
    //TODO: Implement
    return null;
}


function getVisitNumber() {
    //TODO: Implement
    return null;
}


function getStopPointName() {
    //TODO: Implement
    return null;
}


function getPresentableDistance() {
    //TODO: Implement
    return null;
}


function getDistanceFromCall() {
    //TODO: Implement
    return null;
}


function getStopsFromCall() {
    //TODO: Implement
    return null;
}


function getCallDistanceAlongRoute() {
    //TODO: Implement
    return null;
}



function convertToStopMonitoringResponse (gtfsr_msg) {}

function convertToVehicleMonitoringResponse (gtfsr_msg) {}


function test () {
    console.log(JSON.stringify(getStopMonitoringResponse(), null, '\t'));
    console.log(JSON.stringify(getVehicleMonitoringResponse(), null, '\t'));
}


module.exports = {
    test : test,
};
