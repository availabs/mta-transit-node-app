'use strict';

var jsonfile = require('jsonfile'),
    _        = require('lodash');

var subwayMetadataFilePath     = __dirname + '/../../assets/metadata/nyct-subway-metadata.json',
    busStopMetadataFilePath    = __dirname + '/../../assets/metadata/mta-bus-stop-metadata.json',
    busVehicleMetadataFilePath = __dirname + '/../../assets/metadata/mta-bus-vehicle-metadata.json';


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

    'updateSubway': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(subwayMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(subwayMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },

    'updateBusStop': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(busStopMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(busStopMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },

    'updateBusVehicle': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(busVehicleMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(busVehicleMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },

};
