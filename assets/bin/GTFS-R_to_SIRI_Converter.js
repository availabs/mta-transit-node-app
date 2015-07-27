'use strict';

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

function getLineRefFromRouteID (route_id) {
    /* The 'fully qualified' route name (GTFS agency ID + route ID) for the trip the vehicle is serving. */
    return 'MTA NYCT_' + route_id;
}

function getBearingFromDirection (direction) {
    /*  From nyct-subway.proto   |  From https://bustime.mta.info/wiki/Developers/SIRIMonitoredVehicleJourney
            enum Direction {     |      Vehicle bearing: 0 is East, increments counter-clockwise
                NORTH = 1;       |
                EAST = 2;        |
                SOUTH = 3;       |
                WEST = 4;        |
            }
    */

    var directionToBearingMap = {
        1: 270,
        2: 0,
        3: 90,
        4: 180,
    },

    return directionToBearingMap[direction];
}

function alertToProgressRate (alert) {

/*

message Alert
The only alerts included in the NYCT Subway GTFS-realtime feed are notifications about delayed trains
therefore the entity is always a trip. In general, when a train is shown as ‘delayed’ on the station
countdown clocks, an Alert is generated for that trip in the feed.

message VehiclePosition
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
Note: since VehiclePosition information is not provided until the train starts moving, it is recommended
that feed consumers use the origin terminal departure to determine a train stalled condition. 

 <!-- Indicator of whether the bus is making progress (i.e. moving, generally), not moving (with value noProgress), laying over before beginning a trip (value layover), or serving a trip prior to one which will arrive (prevTrip). -->
    
}


function convertToStopMonitoringMessage (gtfsr_msg) {

    console.log(getTimeStringFromPosix(gtfsr_msg.header.timestamp.low));
}

module.exports = {
    convertToStopMonitoringMessage : convertToStopMonitoringMessage,
};
