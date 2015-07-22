'use strict';

var d3 = require('d3');

function getData (route, callback) {
    d3.json(route, function(error, json) {
        if (error) { throw error; }

        callback(json);
    });
}

function newMetadataObject () {
    return {
        description : '',
        mapping     : '',
        notes       : '',
    };
}

function prepDataForViz(data) {
    var flare   = newFlareNode('NYCT_Subway_GTFS-R'),
        isoTree = { '': flare },
        keys    = Object.keys(data).map(function (k) { return k.split(','); }),
        i;

    keys = keys.sort(function(a,b) {
        var i, comp;

        if (a.length === b.length) {
            for (i=0; i < a.length; ++i) {
                if((comp = a[i].localeCompare(b[i]))) {
                    return comp;
                }
            }
        } else {
            return a.length - b.length;
        }
    });

    for (i=0; i<keys.length; ++i) {
        var thisName   = keys[i].join(','),
            thisNode   = newFlareNode(keys[i][keys[i].length - 1], data[thisName]),
            parentName = keys[i].slice(0, -1).join(','),
            parentNode = isoTree[parentName];

        isoTree[thisName] = thisNode;

        parentNode.children = parentNode.children || [];
        parentNode.children.push(thisNode);
    }


    function newFlareNode (name, metadata) {
        return {
            name     : name,
            metadata : metadata ? metadata : newMetadataObject(),
        };
    }

    return flare;
}


module.exports = {
    newMetadataObject : newMetadataObject,
    getData           : getData,
    prepDataForViz    : prepDataForViz,
}


