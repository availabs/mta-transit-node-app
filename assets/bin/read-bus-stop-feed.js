#!/usr/bin/env node

'use strict';

var feedReader = require('../feed_readers/bus-feed-reader'),

    params     = {  OperatorRef   : 'MTA',
                    MonitoringRef : 308209,
                    LineRef       : 'MTA NYCT_B63', },

    callback   = function (msg) { console.log(JSON.stringify(msg, null, 4)); };


feedReader('stop', params, callback);
