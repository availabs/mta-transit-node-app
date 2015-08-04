'use strict';

/* jshint unused: false */

// Goal is to keep all GTFS-R concepts/logic in this file,
// and all GTFS and SIRI logic in their respective files.


var jsonfile = require('jsonfile'),
    _        = require('lodash');


var utils      = require('./utils'),
    filePath   = __dirname + '/../sample_messages/nyct-subway-message.json',

    GTFSr_JSON = jsonfile.readFileSync(filePath),
    GTFS       = require('./GTFS_Data');


var trainsIndex = {},
    routesIndex = {},
    stopsIndex  = {};


_.forEach(_.values(GTFSr_JSON.entity), function (entity) { 

        switch (determineEntityType(entity)) {

            case 'Alert' :
                indexAlert(entity.alert);
                break;

            case 'TripUpdate' :
                indexTripUpdate(entity.trip_update);
                break;

            case 'VehiclePosition' :
                indexVehiclePostion(entity.vehicle);
                break;

            default :
                console.log('WARNING: Unrecognized message type.');
        }
});



//========================= The indexers =========================\\

function indexAlert (alertMessage) {
    _.forEach(_.values(alertMessage.informed_entity), function (informedEntity) {
        var trainID = informedEntity.trip['.nyct_trip_descriptor'].train_id,
            routeID = informedEntity.trip.route_id;

        (trainsIndex[trainID] || (trainsIndex[trainID] = newTrainIndexNode())).alerts.push(alertMessage);

        (routesIndex[routeID] || (routesIndex[routeID] = {}))[trainID] = 1;
    });
} 


function indexTripUpdate (tripUpdateMessage) {
    var trainID = tripUpdateMessage.trip['.nyct_trip_descriptor'].train_id,
        routeID = tripUpdateMessage.trip.route_id;

    (trainsIndex[trainID] || (trainsIndex[trainID] = newTrainIndexNode())).tripUpdate = tripUpdateMessage;

    (routesIndex[routeID] || (routesIndex[routeID] = {}))[trainID] = 1;

    _.forEach(_.values(tripUpdateMessage.stop_time_update), function (stopTimeUpdate) {
        var stopID     = stopTimeUpdate.stop_id,

            timeAtStop = (stopTimeUpdate.arrival   && stopTimeUpdate.arrival.time.low)   ||
                         (stopTimeUpdate.departure && stopTimeUpdate.departure.time.low) ||
                         Number.POSITIVE_INFINITY;

                        
        trainsIndex[trainID].stops[stopID] = stopTimeUpdate; 
        (stopsIndex[stopID] || (stopsIndex[stopID] = {}))[trainID] = timeAtStop;
    });
}


function indexVehiclePostion (vehiclePositionMessage) {
    var trainID = vehiclePositionMessage.trip['.nyct_trip_descriptor'].train_id,
        routeID = vehiclePositionMessage.trip.route_id;

    (trainsIndex[trainID] || (trainsIndex[trainID] = newTrainIndexNode())).vehiclePosition = vehiclePositionMessage;
    (routesIndex[routeID] || (routesIndex[routeID] = {}))[trainID] = 1; // Redundant IF all trains have both a TripUpdate & VehiclePositio.
}




//========================= The API =========================\\
// TODO: put all external facing functions in an object, 
//       set module.exports equal to that object

function getAllMonitoredTrains() {
    return _.keys(trainsIndex);
}

function getTripUpdateForTrain (trainID) {
    return trainsIndex[trainID].tripUpdate; 
}

function getVehiclePositionUpdateForTrain (trainID) {
    return trainsIndex[trainID].vehiclePosition;
}

function getAlertsForTrain (trainID) {
    // TODO Implement Alert indexing.
}



function getTripUpdatesForRoute (routeID) {
    return routesIndex.tripUpdates;
}

function getVehiclePositionUpdatesForRoute (routeID) {
    return routesIndex.trainPositions;
}

function getAlertsForRoute (routeID) {
    return routesIndex.alerts;
}

function getStopTimeUpdatesForTrain (trainID) {
    return trainsIndex[trainID].tripUpdate.stop_time_update;
}

function getTripForTrain (trainID) {
    return trainsIndex[trainID].tripUpdate.trip;
}

function getGTFSrTripIDForTrain (trainID) {
    return getTripForTrain(trainID).trip_id;
}

function getRouteIDForTrain (trainID) {
    return getTripForTrain(trainID).route_id;
}

