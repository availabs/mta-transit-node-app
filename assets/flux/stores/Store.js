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

    _mouseIsInEditor = false,

    _messageMetadata = {},

    _flaredMessageMetadataTrees = {},

    _treeNodeMap = {}, // Easier way to get around the flared trees' nodes. 

    _messageTypeToName = utils.messageTypeToName,

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
            data                : _flaredMessageMetadataTrees[_selectedMessageType],
            selectedNode        : null, // FIXME: Reset for _.assign. 
            mouseoveredNode     : null, // Shouldn't need this. Figure out...
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


    '_handleMouseenterEditor' : function () {
        _mouseIsInEditor = true;
    },

    '_handleMouseleaveEditor' : function () {
        if (_treeStates[_selectedMessageType].mouseoveredNode) { return; } //FIXME: Not working as it should.

        _mouseIsInEditor = false;
    },


    '_handleMouseenterNode' : function (mouseoveredNode) {
        _treeStates[_selectedMessageType].mouseoveredNode = mouseoveredNode;
        this._emitStateChangedEvent();
    },

    '_handleMouseoutNode' : function () {
        if (!_selectedMessageType || _mouseIsInEditor) { return; }

        _treeStates[_selectedMessageType].mouseoveredNode = null;
        
        this._emitStateChangedEvent();
    },


    '_handleMouseClick' : function () {
        var treeState = _treeStates[_selectedMessageType];

        if (!treeState || (treeState.selectedNode && _mouseIsInEditor)) { return; }

        if (_mouseIsInEditor) {
            // editor is over the mouseovered node. FIXME: Not working as should.
            treeState.selectedNode = treeState.mouseoveredNode;
        } else {
            // Toggle selected node.
            treeState.selectedNode = (treeState.selectedNode === treeState.mouseoveredNode) ? null : treeState.mouseoveredNode;
        }

        this._emitStateChangedEvent();
    },


    '_handleAddNewDefaultsToAllMetadataObjets' : function (newDefaultsObject) {

        _.forOwn(_messageMetadata, function(metadataMap, messageType) {
            var dirtyNodes = _treeStates[messageType].dirtyNodes;

            _.forOwn(metadataMap, function (metadata, path) {
                var newProperties = _.omit(newDefaultsObject, _.keys(metadata));

                if (! _.isEmpty(newProperties)) {
                    dirtyNodes.push(_treeNodeMap[messageType][path]);
                    _.assign(metadata, newProperties);
                }
            });

            dirtyNodes = _.uniq(dirtyNodes);
        }); 

        this._emitStateChangedEvent();
    },


    '_handleChangeMessageMetadata' : function (newMetadata) {
        _.assign(_treeStates[_selectedMessageType].selectedNode.metadata, newMetadata);

        markTreeNodeDirty();

        this._emitStateChangedEvent();
    },

    '_handleServerResponse' : function (messageType, data) {
        _messageMetadata[messageType] = data;

        _flaredMessageMetadataTrees[messageType] = toFlare(messageType, data); 

        this._emitStateChangedEvent();
    },

    '_handleCommitMetadataChanges' : function () {
        sailsWebApi.postMetadataUpdate(_selectedMessageType, _messageMetadata[_selectedMessageType]);

        _treeStates[_selectedMessageType].dirtyNodes = [];

        this._emitStateChangedEvent();
    },
});



thisStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.SELECT_MESSAGE_TYPE:
        thisStore._handleSelectMessageType(payload.messageType);
        break;

    case ActionTypes.MOUSEENTER_EDITOR:
        thisStore._handleMouseenterEditor();
        break;

    case ActionTypes.MOUSELEAVE_EDITOR:
        thisStore._handleMouseleaveEditor();
        break;

    case ActionTypes.MOUSEENTER_NODE:
        thisStore._handleMouseenterNode(payload.node);
        break;

    case ActionTypes.MOUSEOUT_NODE:
        thisStore._handleMouseoutNode();
        break;

    case ActionTypes.MOUSE_CLICK:
        thisStore._handleMouseClick();
        break;

    case ActionTypes.CHANGE_MESSAGE_METADATA:
        thisStore._handleChangeMessageMetadata(payload.newMetadata);
        break;

    case ActionTypes.ADD_NEW_DEFAULTS_TO_ALL_METADATA:
        thisStore._handleAddNewDefaultsToAllMetadataObjets(payload.newDefaultsObject);
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
        mouseoveredNode : null,
        selectededNode  : null,
        dirtyNodes      : [],
    };
}

function markTreeNodeDirty () {
    var treeState = _treeStates[_selectedMessageType];

    treeState.dirtyNodes.push(treeState.selectedNode);
    treeState.dirtyNodes = _.uniq(treeState.dirtyNodes);
}


function toFlare (messageType, data) {
    var flare   = newFlareNode(_messageTypeToName[messageType]),
        isoTree = { '': flare },
        keys    = Object.keys(data).map(function (k) { return k.split(','); }),
        i;

    flare.metadata.notes = 'Changes to the root are not persisted.';

    _treeNodeMap[messageType] = {};

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

        _treeNodeMap[messageType][thisName] = thisNode;

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
