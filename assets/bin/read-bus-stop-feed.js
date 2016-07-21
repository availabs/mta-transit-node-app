#!/usr/bin/env node

'use strict';

var feedReader = require('../feed_readers/bus-feed-reader'),

    //params     = {  OperatorRef   : 'MTA',
                    //MonitoringRef : 308209,
                    //LineRef       : 'MTA NYCT_B63', },

    params     = {  OperatorRef               : 'MTA',
                    MonitoringRef             : '308209',
                    LineRef                   : 'MTA NYCT_B60',
                    StopMonitoringDetailLevel : 'calls', },

    //format = 'xml';
    format = 'json';

feedReader('stop', format, params, console.log);