function getStartDateForTrain (trainID) {
    var dateStr = getTripForTrain(trainID).start_date;

    return utils.getDateFromDateString(dateStr);
}

function getOriginTimeForTrain (trainID) {
    var tripID = getGTFSrTripIDForTrain(trainID);

    return parseInt(tripID.substring(0, tripID.indexOf('_')));
}

function getOnwardCallsForTrain (trainID, maxOnwardCalls) {
    return trainsIndex[trainID].tripUpdate.stop_time_update;
}

function getIDOfNextStopForTrain (trainID) {
    var nextStop = _.first(getOnwardCallsForTrain(trainID));
    return (nextStop) ? nextStop.stop_id : null;
}

function getFirstOnwardCallForTrain (trainID) {
    return _.first(getOnwardCallsForTrain(trainID));
}

function getFirstNOnwardCallsForTrain (trainID, n) {
    return _.take(getOnwardCallsForTrain(trainID), n);
}

function getNthOnwardCallForTrain (trainID, n) {
    return getOnwardCallsForTrain(trainID)[n];
}

function getStopTimeUpdateForStopForTrain (stopID, trainID) {
    return trainsIndex[trainID].stops[stopID];
}

function getDestinationStopTimeUpdateForTrain (trainID) {
    return _.last(getOnwardCallsForTrain(trainID));
}

function getDestinationIDForTrain (trainID) { //FIXME: Mess. At least make more defensively coded.
    return getDestinationStopTimeUpdateForTrain(trainID).stop_id;
}

function getTripScheduleDateForTrain (trainID) {
    var startDate  = getStartDateForTrain(trainID),
        originTime = getOriginTimeForTrain(trainID),
    
        scheduleDate  = new Date(startDate);

    if      ( originTime < 0 )      { scheduleDate.setDate(scheduleDate.getDate() + 1); }
    else if ( originTime > 144000 ) { scheduleDate.setDate(scheduleDate.getDate() - 1); }

    return scheduleDate;
}


function getGTFSTripIDForTrain (trainID) {
    var partialTripName = getPartialGTFSTripNameForTrain(trainID);

    return GTFS.getTripIDForPartialTripName(partialTripName);
}

function getGTFSTripHeadsignForTrain (trainID) {
    var partialTripName = getPartialGTFSTripNameForTrain(trainID);

    return GTFS.getTripHeadsignForPartialTripName(partialTripName);
}

function getGTFSShapeIDForTrain (trainID) {
    var partialTripName = getPartialGTFSTripNameForTrain(trainID);

    return GTFS.getShapeIDForPartialTripName(partialTripName);
}

function getGTFSRouteShortNameForTrain (trainID) {
    return trainsIndex[trainID].tripUpdate.trip.route_id;
}


var getPartialGTFSTripNameForTrain = _.memoize(function (trainID) {
    var tripDate     = getTripScheduleDateForTrain(trainID),
        tripID       = getGTFSrTripIDForTrain(trainID),
        day          = tripDate.getDay(),
        serviceCode,
        coreTripID,
        trip;

    
    if      (day === 0) { serviceCode = 'SUN'; } 
    else if (day === 6) { serviceCode = 'SAT'; }
    else                { serviceCode = 'WKD'; }

    coreTripID = tripID.substring(0, tripID.lastIndexOf('.') + 2);

    return serviceCode + '_' + coreTripID;
});


function getTrainsServicingStop (stopID) {
    if ( ! Array.isArray(stopsIndex[stopID]) ) {
        stopsIndex[stopID] = convertStopIndexNodeObjectToSortedArray(stopID);
    }

    return stopsIndex[stopID];
}

function getTrainsServicingRoute (routeID) {
    if ( ! Array.isArray(routesIndex[routeID]) ) {
        routesIndex[routeID] = Object.keys(routesIndex[routeID]);
    }

    return routesIndex[routeID];
}

function getTrainsServicingStopForRoute(stopID, routeID) {
    return _.intersection(getTrainsServicingStop(stopID), getTrainsServicingRoute(routeID));
}

function convertStopIndexNodeObjectToSortedArray (stopID) {
    var trainArrivalTimePairs = _.pairs(stopsIndex[stopID]);

    trainArrivalTimePairs.sort(function (pair) { return pair[1]; });

    return _.pluck(trainArrivalTimePairs, 0);
}


