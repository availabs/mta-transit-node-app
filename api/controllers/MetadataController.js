'use strict';

var jsonfile = require('jsonfile');

var subwayMetadataFilePath     = __dirname + '/../../assets/metadata/nyct-subway-metadata.js',
    busStopMetadataFilePath    = __dirname + '/../../assets/metadata/mta-bus-stop-metadata.js',
    busVehicleMetadataFilePath = __dirname + '/../../assets/metadata/mta-bus-vehicle-metadata.js';

module.exports = {

    'subway': function (req, res) {
        res.json(jsonfile.readFileSync(subwayMetadataFilePath));
    },

    'busStop': function (req, res) {
        res.json(jsonfile.readFileSync(busStopMetadataFilePath));
    },

    'busVehicle': function (req, res) {
        res.json(jsonfile.readFileSync(busVehicleMetadataFilePath));
    },

};
