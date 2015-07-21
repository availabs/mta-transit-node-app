#!/usr/bin/env node

'use strict';


var newMetaDataMaintainer = require('../utils/metadataUtils').newMetaDataMaintainer,
    jsonfile              = require('jsonfile');


var metaDataMaintainer = newMetaDataMaintainer(__dirname + '/../metadata/mta-bus-stop-metadata.js'),
    msg                = jsonfile.readFileSync(__dirname + '/../sample_messages/mta-bus-stop-monitoring-message.js');


metaDataMaintainer.update(msg);
