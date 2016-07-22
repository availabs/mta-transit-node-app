'use strict';

var _ = require('lodash'),

    MTA_MessageTypes = require('../flux/constants/Constants').MTA_MessageTypes;


var messageTypeToName = {},
    messageNameToType;

messageTypeToName[MTA_MessageTypes.MTA_BUS_STOP]    = 'MTA Bus Stop-Monitoring SIRI Metadata';
messageTypeToName[MTA_MessageTypes.MTA_BUS_VEHICLE] = 'MTA Bus Vehicle-Monitoring SIRI Metadata';

messageTypeToName[MTA_MessageTypes.MTA_SUBWAY_GTFSRT]       = 'NYCT Subway GTFS-R Metadata';
messageTypeToName[MTA_MessageTypes.MTA_SUBWAY_SIRI_STOP]    = 'NYCT Subway Stop-Monitoring Metadata';
messageTypeToName[MTA_MessageTypes.MTA_SUBWAY_SIRI_VEHICLE] = 'NYCT Subway Vehicle-Monitoring Metadata';

messageNameToType = _.invert(messageTypeToName);


function newMetadataObject (path) {
    return {
        path        : path || '' ,
        description : ''         ,
        mapping     : ''         ,
        notes       : ''         ,
    };
}

module.exports = {
    messageTypeToName : messageTypeToName,
    messageNameToType : messageNameToType,
    newMetadataObject : newMetadataObject,
};


