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


    'mouseenterEditor' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSEENTER_EDITOR,
        });
    },

    'mouseleaveEditor' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSELEAVE_EDITOR,
        });
    },


    'mouseenterNode' : function (node) {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSEENTER_NODE,
            'node' : node,
        });
    },

    'mouseoutNode' : function () {
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSEOUT_NODE,
        });
    },

    'mouseClick' : function () {
        console.log('click');
        AppDispatcher.dispatch( { 
            'type' : ActionTypes.MOUSE_CLICK,
        });
    },

    'changeMessageMetadata' : function (newMetadata) {
        AppDispatcher.dispatch( { 
            'type'        : ActionTypes.CHANGE_MESSAGE_METADATA,
            'newMetadata' : newMetadata,
        });
    },

    'addNewDefaultsToAllMetadata' : function (newDefaultsObject) {
        AppDispatcher.dispatch( { 
            'type'              : ActionTypes.ADD_NEW_DEFAULTS_TO_ALL_METADATA,
            'newDefaultsObject' : newDefaultsObject,
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
