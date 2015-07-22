'use strict';


var d3 = require('d3');


/************************
 * props:   dataRoute
 *          width
 *          height
 ************************/

function renderTree (props) {

    var width  = props.width  || 1100,
        height = props.height || 2000;

    var tree = d3.layout.tree()
        .size([height, width - 300]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(150,0)");

    var nodes = tree.nodes(props.data),
        links = tree.links(nodes);

    svg.selectAll("path.link")
       .data(links)
       .enter().append("path")
       .attr("class", "link")
       .attr("d", diagonal);

    var node = svg.selectAll("g.node")
                  .data(nodes)
                  .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    node.append("circle")
        .attr("r", 4.5);

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .style('font-size', '12px')
        .attr("class", "label")
        .text(function(d) { return d.name; });

    return svg;
}

module.exports = {
    renderTree : renderTree,
};

