"use strict";



var EventEmitter  = require('events').EventEmitter,
    assign        = require('object-assign'),
    _             = require('lodash'),

    AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../constants/Constants.js'),
    sailsWebApi   = require('../utils/SailsWebApi'),
    utils         = require('../../utils/apiUtils');



var ActionTypes   = Constants.ActionTypes,

    STATE_CHANGED = Constants.EventTypes.STATE_CHANGED;


var _selectedMessageType,

    _messageMetadata       = {},

    _flaredMessageMetadata = {},

    _messageTypeToName     = utils.messageTypeToName,

    _treeStates = _.mapValues(Constants.MTA_MessageTypes, function() { return newTreeState(); });




var thisStore = assign({}, EventEmitter.prototype, {
    

    '_emitStateChangedEvent': function() {
        this.emit(STATE_CHANGED);
    },

    'registerStateChangedListener': function(callback) {
        this.on(STATE_CHANGED, callback);
    },

    'removeStateChangedListener': function(callback) {
        this.removeListener(STATE_CHANGED, callback);
    },


    'getState' : function () {
        var state = {
            selectedMessageType : _selectedMessageType,
            data                : _flaredMessageMetadata[_selectedMessageType],
        };

        _.assign(state, _treeStates[_selectedMessageType]);

        return state;
    },


    '_handleSelectMessageType': function (messageType) {
        _selectedMessageType = messageType;

        if (_messageMetadata[messageType]) {
            this._emitStateChangedEvent();
        } else {
           sailsWebApi.requestMessageMetadata(messageType);
        }
    },


    '_handleMouseoverNode' : function (mouseoveredNode) {
        if(_treeStates[_selectedMessageType].mouseoveredNode !== mouseoveredNode) {
            _treeStates[_selectedMessageType].mouseoveredNode = mouseoveredNode;
            this._emitStateChangedEvent();
        }
    },

    '_handleMouseoutNode' : function () {
        _treeStates[_selectedMessageType].mouseoveredNode = null;
        
        this._emitStateChangedEvent();
    },

    '_handleSelectNode' : function (node) {
        _treeStates[_selectedMessageType].selectedNode = node;
        
        this._emitStateChangedEvent();
    },

    '_handleDeselectNode' : function () {
        _treeStates[_selectedMessageType].selectedNode = undefined;
        
        this._emitStateChangedEvent();
    },


    '_handleChangeMessageMetadata' : function (newMetadata) {
        _.assign(_treeStates[_selectedMessageType].selectedNode.metadata, newMetadata);

        markTreeNodeDirty();

        this._emitStateChangedEvent();
    },

    '_handleServerResponse' : function (messageType, data) {
        _messageMetadata[messageType] = data;

        _flaredMessageMetadata[messageType] = toFlare(_messageTypeToName[messageType], data); 

        this._emitStateChangedEvent();
    },

    '_handleCommitMetadataChanges' : function () {
        sailsWebApi.postMetadataUpdate(_selectedMessageType, _messageMetadata[_selectedMessageType]);

        _treeStates[_selectedMessageType].dirtyNodes.length = 0;

        this._emitStateChangedEvent();
    },

});



thisStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.SELECT_MESSAGE_TYPE:
        thisStore._handleSelectMessageType(payload.messageType);
        break;

    case ActionTypes.MOUSEOVER_NODE:
        thisStore._handleMouseoverNode(payload.node);
        break;

    case ActionTypes.MOUSEOUT_NODE:
        thisStore._handleMouseoutNode();
        break;

    case ActionTypes.SELECT_NODE:
        thisStore._handleSelectNode(payload.node);
        break;

    case ActionTypes.DESELECT_NODE:
        thisStore._handleDeselectNode();
        break;

    case ActionTypes.CHANGE_MESSAGE_METADATA:
        thisStore._handleChangeMessageMetadata(payload.newMetadata);
        break;

    case ActionTypes.COMMIT_METADATA_CHANGES:
        thisStore._handleCommitMetadataChanges();
        break;

    case ActionTypes.HANDLE_SERVER_RESPONSE:
        thisStore._handleServerResponse(payload.messageType, payload.response);
        break;

    default:
  }
});



function newTreeState () {
    return {
        mouseoveredNode : undefined,
        selectededNode  : undefined,
        dirtyNodes      : [],
    };
}

function markTreeNodeDirty () {
    var treeState = _treeStates[_selectedMessageType];

    treeState.dirtyNodes.push(treeState.selectedNode);
    treeState.dirtyNodes = _.uniq(treeState.dirtyNodes);
}


function toFlare (rootName, data) {
    var flare   = newFlareNode(rootName),
        isoTree = { '': flare },
        keys    = Object.keys(data).map(function (k) { return k.split(','); }),
        i;

    keys = keys.sort(function(a,b) {
        var i, comp;

        if (a.length === b.length) {
            for (i=0; i < a.length; ++i) {
                if((comp = a[i].localeCompare(b[i]))) {
                    return comp;
                }
            }
        } else {
            return a.length - b.length;
        }
    });

    for (i=0; i<keys.length; ++i) {
        var thisName   = keys[i].join(','),
            thisNode   = newFlareNode(keys[i][keys[i].length - 1], data[thisName], thisName),
            parentName = keys[i].slice(0, -1).join(','),
            parentNode = isoTree[parentName];

        isoTree[thisName] = thisNode;
        data[thisName]    = thisNode.metadata;  // Link for easy shared mutations.

        parentNode.children = parentNode.children || [];
        parentNode.children.push(thisNode);
    }


    function newFlareNode (name, metadata, path) {
        return {
            name       : name,
            metadata   : metadata ? metadata : utils.newMetadataObject(path),
        };
    }

    return flare;
}

module.exports = thisStore;
