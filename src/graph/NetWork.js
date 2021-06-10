import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const drag = simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alpha(0.1).restart();
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
  return d.size + d.center ? 50 : 8;
}


/* Component */
export default function NetWork({ nodesData, linkData, width, height, forceXY, nodeStrength, iter, centerForce, fontSize }) {

  const d3Container = useRef(null);

  useEffect(() => {
    if (nodesData && d3Container.current) {

      const svg = d3.select(d3Container.current)
          .html("")
          .attr("viewBox", [0, 0, width, height]);

      const simulation = d3.forceSimulation(nodesData)
        .force("link", d3.forceLink(linkData).id(d => d.id)
                                             .distance(link => link.distance ? link.distance : 50)
                                             .iterations(4)
                                             .strength(0.7))
        .force("charge", d3.forceManyBody().strength(nodeStrength ? nodeStrength : -18))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(centerForce ? centerForce : 0.05))
        .force('x', d3.forceX(height/2)
                      .strength(forceXY ? forceXY[0] : 0.001))
        .force('y', d3.forceY(height/2)
                      .strength(forceXY ? forceXY[1] : 0.001))
        .force("collide", d3.forceCollide().radius(collideForce).iterations(iter ? iter : 5))
        
        // .force('cluster', cluster().strength(0.2));

      const link = svg.append("g")
        .attr("stroke-opacity", 0.35)
        .selectAll("line")
        .data(linkData)
        .join("line")
        .attr("stroke-width", 2.5)
        .attr("stroke", d => d.stroke ? d.stroke : 'black');
    
      const node = svg.append("g")
        .selectAll("circle")
        .data(nodesData)
        .join("circle")
        .attr("r", d => d.size ? d.size : 8)
        .attr("fill", d => d.color)
        .attr("opacity", 0.9)
        .attr('stroke', 'grey')
        .attr("stroke-width", 2)
        .call(drag(simulation));

      node.append("title")
        .text(d => d.name);

      var texts = svg.append("g")
        .selectAll(".text")
        .data(nodesData)
        .enter()
        .append("text")
        .attr("fill","black")
        .attr("stroke","white")
        .attr("stroke-width","0.2px")
        .attr("font-family","sans-serif")
        .attr("font-size", fontSize ? fontSize : 15)
        .attr("font-weight", "bold")
        .text(d => d.name);

      simulation.on("tick", () => {
        node.attr("transform", d => { 
          return "translate(" + Math.max(7, Math.min(width - 7, d.x)) + "," + Math.max(7, Math.min(height - 7, d.y)) + ")"; 
        });

	      texts.attr("transform", d => { 
          return "translate(" + Math.max(7, Math.min(width - 7, d.x)) + "," + Math.max(7, Math.min(height - 7, d.y)) + ")"; 
        });

        link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      });

    }
  }, [d3Container, nodesData, linkData, width, height, forceXY, nodeStrength, iter, centerForce, fontSize]);


  return (
    <svg
      // style={{border:'1px solid grey'}}
      className="d3-component"
      ref={d3Container}
    />
  );
}