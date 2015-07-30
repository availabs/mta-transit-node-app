'use strict';



//TODO: Remove next line
/* jshint unused: false */



function padLeft(num, len) {
   return ('0000' + num).slice(-len);
}

function getTimestampFromPosix (posixTime) {
    return getTimestamp(new Date(posixTime * 1000));
}

function getTimestamp (jsDate) {
    var year,
        month,
        date,
        hours,
        minutes,
        seconds,
        millisecs;

    jsDate    = jsDate || new Date();

    year      = jsDate.getFullYear();
    month     = padLeft(jsDate.getMonth() + 1, 2);
    date      = padLeft(jsDate.getDate(), 2);
    hours     = padLeft(jsDate.getHours(), 2);
    minutes   = padLeft(jsDate.getMinutes(), 2);
    seconds   = padLeft(jsDate.getSeconds(), 2);
    millisecs = padLeft(jsDate.getMilliseconds(), 3);

    return [year, month, date].join('-') +
           'T'   +
           [hours, minutes, seconds].join('-') + '.' + millisecs +
           '-'   + '04:00';
}

function dateToString (date) {
    var offsetDate = getOffsetDate(date);

    return offsetDate.getFullYear()              + '-' +
           padLeft(offsetDate.getMonth() + 1, 2) + '-' +
           padLeft(offsetDate.getDate(), 2)            ;
}


function getOffsetDate (date) {
    var offsetDate = new Date(date);

    offsetDate.setTime(offsetDate.getTime() + (offsetDate.getTimezoneOffset() * 60 * 1000));

    return offsetDate;
}


//FIXME: Rename
function getDateFromDateString(dateString) {
    var date;

    dateString = dateString.substring(0,4) + '/' + 
                 dateString.substring(4,6) + '/' + 
                 dateString.substring(6);
    
    return new Date(dateString);
}



function getLineRefFromRouteID (route_id) {
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

module.exports = {
    padLeft               : padLeft,
    getDateFromDateString : getDateFromDateString,
    dateToString          : dateToString,
    getTimestamp          : getTimestamp,
    getTimestampFromPosix : getTimestampFromPosix,
};
