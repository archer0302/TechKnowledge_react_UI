import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as forceInABox from 'force-in-a-box';

const drag = simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

function collideForce(d) {
  return d.size + d.center ? 50 : 20;
}


/* Component */
export default function NetWork({ tag, nodesData, linkData, width, height, forceXY, nodeStrength, iter, centerForce, fontSize }) {

  const d3Container = useRef(null);

  useEffect(() => {
    if (nodesData && d3Container.current) {

      const svg = d3.select(d3Container.current)
          .html("")
          .attr("viewBox", [0, 0, width, height]);

      const simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX(width/2).strength(0.05))
        .force("y", d3.forceY(height/2).strength(0.05));

      const groupingForce = forceInABox()
        .strength(0.06) // Strength to foci
        .template("treemap") // Either treemap or force
        .groupBy("group") // Node attribute to group
        .links(linkData) // The graph links. Must be called after setting the grouping attribute
        .enableGrouping(true)
			  .nodeSize(4)
        .linkStrengthIntraCluster(0.01)
        .size([width, height]) // Size of the chart

      simulation
        .nodes(nodesData)
        .force("group", groupingForce)
        .force("charge", d3.forceManyBody().strength(nodeStrength ? nodeStrength : -18))
        .force("link", d3.forceLink(linkData)
          .strength(groupingForce.getLinkStrength)
        )
        .force("collide", d3.forceCollide().radius(collideForce));

      var link = svg.selectAll(".link")
        .data(linkData)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke-width", 1)
        .attr("stroke", d => d.stroke ? d.stroke : 'grey')
        .attr("stroke-opacity", d => d.opacity ? d.opacity : 0.35);

      var node = svg.selectAll("g.node")
        .data(nodesData, function (d) {return d.id})
        .enter()
        .append("g")
        .attr("class", "node")
        .call(drag(simulation))
        .on("mouseover", function(event, d) { mouseover_node(event, d); })
        .on("mouseout", function(event, d) { mouseout_node(event, d); });

      var circle = node.append("circle")
        .attr("r", d => d.size ? d.size : 8)
        .attr("fill", d => d.color)
        .attr("opacity", 0.9)
        .attr('stroke', 'white')
        .attr("stroke-width", 1);

      var text = node.append("text")
        .style("text-anchor", "middle")
        .attr("fill","black")
        .attr("y", d => -d.size - 2)
        .attr("stroke","white")
        .attr("stroke-width","0.1px")
        .attr("font-family","sans-serif")
        .attr("font-size", fontSize ? fontSize : 10)
        .attr("font-weight", "bold")
        .text(function (d) {return d.name});
      
      var mouseover_node = function(event, d){ 
        var neighbors = {};
        neighbors[d.index] = true;
      
        link.filter(function(l){
            if (l.source.id === d.id) {
              neighbors[l.target.index] = true;
              return true;
            } else if (l.target.id === d.id) {
              neighbors[l.source.index] = true;
              return true;
            } else {
              return false;
            }
          })
            .style("stroke-opacity", 0.75)
            .style("stroke-width", 1.5);
      
        // circle.filter(function(n){ return neighbors[n.index] })
        //     .style("stroke-width", 2);
        text.filter(function(n){ return neighbors[n.index] })
            .style("font-size", fontSize ? fontSize * 1.5 : 13)
            .style("stroke-width", 0.23);
      };


      var mouseout_node = function(event, d) { 
        link
          .style("stroke-opacity", d => d.opacity ? d.opacity : 0.35);

        circle
          .style("stroke-width", 1);

        text
          .style("font-size", fontSize ? fontSize : 10)
          .style("stroke-width", 0.1);;

      };

      simulation.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        
        // texts.attr("cx", function(d) { return d.x; })
        //      .attr("cy", function(d) { return d.y; });
      });
    }
  }, [d3Container, nodesData, linkData, width, height, forceXY, nodeStrength, iter, centerForce, fontSize, tag]);

  return (
    <svg
      className="d3-component"
      ref={d3Container}
    />
  );
}