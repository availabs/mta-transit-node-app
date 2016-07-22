'use strict';


var request = require('request');

var key = require('../keys/BUS-API-KEY')

var mtaBusStopIDs = require('../stopIDs/mtaBusStopIDs')


function getRandomStopMonitoringURL () {
    return 'https://bustime.mta.info/api/siri/stop-monitoring.json?key=' + key + 
           '&MonitoringRef=' + mtaBusStopIDs[Math.floor(mtaBusStopIDs.length * Math.random())] +
            ((Math.random() > 0.5) ?  '&StopMonitoringDetailLevel=calls' : '');
}


function readFeed (callback) {
    
    var requestSettings = {
            method : 'GET',
            url    : getRandomStopMonitoringURL(),
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

