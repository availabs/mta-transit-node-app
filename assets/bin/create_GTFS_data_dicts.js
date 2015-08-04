#!/usr/bin/env node


'use strict';

//TODO: Need to extract only the relevant data from the GTFS data.
//      Otherwise, JSON object is about 185M.

var fs           = require('fs'),
    Converter    = require("csvtojson").Converter,
    _            = require('lodash'),


    gtfsDataDir = __dirname + '/../Subway_GTFS_Data/',

    dataDict    = {},

    tablePKs = {
        agency   : 'agency_id'  ,
        calendar : 'service_id' ,
        routes   : 'route_id'   ,
        stops    : 'stop_id'    ,
        trips    : 'trip_id'    ,
    },

    tables = Object.keys(tablePKs);


(function iterateAndParse (i) {
    var tableName = tables[i],
        filePath  = gtfsDataDir + tableName + '.txt',
        converter,
        fileStream;

    if (i === tables.length) {
        fs.writeFile(gtfsDataDir + 'GTFS_Data.json', JSON.stringify(dataDict, null, 4));
        return;
    }

    converter  = new Converter({constructResult:true});
    fileStream = fs.createReadStream(filePath);

    converter.on("end_parsed", function (parsedTable) {
        dataDict[tableName] = _.indexBy(parsedTable, function (rowObj) {
            var keyName = tablePKs[tableName],
                key;

            if (tableName === 'trips') {
                key = rowObj[keyName];
                return key.substring(9, key.lastIndexOf('.') + 2);
            }

            return rowObj[keyName];
        });
        iterateAndParse(++i); 
    });

    fileStream.pipe(converter);
}(0));
