'use strict';

var jsonfile = require('jsonfile'),
    _        = require('lodash');

var busStopMetadataFilePath           = __dirname + '/../../assets/metadata/mta-bus-stop-metadata.json',
    busVehicleMetadataFilePath        = __dirname + '/../../assets/metadata/mta-bus-vehicle-metadata.json',
    subwayGTFSrtMetadataFilePath      = __dirname + '/../../assets/metadata/mta-subway-gtfsrt-metadata.json',
    subwaySiriStopMetadataFilePath    = __dirname + '/../../assets/metadata/mta-subway-siri-stop-metadata.json',
    subwaySiriVehicleMetadataFilePath = __dirname + '/../../assets/metadata/mta-subway-siri-vehicle-metadata.json';


module.exports = {

    'busStop': function (req, res) {
        res.json(jsonfile.readFileSync(busStopMetadataFilePath));
    },

    'busVehicle': function (req, res) {
        res.json(jsonfile.readFileSync(busVehicleMetadataFilePath));
    },

    'subwayGTFSrt': function (req, res) {
        res.json(jsonfile.readFileSync(subwayGTFSrtMetadataFilePath));
    },

    'subwaySiriStop': function (req, res) {
        res.json(jsonfile.readFileSync(subwaySiriStopMetadataFilePath));
    },

    'subwaySiriVehicle': function (req, res) {
        res.json(jsonfile.readFileSync(subwaySiriVehicleMetadataFilePath));
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

    'updateSubwayGTFSrt': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(subwayGTFSrtMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(subwayGTFSrtMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },

    'updateSubwaySiriStop': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(subwaySiriStopMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(subwaySiriStopMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },

    'updateSubwaySiriVehicle': function (req, res) {
        var persistedMetadata = jsonfile.readFileSync(subwaySiriVehicleMetadataFilePath);
        
        _.assign(persistedMetadata, req.body);

        jsonfile.writeFile(subwaySiriVehicleMetadataFilePath, 
                           persistedMetadata, 
                           {spaces: 4}, 
                           function(err) { if (err) { res.status(500).send(err); } });
    },


};
