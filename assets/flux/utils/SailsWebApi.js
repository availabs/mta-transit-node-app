'use strict';


var d3             = require('d3'),
    ActionCreators = require('../actions/ActionsCreator'),
    messageTypes   = require('../constants/Constants').MTA_MessageTypes;


var getRoutes  = {},
    postRoutes = {};

getRoutes[messageTypes.NYCT_SUBWAY_GTFSR]    = '/subway/metadata';
getRoutes[messageTypes.MTA_BUS_STOP_SIRI]    = 'bus/stop/metadata/';
getRoutes[messageTypes.MTA_BUS_VEHICLE_SIRI] = 'bus/vehicle/metadata';

postRoutes[messageTypes.NYCT_SUBWAY_GTFSR]    = 'update/subway/metadata';
postRoutes[messageTypes.MTA_BUS_STOP_SIRI]    = 'update/bus/stop/metadata/';
postRoutes[messageTypes.MTA_BUS_VEHICLE_SIRI] = 'update/bus/vehicle/metadata';


function sendServerGetRequest (messageType) {
    d3.json(getRoutes[messageType], function(error, json) {
        if (error) { throw error; }

        ActionCreators.handleServerResponse(messageType, json);
    });
}

function sendServerPostRequest () {
    //TODO: Implement
}


module.exports = {

    'requestMessageMetadata' : function (messageType) {
        sendServerGetRequest(messageType);
    },

    'postMetadataUpdate' : function (messageType, metadata) {
        sendServerPostRequest(messageType, postRoutes[messageType], metadata);
    },

};
