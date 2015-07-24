'use strict';

var ActionsCreator = require('../flux/actions/ActionsCreator');

function addNewDefaultsToAllMetadata (newDefaultsObject) {
    ActionsCreator.addNewDefaultsToAllMetadata(newDefaultsObject); 
}

module.exports = {
    addNewDefaultsToAllMetadata : addNewDefaultsToAllMetadata,
};
