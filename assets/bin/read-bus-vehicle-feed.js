#!/usr/bin/env node

'use strict';

var feedReader = require('../feed_readers/bus-feed-reader'),

    //params     = { LineRef: 'MTA NYCT_B1' },
    //params     = { VehicleRef: 'MTA NYCT_5103' },
    //params     = { VehicleRef: 'MTA NYCT_9409', VehicleMonitoringDetailLevel: 'calls', },
    params     = {},
                  
    callback   = function (msg) { console.log(JSON.stringify(msg, null, 4)); };


feedReader('vehicle', params, callback);
