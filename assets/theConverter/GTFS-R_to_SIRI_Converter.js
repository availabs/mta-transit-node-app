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
        "MonitoredVehicleJourney" : getStopMonitoringMonitoredVehicleJourney(getParams)          ,
        "RecordedAtTime"          : getMonitoredStopVisitRecordedAtTime(getParams) ,
    };
}


function getVehicleActivity (getParams) {
    return {
        "MonitoredVehicleJourney" : getVehicleMonitoringMonitoredVehicleJourney(getParams)          ,
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
    var mvj = getMonitoredVehicleJourney(getParams.vehicleRef);

    mvj.MonitoredCall = getVehicleMonitoringMonitoredCall(getParams.vehicleRef);

    return mvj;
}

function getMonitoredVehicleJourney (train_id) {
    return {
        "LineRef"                  : getLineRef(train_id)                  ,
        "DirectionRef"             : getDirectionRef(train_id)             ,
        "FramedVehicleJourneyRef"  : getFramedVehicleJourneyRef(train_id)  ,
        "JourneyPatternRef"        : getJourneyPatternRef(train_id)        ,
        "PublishedLineName"        : getPublishedLineName(train_id)        ,
        "OperatorRef"              : getOperatorRef(train_id)              ,
        "OriginRef"                : getOriginRef(train_id)                ,
        "DestinationRef"           : getDestinationRef(train_id)           ,
        "DestinationName"          : getDestinationName(train_id)          ,
        "OriginAimedDepartureTime" : getOriginAimedDepartureTime(train_id) ,
        "SituationRef"             : getSituationRef(train_id)             ,
        "Monitored"                : getMonitored(train_id)                ,
        "VehicleLocation"          : getVehicleLocation(train_id)          ,
        "Bearing"                  : getBearing(train_id)                  ,
        "ProgressRate"             : getProgressRate(train_id)             ,
        "ProgressStatus"           : getProgressStatus(train_id)           ,
        "BlockRef"                 : getBlockRef(train_id)                 ,
        "VehicleRef"               : getVehicleRef(train_id)               ,
        //"MonitoredCall"            Filled in by caller for stop or vehicle reponse.
        "OnwardCalls"              : getOnwardCalls(train_id)              ,
    };
}


function getMonitoredStopVisitRecordedAtTime (getParams) {
    //TODO: Implement;
    return null;
}


function getFramedVehicleJourneyRef (train_id) {
    var trip             = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.trip,
        trip_id          = trip.trip_id,

        dateString       = trip.start_date,
        startDate        = utils.getDateFromDateString(dateString),

        origin_time      = parseInt(trip_id.substring(0, trip_id.indexOf('_'))),

        dataFrameRefDate = getDataFrameRefDate(startDate, origin_time);

    return {
        "DataFrameRef"           : utils.dateToString(dataFrameRefDate),
        "DatedVehicleJourneyRef" : getDatedVehicleJourneyRef(dataFrameRefDate, trip_id),
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


function getLineRef (train_id) {
    return 'MTA_' + GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.trip.route_id;
}


function getDirectionRef (train_id) {
    var trip_id = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.trip.trip_id;

    var direction = trip_id.charAt(trip_id.lastIndexOf('.') + 1);

    return (direction === 'N') ? 1 : 3;
}


function getJourneyPatternRef (getParams) {
    //TODO: Implement
    return null;
}


function getPublishedLineName (train_id) {
    return GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.trip.route_id;
}


function getOperatorRef (getParams) {
    return 'MTA';
}


function getOriginRef (getParams) {
    //TODO: Implement
    return null;
}


function getDestinationRef (train_id) {
    var stop_time_updates = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.stop_time_update;

    return 'MTA_' + stop_time_updates[stop_time_updates.length - 1].stop_id;
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


/*  PJT: I don't think this applies....
    
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


function getVehicleRef (getParams) { //TODO: Implement
    return null;
}


function getOnwardCalls (train_id) { //TODO: Implement
    var stop_time_updates = GTFSr_Data.vehicleIndex[train_id].trip_update.trip_update.stop_time_update;

    return stop_time_updates.map(getCall);
}


function getDataFrameRefDate (schedule_date, origin_time) {
    var refDate = new Date(schedule_date);

    if      ( origin_time < 0)      { refDate.setDate(refDate.getDate() + 1); }
    else if ( origin_time > 144000) { refDate.setDate(refDate.getDate() - 1); }

    return refDate;
}


function getDatedVehicleJourneyRef (date, trip_id) {
    var day = date.getDay(),
        serviceCode,
        tripKey,
        trip;
    
    if      (day === 0) { serviceCode = 'SUN'; } 
    else if (day === 6) { serviceCode = 'SAT'; }
    else                { serviceCode = 'WKD'; }

    tripKey = serviceCode + '_' + trip_id;

    trip = GTFS_Data.trips[tripKey];

    return (trip) ? trip.trip_id : null;
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
    //console.log(stop_time_update);
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
    //console.log(JSON.stringify(getStopMonitoringResponse(getParams), null, '\t'));
    //getVehicleMonitoringResponse(getParams);
    console.log(JSON.stringify(getVehicleMonitoringResponse(getParams), null, '\t'));
}


module.exports = {
    test : test,
};
