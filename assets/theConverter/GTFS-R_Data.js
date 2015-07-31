'use strict';

var jsonfile = require('jsonfile'),
    filePath = __dirname + '/../sample_messages/nyct-subway-message.json';

var GTFSr_JSON = jsonfile.readFileSync(filePath);

var vehicleIndex   = {},
    routeIndex     = {};
    //directionIndex = {};


(function () {
    var entityType,
        entity,
        trip,

        indicesKeys,

        informed_entity,

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


        indexEntity(indicesKeys, entityType, entity);
    }
}());


function indexEntity (indicesKeys, entityType, entity) {
    var i;

    for (i=0; i < indicesKeys.length; ++i) {
        addEntityToVehicleIndex(indicesKeys[i].train_id    , entityType , entity);
        addEntityToRouteIndex(indicesKeys[i].route_id      , entityType , entity);
        //addEntityToDirectionIndex(indicesKeys[i].direction , entityType , entity);
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

//function addEntityToDirectionIndex (key, entityType, entity) {
    //addEntityToMultiUpdateIndex(directionIndex, key, entityType, entity);
//}


function addEntityToMultiUpdateIndex (index, key, entityType, entity) {
    if (!index[key]) {
        index[key] = newMultiUpdateIndexNode();
    } 

    index[key][entityType].push(entity);
}



function extractIndexKeysFromTrip (trip) {
    //var trip_id   = trip.trip_id;
        //direction = trip_id.charAt(trip_id.lastIndexOf('.') + 1);

    return {
        train_id  : trip['.nyct_trip_descriptor'].train_id ,
        route_id  : 'MTA ' + trip.route_id                 ,
        //direction : direction                               ,
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


module.exports = {
    GTFSr_JSON     : GTFSr_JSON,
    vehicleIndex   : vehicleIndex,
    routeIndex     : routeIndex,
    //directionIndex : directionIndex,
};
