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

    function onClick (d) {
        if (d !== props.selectedNode) {
           ActionsCreator.selectNode(d);
        } else {
           ActionsCreator.deselectNode();
        }
    }

    function getColor (d) {
        var isDirty    = _.includes(props.dirtyNodes, d),
            isSelected = (d === props.selectedNode);

        if (isDirty && isSelected) {
            return '#E8C558';
        } else if (isSelected) {
            return '#50BB75';
        } else if (isDirty) {
            return '#E45C37';
        }
        
        return 'white';
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
        .on({ "click"      : onClick,
              "mouseenter" : ActionsCreator.mouseoverNode,
              "mouseout"   : ActionsCreator.mouseoutNode, });

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .style('font-size', '12px')
        .attr("class", "label")
        .on( "click", onClick )
        .text(function(d) { return d.name; });

    return svg;
}


module.exports = {
    renderTree  : renderTree,
};

