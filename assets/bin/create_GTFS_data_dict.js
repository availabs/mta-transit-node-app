#!/usr/bin/env node


'use strict';

//TODO: Need to extract only the relevant data from the GTFS data.
//      Otherwise, JSON object is about 185M.

var fs           = require('fs'),
    path         = require('path'),
    Converter    = require("csvtojson").Converter,


    gtfsDataDir  = __dirname + '/../Subway_GTFS_Data/',
    gtfsDataDict = {};



fs.readdir(gtfsDataDir, function (err, filenameList) {
    
    var i;

    if (err) {
        console.log(err);
        return;
    }
    
    i = 0;
    (function iterateAndParse () {
        var converter,
            filename,
            filenameBase,
            fileStream;

        if (i === filenameList.length) {
            fs.writeFile(gtfsDataDir + 'GTFS.json', JSON.stringify(gtfsDataDict, null, 4));
            return;
        }

        converter    = new Converter({constructResult:true});
        filename     = filenameList[i];
        filenameBase = path.basename(filename, '.txt');
        fileStream   = fs.createReadStream(gtfsDataDir + filename);

        converter.on("end_parsed", function (parsedTable) {
            gtfsDataDict[filenameBase] = parsedTable;
            iterateAndParse(++i); 
        });

        fileStream.pipe(converter);
    }());


});

