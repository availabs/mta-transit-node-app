'use strict';


var jsonfile       = require('jsonfile'),
    apiUtils       = require('./apiUtils'),
    _              = require('lodash');



function recursiveExaminer (value, name, path, acc) {

    var newPath = path || '',
        keys,
        i;

    acc = acc || [];

    if (name) {
        newPath += (newPath ? ',' : '') + name;
        acc.push(newPath);
    }

    if (Object.prototype.toString.call(value) === '[object Object]') {
        keys = Object.keys(value);
        for (i=0; i<keys.length; ++i) {
            recursiveExaminer(value[keys[i]], keys[i], newPath, acc);
        }
    }

    if (Object.prototype.toString.call(value) === '[object Array]') {
        for (i=0; i<value.length; ++i) {
            recursiveExaminer(value[i], null, newPath, acc);
        } 
    }

    return acc;
}


function metaDataKeyExtractor (jsValue) {
    return _.uniq(recursiveExaminer(jsValue));
}


var updateMetaData = function (newData, metadataObject) {
    var newMetaKeys,
        newMetaData;

    newMetaKeys = _.difference(metaDataKeyExtractor(newData), _.keys(metadataObject));
    
    newMetaData = newMetaKeys.reduce(function(pre, cur) { 
                                        pre[cur] = apiUtils.newMetadataObject(); 
                                        return pre; 
                                     }, {});

    _.defaults(metadataObject, newMetaData);

    return newMetaKeys;
}


function newMetaDataMaintainer (metaDataFilePath) {
    var maintainer = {},
        metaData;
    
    try {
        metaData = jsonfile.readFileSync(metaDataFilePath);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        } else {
            metaData = {};
        }
    }

    jsonfile.readFile(metaDataFilePath, function(err, obj) {
        metaData = obj || {};
    });

    maintainer.metaData = metaData; 

    maintainer.update = function (newData) {
        var newKeys = updateMetaData(newData, metaData);

        if (newKeys.length) {

            console.log('==> Newly recorded object properties:');
            console.log(newKeys);
            console.log();

            jsonfile.writeFile(metaDataFilePath, metaData, {spaces: 4}, function(err) {
                if (err) {
                    console.error(err)
                }
            });
        }

        return newKeys;
    }

    return maintainer;
}

module.exports = {
    metaDataBuilder       : metaDataKeyExtractor,
    updateMetaData        : updateMetaData,
    newMetaDataMaintainer : newMetaDataMaintainer,
};
