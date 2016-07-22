'use strict';


var request = require('request');

var mtaSubwayStopIDs = require('../stopIDs/mtaSubwayStopIDs')



function getRandomStopMonitoringURL () {
    return 'http://mars.availabs.org:16180/api/siri/stop-monitoring.json?' + 
           'MonitoringRef=MTA_' + mtaSubwayStopIDs[Math.floor(mtaSubwayStopIDs.length * Math.random())] +
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

