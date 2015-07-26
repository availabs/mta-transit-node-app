'use strict';


var d3             = require('d3'),
    _              = require('lodash'),
    ActionsCreator = require('../flux/actions/ActionsCreator');


/************************
 * props:   dataRoute
 *          width
 *          height
 ************************/

function renderTree (props) {

    var width  = props.width,
        height = props.height;

    var tree = d3.layout.tree()
        .size([height, width - 400]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
                .attr("width", width)
                .attr("height", height);


    var theG = svg.append("g")
                .attr("transform", "translate(200,0)");

    var nodes = tree.nodes(props.data),
        links = tree.links(nodes);

    var mouseActions = { "mouseenter" : ActionsCreator.mouseenterNode ,
                         "mouseout"   : ActionsCreator.mouseoutNode   , };


    function getColor (d) {
        var isSelected = (d === props.selectedNode),
            isDirty    = _.includes(props.dirtyNodes, d);

        if (isDirty && isSelected) {
            return '#E8C558';
        } else if (isSelected) {
            return '#50BB75';
        } else if (isDirty) {
            return '#E45C37';
        } else if (_.values(_.omit(d.metadata, 'path')).filter(function(v) { return !!v; }).length) {
            return '#B9B9BE'; // Metadata has been added.
        }
        
        return 'white'; // No metadata edits yet.
    }

    theG.selectAll("path.link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = theG.selectAll("g.node")
                   .data(nodes)
                   .enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    //TODO: Add pulse on selected node.
    node.append("circle")
        .attr("r", 7.5)
        .style('fill', getColor)
        .on(mouseActions);

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .style('font-size', '12px')
        .attr("class", "label")
        .text(function(d) { return d.name; })
        .on(mouseActions);

    return svg;
}


module.exports = {
    renderTree  : renderTree,
};

