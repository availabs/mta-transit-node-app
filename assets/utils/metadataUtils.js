'use strict';

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 *   This is early code. It should be safely tested to ensure it
 *   doesn't clobber metadata created via the web app.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


var path     = require('path'),
    jsonfile = require('jsonfile'),
    mkdirp   = require('mkdirp'),
    _        = require('lodash');



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


function metadataKeyExtractor (jsValue) {
    return _.uniq(recursiveExaminer(jsValue));
}


function newMetadataMaintainer (metadataFilePath) {
    var maintainer = {},
        metadata;
    
    mkdirp.sync(path.dirname(metadataFilePath))

    try {
        metadata = jsonfile.readFileSync(metadataFilePath);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        } else {
            metadata = {};
        }
    }

    maintainer.metadata = metadata; 

    // Takes the newly scraped data.
    // Extracts unseen fields. Adds these to metadata file.
    maintainer.update = function (newMetadata) {
        var newKeys = updateMetadata(newMetadata, metadata);

        if (newKeys.length) {

            console.log('==> Newly recorded object properties:');
            console.log(newKeys);
            console.log();

            jsonfile.writeFile(metadataFilePath, metadata, {spaces: 4}, function(err) {
                if (err) {
                    console.error(err);
                }
            });
        }

        return newKeys;
    };

    return maintainer;
}


var updateMetadata = function (newMetadata, oldMetadata) {
    var newMetaKeys,
        newMetadata;

    newMetaKeys = _.difference(metadataKeyExtractor(newMetadata), _.keys(oldMetadata));

    newMetadata = newMetaKeys.reduce(function(pre, cur) { 
                                        pre[cur] = null;
                                        return pre; 
                                     }, {});

    _.defaults(oldMetadata, newMetadata);

    return newMetaKeys;
};


module.exports = {
    metadataBuilder       : metadataKeyExtractor,
    updateMetadata        : updateMetadata,
    newMetadataMaintainer : newMetadataMaintainer,
};
