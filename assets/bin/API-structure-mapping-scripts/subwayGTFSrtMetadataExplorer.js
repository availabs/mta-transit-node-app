#!/usr/bin/env node

'use strict';

var path = require('path')

var feedReader = require('../../feed_readers/subwayGTFSrtFeedReader');

var metadataFilePath = path.join(__dirname, '../../metadata/mta-subway-gtfsrt-metadata.json')

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
setInterval(scrape, 30000)

