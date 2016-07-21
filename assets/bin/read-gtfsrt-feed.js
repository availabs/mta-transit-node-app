#!/usr/bin/env node

'use strict';

// jshint unused: false

// Heavily Based on http://stackoverflow.com/a/25733922 

var Protobufjs = require('protobufjs'),
    request    = require('request'),
    http       = require("http"),
    key        = require('../keys/SUBWAY-API-KEY');


//var protofilePath = __dirname + '/../proto_files/gtfs-realtime.proto';
var protofilePath = __dirname + '/../proto_files/nyct-subway.proto';

//var feedUrl = "http://datamine.mta.info/mta_esi.php?&key=" + key;    
//var feedUrl = "http://datamine.mta.info/mta_esi.php?feed_id=2&key=" + key;    
//var feedUrl = "http://datamine.mta.info/mta_esi.php?feed_id=11&key=" + key;    
var feedUrl = "http://mnorth.prod.acquia-sites.com/wse/LIRR/gtfsrt/realtime/" + key + "/proto";
//var feedUrl = "http://mnorth.prod.acquia-sites.com/wse/gtfsrtwebapi/v1/gtfsrt/" + key + "/getfeed";



function useProtobufjs () {
    
    var requestSettings = {
            method   : 'GET',
            url      : feedUrl,
            encoding : null,

            har : {
                method   : 'GET',
                url      : feedUrl,
                headers  : [ { name  : 'accept', value : 'application/x-protobuf' } ],
            }
        };

    request(requestSettings, function (err, response, body) {
        if (err) {
            console.log(err);
            return; 
        }

        try {
            // create a protobuf decoder
            var transit       = Protobufjs.protoFromFile(protofilePath).build('transit_realtime'),
                gtfsrtMessage = transit.FeedMessage.decode(body);

            console.log(JSON.stringify(gtfsrtMessage, null, 4));
        } catch (e) {
            console.log(e.stack);
        }
    });
}

function useNodeProtobuf () {

    // From the docs: https://github.com/fuwaneko/node-protobuf#usage
    
    var fs           = require("fs"),
        request      = require('request'),
        NodeProtobuf = require("node-protobuf"); // note there is no .Protobuf part anymore
    
    // WARNING: next call will throw if desc file is invalid
    var schema       = __dirname + '/../proto_files/nyct-subway.proto.desc',  
        nodeProtobuf = new NodeProtobuf(fs.readFileSync(schema)),
       

        requestSettings = {
            method   : 'GET',
            url      : feedUrl,
            encoding : null,

            har : {
                method   : 'GET',
                url      : feedUrl,
                headers  : [ { name  : 'accept', value : 'application/x-protobuf' } ],
            }
        };

    console.log(nodeProtobuf.info());

    request(requestSettings, function (err, response, body) {
        if (err) {
            console.log(err);
            return; 
        }

        try {
            var gtfsrtMessage = nodeProtobuf.parse(body, "transit_realtime.FeedMessage"); 
            console.log(gtfsrtMessage);
            
            //console.log(body);

        } catch (e) {
            console.log(e.stack);
        }
    });
}

useProtobufjs();
//useNodeProtobuf();
