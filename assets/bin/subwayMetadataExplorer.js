#!/usr/bin/env node

'use strict';


var newMetaDataMaintainer = require('../utils/metadataUtils').newMetaDataMaintainer,
    jsonfile              = require('jsonfile');


var metaDataMaintainer = newMetaDataMaintainer(__dirname + '/../metadata/nyct-subway-metadata.js'),
    msg                = jsonfile.readFileSync(__dirname + '/../sample_messages/nyct-subway-message.js');


metaDataMaintainer.update(msg);
