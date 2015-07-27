#!/usr/bin/env node

'use strict';

var jsonfile  = require('jsonfile'),
    converter = require('./GTFS-R_to_SIRI_Converter');

//var gtfsr_msg = jsonfile.readFileSync(__dirname + '/../sample_messages/nyct-subway-message.json');
var gtfsr_msg = jsonfile.readFileSync(__dirname + '/swf.out.1.json');

converter.convertToStopMonitoringMessage(gtfsr_msg);


