#!/usr/bin/env node

'use strict';


var newMetaDataMaintainer = require('../utils/metadataUtils').newMetaDataMaintainer,
    jsonfile              = require('jsonfile');


var metaDataMaintainer = newMetaDataMaintainer(__dirname + '/../metadata/mta-bus-vehicle-metadata.js'),
    msg                = jsonfile.readFileSync(__dirname + '/../sample_messages/mta-bus-vehicle-monitoring-message.js');


metaDataMaintainer.update(msg);
