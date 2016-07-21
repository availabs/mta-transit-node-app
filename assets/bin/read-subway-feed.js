#!/usr/bin/env node

'use strict';

// Heavily Based on http://stackoverflow.com/a/25733922 

var ProtoBuf = require('protobufjs'),
    http     = require("http"),
    key      = require('../keys/SUBWAY-API-KEY');

var nyctSubwayProtoFile = __dirname + '/../proto_files/nyct-subway.proto';

// create a protobuf decoder
var transit = ProtoBuf.protoFromFile(nyctSubwayProtoFile).build('transit_realtime');

var feedUrl = "http://datamine.mta.info/mta_esi.php?feed_id=11&key=" + key;    
//var feedUrl = "http://mnorth.prod.acquia-sites.com/wse/LIRR/gtfsrt/realtime/" + key + "/proto";


function parse (callback) {
    return function (res) {
        var data = [];
        res.on("data", function(chunk) {
            data.push(chunk);
        });
        res.on("end", function() {
            data = Buffer.concat(data);
            
            var msg = transit.FeedMessage.decode(data);

            callback(msg);
        }); 
    };
}

function outputToConsole (msg) { console.log(JSON.stringify(msg, null, 4)); }


http.get(feedUrl, parse(outputToConsole));

