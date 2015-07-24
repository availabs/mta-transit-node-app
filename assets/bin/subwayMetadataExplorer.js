#!/usr/bin/env node

'use strict';


var metadataUtils      = require('../utils/metadataUtils'),
    metadataMaintainer = metadataUtils.newMetadataMaintainer(__dirname + '/../metadata/nyct-subway-metadata.json');

//// Use cached sample message 
//var jsonfile = require('jsonfile'),
    //msg      = jsonfile.readFileSync(__dirname + '/../sample_messages/nyct-subway-message.json');
    //metadataMaintainer.update(msg);


var feedReader = require('../feed_readers/subway-feed-reader');

feedReader.readFeed(metadataMaintainer.update);


