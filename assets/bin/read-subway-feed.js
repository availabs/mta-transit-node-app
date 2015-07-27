#!/usr/bin/env node

'use strict';

var feedReader = require('../feed_readers/subway-feed-reader'),

    callback   = function (msg) { console.log(JSON.stringify(msg, null, 4)); };

feedReader(callback);
