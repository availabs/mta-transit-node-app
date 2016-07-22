#!/usr/bin/env node
// jshint unused: false

'use strict';

var path = require('path');

var feedReader = require('../../feed_readers/subwaySiriVehicleFeedReader');

var metadataFilePath = path.join(__dirname, '../../metadata/mta-subway-siri-vehicle-metadata.json');

var newMetatdataMaintainer = require('../../utils/metadataUtils').newMetadataMaintainer,
    metadataMaintainer = newMetatdataMaintainer(metadataFilePath);


function scrape () {
  feedReader.readFeed(function (err, msg) {
    if (err) {
      return console.error(err)
    }

    metadataMaintainer.update(msg);
  })
}

scrape()
setInterval(scrape, 30000)

