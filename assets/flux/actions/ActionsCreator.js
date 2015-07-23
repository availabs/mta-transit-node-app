"use strict";


var AppDispatcher     = require('../dispatcher/AppDispatcher'),
    ActionTypes       = require('../constants/Constants').ActionTypes,
    messageNameToType = require('../../utils/apiUtils').messageNameToType;


module.exports = {

    'selectMessageTypeByName' : function (messageName) {
        AppDispatcher.dispatch( { 
            'type'        : ActionTypes.SELECT_MESSAGE_TYPE,
            'messageType' : messageNameToType[messageName],
        });
    },


    'mouseoverNode' : function (node) {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSEOVER_NODE,
            'node' : node,
        });
    },

    'mouseoutNode' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSEOUT_NODE,
        });
    },

    'selectNode' : function (node) {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.SELECT_NODE,
            'node' : node,
        });
    },

    'deselectNode' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.DESELECT_NODE,
        });
    },


    'changeMessageMetadata' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.CHANGE_MESSAGE_METADATA,
        });
    },

    'commitMetadataChanges' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.COMMIT_METADATA_CHANGES,
        });
    },


    'handleServerResponse' : function (messageType, response) {
        AppDispatcher.dispatch( { 
            'type'        : ActionTypes.HANDLE_SERVER_RESPONSE,
            'messageType' : messageType,
            'response'    : response,
        });
    },
};
