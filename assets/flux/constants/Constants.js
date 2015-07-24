"use strict";


var keyMirror = require('keymirror');


module.exports = {

    ActionTypes : keyMirror({
        SELECT_MESSAGE_TYPE              : null,

        MOUSEOVER_NODE                   : null,
        MOUSEOUT_NODE                    : null,

        SELECT_NODE                      : null,
        DESELECT_NODE                    : null,

        CHANGE_MESSAGE_METADATA          : null,
        ADD_NEW_DEFAULTS_TO_ALL_METADATA : null,
        COMMIT_METADATA_CHANGES          : null,

        HANDLE_SERVER_RESPONSE           : null,
    }),

    EventTypes : keyMirror({
        STATE_CHANGED : null,
    }),

    MTA_MessageTypes : keyMirror({
        NYCT_SUBWAY_GTFSR    : null,
        MTA_BUS_STOP_SIRI    : null,
        MTA_BUS_VEHICLE_SIRI : null,
    }),
};
