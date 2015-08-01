'use strict';


var https  = require("https"),
    _      = require('lodash'),

    apiKey = require('../keys/BUS-API-KEY');



/************************************************************
  
   params:
            entityToMonitor -- 'bus' or 'vehicle'
            getParams -- Objext
                
                For SIRI StopMonitoring Requests (https://bustime.mta.info/wiki/Developers/SIRIStopMonitoring)
  
                    |------------------------------+----------------------------------------------------------------------------------------------
                    | key                          |     Your MTA Bus Time developer API key.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | OperatorRef                  |     The GTFS agency ID to be monitored (optional).  
                    |                              |     Currently, all stops have operator/agency ID of MTA. 
                    |                              |     If left out, the system will make a best guess. 
                    |                              |     Usage of the OperatorRef is suggested, as calls will return faster when populated.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MonitoringRef                |     The GTFS stop ID of the stop to be monitored (REQUIRED).  
                    |                              |     For example, 308214 for the stop at 5th Avenue and Union St towards Bay Ridge.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | LineRef                      |     A filter by 'fully qualified' route name, GTFS agency ID + route ID (e.g. MTA NYCT_B63).
                    |                              
                    | DirectionRef                 |     A filter by GTFS direction ID (optional).  Either 0 or 1. 
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | StopMonitoringDetailLevel    |     Determines whether or not the response will include the stops ("calls" in SIRI-speak) 
                    |                              |     each vehicle is going to make after it serves the selected stop (optional).  
                    |                              |     To get calls data, use value calls, otherwise use value normal (default is normal).
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MaximumNumberOfCallsOnwards  |     Limits the number of OnwardCall elements returned in the query.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MaximumStopVisits            |     An upper bound on the number of buses to return in the results.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MinimumStopVisitsPerLine     +     A lower bound on the number of buses to return in the results 
                    |                              |     per line/route (assuming that many are available)
                    |------------------------------+---------------------------------------------------------------------------------------------


                For SIRI VehicleMonitoring Requests

                    |------------------------------+---------------------------------------------------------------------------------------------
                    | key                          |     Your MTA Bus Time developer API key.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | OperatorRef                  |     The GTFS agency ID to be monitored (optional).  
                    |                              |     Currently, all stops have operator/agency ID of MTA. 
                    |                              |     If left out, the system will make a best guess. 
                    |                              |     Usage of the OperatorRef is suggested, as calls will return faster when populated.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | VehicleRef                   |     The ID of the vehicle to be monitored (optional).  
                    |                              |     This is the 4-digit number painted on the side of the bus, for example 7560. 
                    |                              |     Response will include all buses if not included.      
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | LineRef                      |     A filter by 'fully qualified' route name, GTFS agency ID + route ID (e.g. MTA NYCT_B63).
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | DirectionRef                 |     A filter by GTFS direction ID (optional).  Either 0 or 1. 
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | VehicleMonitoringDetailLevel |     Determines whether or not the response will include the stops 
                    |                              |     ("calls" in SIRI-speak) each vehicle is going to make (optional).
                    |                              |     To get calls data, use value calls, otherwise use value normal (default is normal).    
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MaximumNumberOfCallsOnwards  |     Limit on the number of OnwardCall elements for each vehicle 
                    |                              |     when VehicleMonitoringDetailLevel=calls
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MaximumStopVisits            |     An upper bound on the number of buses to return in the results.
                    |------------------------------+---------------------------------------------------------------------------------------------
                    | MinimumStopVisitsPerLine     +     A lower bound on the number of buses to return in the results 
                    |                              |     per line/route (assuming that many are available)
                    |-----------------------------+---------------------------------------------------------------------------------------------


************************************************************************************************************************************************/




function readFeed (entityToMonitor, getParams, callback) {

    var feedUrl = 'https://bustime.mta.info/api/siri/' + entityToMonitor + '-monitoring.json?',
        params  = _.assign({ key: apiKey }, getParams);

    feedUrl += _.pairs(params).map(function (kvPair) { return kvPair.join('='); }).join('&');

    feedUrl = feedUrl.replace(' ', '%20');

    console.log('// ' + feedUrl);


    function parse(res) {
        var data = [];

        res.on("error", function(error) {
            console.log(error);
        });

        res.on("data", function(chunk) {
            data.push(chunk);
        });

        res.on("end", function() {
            var msg = JSON.parse(data.join(''));

            callback(msg);
        }); 
    }

    https.get(feedUrl, parse);
}


module.exports = readFeed;

