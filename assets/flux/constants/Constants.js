"use strict";


var keyMirror = require('keymirror');


module.exports = {

    ActionTypes : keyMirror({
        SELECT_MESSAGE_TYPE              : null,

        MOUSE_CLICK                      : null,

        MOUSEENTER_EDITOR                : null,
        MOUSELEAVE_EDITOR                : null,

        MOUSEENTER_NODE                  : null,
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
        MTA_BUS_STOP    : null,
        MTA_BUS_VEHICLE : null,

        MTA_SUBWAY_GTFSRT       : null,
        MTA_SUBWAY_SIRI_VEHICLE : null,
        MTA_SUBWAY_SIRI_STOP    : null,
    }),
};
