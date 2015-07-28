'use strict';

var jsonfile = require('jsonfile'),
    filePath = __dirname + '/../Subway_GTFS_Data/GTFS_Data.json';

module.exports = jsonfile.readFileSync(filePath);
