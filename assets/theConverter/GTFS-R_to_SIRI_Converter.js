'use strict';

//TODO: Remove next line
/* jshint unused: false */


var _          = require('lodash'),

    GTFS_Data  = require('./GTFS_Data'),
    GTFSr_Data = require('./GTFS-R_Data'),
    utils      = require('./utils');


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
    return {
        "MonitoredVehicleJourney" : getStopMonitoringMonitoredVehicleJourney(getParams) ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime(getParams)      ,
    };
}


function getVehicleActivity (getParams) {
    var requestedTrains = (getParams && getParams.vehicleRef) ? [getParams.vehicleRef] : Object.keys(GTFSr_Data.vehicleIndex),
        routeTrains;
        
    // FIXME: ??? Perhaps better to just create an array of trains serving the route in GTFS-R_Data ???
    if (getParams && getParams.lineRef) {
        routeTrains = GTFSr_Data.routeIndex[getParams.lineRef]
                                .trip_update.map(function (update) { 
                                                    return update.trip_update.trip[".nyct_trip_descriptor"].train_id;
                                                });
        requestedTrains = _.intersection(requestedTrains, routeTrains);
    }

    console.log(routeTrains);

   //if (getParams && getParams.directionRef) {
       //requestedTrains = _.intersection(requestedTrains, Object.keys(GTFSr_Data.directionIndex));
   //}

    //FIXME: Handle trains with only alerts.
    requestedTrains = requestedTrains.filter(function (train_id) { 
        return !!(GTFSr_Data.vehicleIndex[train_id].trip_update); 
    });

    return requestedTrains.map(function (train_id) {
        return {
            "MonitoredVehicleJourney" : getVehicleMonitoringMonitoredVehicleJourney(train_id) ,
            "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime(getParams)        ,
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

function getStopMonitoringMonitoredVehicleJourney (getParams) {
    var mvj = getMonitoredVehicleJourney();

    mvj.MonitoredCall = getStopMonitoringMonitoredCall();

    return mvj;
}

function getVehicleMonitoringMonitoredVehicleJourney (train_id) {
    var mvj = getMonitoredVehicleJourney(train_id);

    mvj.MonitoredCall = getVehicleMonitoringMonitoredCall(train_id);

    return mvj;
}

function getMonitoredVehicleJourney (train_id) {
    var trip             = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.trip,
        trip_id          = trip.trip_id,
        route_id         = trip.route_id,

        startDateStr     = trip.start_date,
        startDate        = utils.getDateFromDateString(startDateStr),

        origin_time      = parseInt(trip_id.substring(0, trip_id.indexOf('_'))),

        dataFrameRefDate = getDataFrameRefDate(startDate, origin_time),

        tripKey          = getScheduledTripKey(dataFrameRefDate, trip_id),

        destination_id   = getDestinationID(train_id);


    return {
        "LineRef"                  : getLineRef(route_id)                                  ,
        "DirectionRef"             : getDirectionRef(trip_id)                              ,
        "FramedVehicleJourneyRef"  : getFramedVehicleJourneyRef(dataFrameRefDate, tripKey) ,
        "JourneyPatternRef"        : getJourneyPatternRef(tripKey)                         ,
        "PublishedLineName"        : getPublishedLineName(tripKey)                         ,
        "OperatorRef"              : getOperatorRef()                                      ,
        "OriginRef"                : getOriginRef(train_id)                                ,
        "DestinationRef"           : getDestinationRef(destination_id)                     ,
        "DestinationName"          : getDestinationName(destination_id)                    ,

        "OriginAimedDepartureTime" : getOriginAimedDepartureTime(train_id)                 ,
        "SituationRef"             : getSituationRef(train_id)                             ,
        "Monitored"                : getMonitored(train_id)                                ,
        "VehicleLocation"          : getVehicleLocation(train_id)                          ,
        "Bearing"                  : getBearing(train_id)                                  ,
        "ProgressRate"             : getProgressRate(train_id)                             ,
        "ProgressStatus"           : getProgressStatus(train_id)                           ,
        "BlockRef"                 : getBlockRef(train_id)                                 ,
        "VehicleRef"               : getVehicleRef(train_id)                               ,
        //"MonitoredCall"            Filled in by caller for stop or vehicle reponse.
        "OnwardCalls"              : getOnwardCalls(train_id)                              ,
    };
}


function getMonitoredStopVisitRecordedAtTime (getParams) {
    //TODO: Implement;
    return null;
}


function getFramedVehicleJourneyRef (dataFrameRefDate, tripKey) {
    return {
        "DataFrameRef"           : utils.dateToString(dataFrameRefDate) ,
        "DatedVehicleJourneyRef" : getDatedVehicleJourneyRef(tripKey)   ,
    };
}


function getVehicleLocation (train_id) {
    return {
        "Longitude" : getLongitude(train_id) ,
        "Latitude"  : getLatitude(train_id)  ,
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


function getLineRef (route_id) {
    return 'MTA ' + route_id;
}


function getDirectionRef (trip_id) {
    var direction = trip_id.charAt(trip_id.lastIndexOf('.') + 1);

    return (direction === 'N') ? 1 : 3;
}


// ??? Use the shape id encoded in the route name ???
function getJourneyPatternRef (tripKey) {
    var shape_id = (GTFS_Data.trips[tripKey] && GTFS_Data.trips[tripKey].shape_id);
    return (shape_id) ? ('MTA ' + shape_id) : null;
}


function getPublishedLineName (tripKey) {
    return (GTFS_Data.trips[tripKey]) ? GTFS_Data.trips[tripKey].route_short_name : null;
}


function getOperatorRef () {
    return 'MTA';
}


function getOriginRef (getParams) {
    //TODO: Implement
    return null;
}


function getDestinationID (train_id) { //FIXME: Mess. At least make more defensively coded.
    var stop_time_updates = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.stop_time_update;

    return (stop_time_updates.length) ? stop_time_updates[stop_time_updates.length - 1].stop_id : null;
}

function getDestinationRef (stop_id) {
    return stop_id ? ('MTA ' + stop_id) : null;
}


function getDestinationName (stop_id) {
    return (stop_id) ? GTFS_Data.stops[stop_id].stop_name : null;
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


function getVehicleRef (train_id) { //TODO: Implement
    return 'MTA ' + train_id;
}


function getOnwardCalls (train_id) { //TODO: Implement
    var stop_time_updates = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.stop_time_update;

    return stop_time_updates.map(getCall);
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
    console.log(tripKey);
    var tripID = GTFS_Data.trips[tripKey];

    return (tripID) ? GTFS_Data.trips[tripKey].trip_id : null;
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
    //console.log(JSON.stringify(getStopMonitoringResponse(getParams), null, '\t'));
    //getVehicleMonitoringResponse(getParams);
    console.log(JSON.stringify(getVehicleMonitoringResponse(getParams), null, '\t'));
    //console.log(Object.keys(GTFSr_Data.vehicleIndex));
}


module.exports = {
    test : test,
};
