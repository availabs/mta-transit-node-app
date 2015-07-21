'use strict';

// Heavily Based on http://stackoverflow.com/a/25733922 

var ProtoBuf = require('protobufjs'),
    http     = require("http"),
    key      = require('../keys/SUBWAY-API-KEY'),
    _        = require('lodash');

var nyctSubwayProtoFile = __dirname + '/../proto_files/nyct-subway.proto';

// create a protobuf decoder
var transit = ProtoBuf.protoFromFile(nyctSubwayProtoFile).build('transit_realtime');

var feedUrl = "http://datamine.mta.info/mta_esi.php?key=" + key;    

function readFeed() {
    http.get(feedUrl, parse);
}

// process the feed
function parse(res) {
    // gather the data chunks into a list
    var data = [];
    res.on("data", function(chunk) {
        data.push(chunk);
    });
    res.on("end", function() {
        // merge the data to one buffer, since it's in a list
        data = Buffer.concat(data);
        
        // create a FeedMessage object by decooding the data with the protobuf object
        var msg = transit.FeedMessage.decode(data);

        // do whatever with the object
        console.log(JSON.stringify(msg, null, 4));
    }); 
};

module.exports = readFeed;
