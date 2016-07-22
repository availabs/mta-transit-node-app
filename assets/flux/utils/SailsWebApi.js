'use strict';


var d3             = require('d3'),
    ActionCreators = require('../actions/ActionsCreator'),
    messageTypes   = require('../constants/Constants').MTA_MessageTypes;


var getRoutes  = {},
    postRoutes = {};

getRoutes[messageTypes.MTA_BUS_STOP]    = '/bus/stop/metadata/';
getRoutes[messageTypes.MTA_BUS_VEHICLE] = '/bus/vehicle/metadata';
getRoutes[messageTypes.MTA_SUBWAY_GTFSRT]    = '/subway/gtfsrt/metadata';
getRoutes[messageTypes.MTA_SUBWAY_SIRI_STOP]    = '/subway/siri/stop/metadata';
getRoutes[messageTypes.MTA_SUBWAY_SIRI_VEHICLE]    = '/subway/siri/vehicle/metadata';

postRoutes[messageTypes.MTA_BUS_STOP]    = '/update/bus/stop/metadata/';
postRoutes[messageTypes.MTA_BUS_VEHICLE_SIRI] = '/update/bus/vehicle/metadata';
postRoutes[messageTypes.MTA_SUBWAY_GTFSRT]    = '/update/subway/gtfsrt/metadata';


function sendServerGetRequest (messageType) {
    d3.json(getRoutes[messageType], function(error, json) {
        if (error) { throw error; }

        ActionCreators.handleServerResponse(messageType, json);
    });
}

function sendServerPostRequest (messageType, metadata) {
    d3.xhr(postRoutes[messageType])
        .header("Content-Type", "application/json")
        .post(
            JSON.stringify(metadata),
            function(err){
                console.log("Metadata commit err", err);
            }
        );
}


module.exports = {

    'requestMessageMetadata' : function (messageType) {
        sendServerGetRequest(messageType);
    },

    'postMetadataUpdate' : function (messageType, metadata) {
        sendServerPostRequest(messageType, metadata);
    },

};
