'use strict';

var _ = require('lodash'),

    MTA_MessageTypes = require('../flux/constants/Constants').MTA_MessageTypes;


var messageTypeToName = {},
    messageNameToType;

messageTypeToName[MTA_MessageTypes.NYCT_SUBWAY_GTFSR]    = 'NYCT Subway GTFS-R Metadata'   ;
messageTypeToName[MTA_MessageTypes.MTA_BUS_STOP_SIRI]    = 'MTA Bus Stop SIRI Metadata'    ;
messageTypeToName[MTA_MessageTypes.MTA_BUS_VEHICLE_SIRI] = 'MTA Bus Vehicle SIRI Metadata' ;

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


