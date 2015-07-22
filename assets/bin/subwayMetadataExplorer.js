#!/usr/bin/env node

'use strict';


var newMetaDataMaintainer = require('../utils/metadataUtils').newMetaDataMaintainer,
    jsonfile              = require('jsonfile');


var metaDataMaintainer = newMetaDataMaintainer(__dirname + '/../metadata/nyct-subway-metadata.json'),
    msg                = jsonfile.readFileSync(__dirname + '/../sample_messages/nyct-subway-message.json');


metaDataMaintainer.update(msg);
