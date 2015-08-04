'use strict';

var jsonfile = require('jsonfile'),
    filePath = __dirname + '/../Subway_GTFS_Data/GTFS_Data.json',

    GTFS_JSON = jsonfile.readFileSync(filePath);


function getTripIDForPartialTripName (partialTripName) {
    return (GTFS_JSON.trips[partialTripName] && GTFS_JSON.trips[partialTripName].trip_id) || null;
}

function getTripHeadsignForPartialTripName (partialTripName) {
    return ((GTFS_JSON.trips[partialTripName]) && GTFS_JSON.trips[partialTripName].trip_headsign) || null;
}

function getShapeIDForPartialTripName (partialTripName) {
    return ((GTFS_JSON.trips[partialTripName]) && GTFS_JSON.trips[partialTripName].shape_id) || null;
}

function getRouteShortNameForPartialTripName (partialTripName) {
    return ((GTFS_JSON.trips[partialTripName]) && GTFS_JSON.trips[partialTripName].route_short_name) || null;
}

function getStopName (stopID) {
    var stopData = GTFS_JSON.stops[stopID];

    return (stopData) ? stopData.stop_name : null;
}

module.exports = {
    GTFS_JSON                           : GTFS_JSON                           ,
    getTripIDForPartialTripName         : getTripIDForPartialTripName         ,
    getTripHeadsignForPartialTripName   : getTripHeadsignForPartialTripName   ,
    getShapeIDForPartialTripName        : getShapeIDForPartialTripName        ,
    getRouteShortNameForPartialTripName : getRouteShortNameForPartialTripName ,
    getStopName                         : getStopName                         ,
};
