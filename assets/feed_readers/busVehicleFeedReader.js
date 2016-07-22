'use strict';


var request = require('request');

var key = require('../keys/BUS-API-KEY')

var feedUrl = 
      'https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=' + key + '&VehicleMonitoringDetailLevel=calls'


function readFeed (callback) {
    
    var requestSettings = {
            method : 'GET',
            url      : (Math.random() > 0.5) ? feedUrl : feedUrl.replace(/\&.*/, ''),
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

