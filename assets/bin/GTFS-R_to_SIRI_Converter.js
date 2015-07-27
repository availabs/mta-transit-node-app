'use strict';



//TODO: Remove next line
/* jshint unused: false */
/* jshint undef: false */


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
        "ValidUntil"         : getStopMonitoringDeliveryValidUntil()                              ,
   };
}


function getVehicleMonitoringDelivery () {
    return {
        "VehicleActivity"   : getVehicleActivity()                                   ,
        "ResponseTimestamp" : getVehicleMonitoringServiceDeliveryResponseTimestamp() ,
        "ValidUntil"        : getVehicleMonitoringDeliveryValidUntil()                                        ,
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
        "DataFrameRef"           : getDataFrameRef(),
        "DatedVehicleJourneyRef" : getDatedVehicleJourneyRef(),
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



function zeroPadded(num, len) {
   return ('0000' + num).slice(-len);
}


function getTimeStringFromPosix (posixTime) {
    var jsDate    = new Date(posixTime * 1000),
        year      = jsDate.getFullYear(),
        month     = zeroPadded(jsDate.getMonth() + 1, 2),
        date      = zeroPadded(jsDate.getDate(), 2),
        hours     = zeroPadded(jsDate.getHours(), 2),
        minutes   = zeroPadded(jsDate.getMinutes(), 2),
        seconds   = zeroPadded(jsDate.getSeconds(), 2),
        millisecs = zeroPadded(jsDate.getMilliseconds(), 3);

    return [year, month, date].join('-') +
           'T'   +
           [hours, minutes, seconds].join('-') + '.' + millisecs +
           '-'   + '04:00';
}



function getLineRef (route_id) {
    /* The 'fully qualified' route name (GTFS agency ID + route ID) for the trip the vehicle is serving. */
    return 'MTA NYCT_' + route_id;
}



/*  From nyct-subway.proto   |  From https://bustime.mta.info/wiki/Developers/SIRIMonitoredVehicleJourney
        enum Direction {     |      Vehicle bearing: 0 is East, increments counter-clockwise
            NORTH = 1;       |
            EAST = 2;        |
            SOUTH = 3;       |
            WEST = 4;        |
        }
*/
var GTFSr_direction_to_SIRI_bearing = {
    1: 270,
    2: 0,
    3: 90,
    4: 180,
};



function getBearingFromDirection (direction) {
    return GTFSr_direction_to_SIRI_bearing[direction];
}




function alertToProgressRate (alert) {
/*
    GTFS-R message Alert
        The only alerts included in the NYCT Subway GTFS-realtime feed are notifications about delayed trains
        therefore the entity is always a trip. In general, when a train is shown as ‘delayed’ on the station
        countdown clocks, an Alert is generated for that trip in the feed.

    GTFS-R message VehiclePosition
        A VehiclePosition entity is provided for every trip when it starts moving. Note that a train can be
        assigned (see TripUpdate) but has not started to move (e.g. a train waiting to leave the origin station),
        therefore, no VehiclePosition is provided.

        Usage notes:
            The motivation to include VehiclePosition is to provide the timestamp field. This is the time of the last
            detected movement of the train. This allows feed consumers to detect the situation when a train stops
            moving (aka stalled). The platform countdown clocks only count down when trains are moving
            otherwise they persist the last published arrival time for that train. If one wants to mimic this
            behavioryou must first determine the absence of movement (stalled train condition) ), then the
            countdown must be stopped.

            As an example, a countdown could be stopped for a trip when the difference between the timestamp in
            the VehiclePosition and the timestamp in the field header is greater than, 90 seconds.

            Note: 
                since VehiclePosition information is not provided until the train starts moving, it is recommended
                that feed consumers use the origin terminal departure to determine a train stalled condition. 

     
    SIRI ProgressRate
        Indicator of whether the bus is 
            * making progress (i.e. moving, generally), 
            * not moving (with value noProgress), 
            * laying over before beginning a trip (value layover), 
            * serving a trip prior to one which will arrive (prevTrip).
*/
    
}


function convertToStopMonitoringResponse (gtfsr_msg) {}

function convertToVehicleMonitoringResponse (gtfsr_msg) {}


function test () {
    console.log(JSON.stringify(getStopMonitoringResponse(), null, '\t'));
    console.log(JSON.stringify(getVehicleMonitoringResponse(), null, '\t'));
}


module.exports = {
    test                           : test,
    convertToStopMonitoringMessage : convertToStopMonitoringMessage,
};
