'use strict';

var jsonfile = require('jsonfile'),
    filePath = __dirname + '/../sample_messages/nyct-subway-message.json';

var GTFSr_JSON = jsonfile.readFileSync(filePath);

var vehicleIndex = {},
    routeIndex   = {},
    stopsIndex   = {};


(function () {
    var entityType,
        entity,
        trip,

        indicesKeys,

        informed_entity,

        stop_time_updates,
        stop_id,

        train_id,

        i, ii;


    for (i=0; i < GTFSr_JSON.entity.length; ++i) {

        indicesKeys = [];

        entity      = GTFSr_JSON.entity[i];
        entityType  = determineEntityType(entity);


        if (!entityType) { continue; }

        if (entityType === 'alert') { 
            informed_entity = entity.alert.informed_entity;

            for (ii=0; ii < informed_entity.length; ++ii) {
                trip = informed_entity[ii].trip;
                indicesKeys.push(extractIndexKeysFromTrip(trip));
            }

        } else {
            trip = entity[entityType].trip; 
            indicesKeys.push(extractIndexKeysFromTrip(trip)); 
        }

        
        addEntityToVehicleAndRouteIndices(indicesKeys, entityType, entity);

        // If entity is a TripUpdate, scan the stop_time_update array and 
        // add the vehicle to the to the stopsIndex;
        if ( (stop_time_updates = (entity.trip_update && entity.trip_update.stop_time_update)) ) {

            train_id = entity.trip_update.trip['.nyct_trip_descriptor'].train_id;

            for (ii=0; ii <stop_time_updates.length; ++ii) {
                stop_id = stop_time_updates[ii].stop_id;

                if (!stopsIndex[stop_id]) {
                    stopsIndex[stop_id] = newStopIndexNode();
                }

                stopsIndex[stop_id].vehicles.push([train_id, ii]);
            }
        } 
    }
}());


function addEntityToVehicleAndRouteIndices (indicesKeys, entityType, entity) {
    var i;

    for (i=0; i < indicesKeys.length; ++i) {
        addEntityToVehicleIndex(indicesKeys[i].train_id, entityType , entity);
        addEntityToRouteIndex(indicesKeys[i].route_id  , entityType , entity);
    }
}


function determineEntityType (entity) {
    if      ( entity.trip_update ) { return 'trip_update'; }
    else if ( entity.vehicle     ) { return 'vehicle';     }
    else if ( entity.alert       ) { return 'alert';       }
    
    console.log('WARNING: Unrecognized entity type.');
}



function addEntityToVehicleIndex (key, entityType, entity) {
    if (!vehicleIndex[key]) {
        vehicleIndex[key] = newVehicleIndexNode();
    } 

    if (entityType === 'alert') {
        vehicleIndex[key].alert.push(entity);
    } else {
       vehicleIndex[key][entityType] = entity;
    }
}

function addEntityToRouteIndex (key, entityType, entity) {
    addEntityToMultiUpdateIndex(routeIndex, key, entityType, entity);
}


function addEntityToMultiUpdateIndex (index, key, entityType, entity) {
    if (!index[key]) {
        index[key] = newMultiUpdateIndexNode();
    } 

    index[key][entityType].push(entity);
}



function extractIndexKeysFromTrip (trip) {
    return {
        train_id  : trip['.nyct_trip_descriptor'].train_id ,
        route_id  : 'MTA ' + trip.route_id                 ,
    };
}


function newVehicleIndexNode () {
    return {
        alert : [],
    };
}

function newMultiUpdateIndexNode () {
    return {
        trip_update : [],
        vehicle     : [],
        alert       : [],
    };
}

function newStopIndexNode () {
    return {
        vehicles : [],    // We are going to want to sort this one, lazily.
        routes   : {},    // Generate this index lazily (When a route parameter passed in request).
        isSorted : false, // Lazy sorting
    };
}


module.exports = {
    GTFSr_JSON   : GTFSr_JSON,
    vehicleIndex : vehicleIndex,
    routeIndex   : routeIndex,
    stopsIndex   : stopsIndex,
};