function getTrainArrivalTimeForStop (trainID, stopID) {
    var stopTimeUpdate    = trainsIndex[trainID].stops[stopID],
        arrivalTimeUpdate = stopTimeUpdate && stopTimeUpdate.arrival;

    return (arrivalTimeUpdate && arrivalTimeUpdate.time.low) || null;
}


function getTrainDepartureTimeForStop (trainID, stopID) {
    var stopTimeUpdate      = trainsIndex[trainID].stops[stopID],
        departureTimeUpdate = stopTimeUpdate && stopTimeUpdate.departure;

    return (departureTimeUpdate && departureTimeUpdate.time.low) || null;
}


function getDestinationIDForTrain (trainID) { //FIXME: Mess. At least make more defensively coded.
    var lastStop = _.last(getStopTimeUpdatesForTrain(trainID));

    return (lastStop) ? lastStop.stop_id : null;
}



//========================= The helpers =========================\\


function determineEntityType (entity) {
    if      ( entity.trip_update ) { return 'TripUpdate'      ; }
    else if ( entity.vehicle     ) { return 'VehiclePosition' ; }
    else if ( entity.alert       ) { return 'Alert'           ; }
}


function newTrainIndexNode () {
    return {
        tripUpdate      : null,
        vehiclePosition : null,
        alerts          : [],
        stops           : {},
    };
}




//========================= Export the API =========================\\


module.exports = { 
    trainsIndex                             : trainsIndex                             ,
    routesIndex                             : routesIndex                             ,
    stopsIndex                              : stopsIndex                              ,
    getAllMonitoredTrains                   : getAllMonitoredTrains                   ,
    getTrainsServicingRoute                 : getTrainsServicingRoute                 ,
    getTripUpdateForTrain                   : getTripUpdateForTrain                   ,
    getVehiclePositionUpdateForTrain        : getVehiclePositionUpdateForTrain        ,
    getAlertsForTrain                       : getAlertsForTrain                       ,
    getTripUpdatesForRoute                  : getTripUpdatesForRoute                  ,
    getVehiclePositionUpdatesForRoute       : getVehiclePositionUpdatesForRoute       ,
    getAlertsForRoute                       : getAlertsForRoute                       ,
    getStopTimeUpdatesForTrain              : getStopTimeUpdatesForTrain              ,
    getTripForTrain                         : getTripForTrain                         ,
    getGTFSTripIDForTrain                   : getGTFSTripIDForTrain                   ,
    getGTFSrTripIDForTrain                  : getGTFSrTripIDForTrain                  ,
    getRouteIDForTrain                      : getRouteIDForTrain                      ,
    getStartDateForTrain                    : getStartDateForTrain                    ,
    getOriginTimeForTrain                   : getOriginTimeForTrain                   ,
    getOnwardCallsForTrain                  : getOnwardCallsForTrain                  ,
    getIDOfNextStopForTrain                 : getIDOfNextStopForTrain                 ,
    getFirstOnwardCallForTrain              : getFirstOnwardCallForTrain              ,
    getFirstNOnwardCallsForTrain            : getFirstNOnwardCallsForTrain            ,
    getNthOnwardCallForTrain                : getNthOnwardCallForTrain                ,
    getStopTimeUpdateForStopForTrain        : getStopTimeUpdateForStopForTrain        ,
    getDestinationStopTimeUpdateForTrain    : getDestinationStopTimeUpdateForTrain    ,
    getDestinationIDForTrain                : getDestinationIDForTrain                ,
    getTripScheduleDateForTrain             : getTripScheduleDateForTrain             ,
    getGTFSTripHeadsignForTrain             : getGTFSTripHeadsignForTrain             ,
    getGTFSShapeIDForTrain                  : getGTFSShapeIDForTrain                  ,
    getPartialGTFSTripNameForTrain          : getPartialGTFSTripNameForTrain          ,
    getGTFSRouteShortNameForTrain           : getGTFSRouteShortNameForTrain           ,    
    getTrainsServicingStop                  : getTrainsServicingStop                  ,
    getTrainsServicingStopForRoute          : getTrainsServicingStopForRoute          ,
    convertStopIndexNodeObjectToSortedArray : convertStopIndexNodeObjectToSortedArray ,
    getTrainArrivalTimeForStop              : getTrainArrivalTimeForStop              ,
    getTrainDepartureTimeForStop            : getTrainDepartureTimeForStop            ,
};
