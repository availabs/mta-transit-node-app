#!/usr/bin/env node
// jshint unused: false

'use strict';

var path = require('path')

var feedReader = require('../../feed_readers/busStopFeedReader');

var metadataFilePath = path.join(__dirname, '../../metadata/mta-bus-stop-metadata.json')

var metadataUtils      = require('../../utils/metadataUtils'),
    metadataMaintainer = metadataUtils.newMetadataMaintainer(metadataFilePath);


function scrape () {
  feedReader.readFeed(function (err, msg) {
    if (err) {
      return console.error(err)
    }

    metadataMaintainer.update(msg);
  })
}

scrape()
setInterval(scrape, 5000)

