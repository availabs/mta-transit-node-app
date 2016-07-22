'use strict';

var request = require('request');

var feedUrl = 'http://mars.availabs.org:16180/api/siri/vehicle-monitoring.json?VehicleMonitoringDetailLevel=calls'


function readFeed (callback) {
    
    var requestSettings = {
            method   : 'GET',
            url      : (Math.random() > 0.5) ? feedUrl : feedUrl.replace(/\?.*/, ''),
        };

    request(requestSettings, function (err, response, body) {
        if (err) {
            return callback(err); 
        }

        if (response.statusCode === 200) {
          try {
              var data = JSON.parse(body);
              callback(null, data)
          } catch (e) {
              callback(e)
          }
        } else {
          callback(new Error(response.statusMessage))
        }
    });
}


module.exports = {
  readFeed,
}

