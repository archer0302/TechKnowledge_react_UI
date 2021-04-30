import React, { useEffect, useRef } from 'react';
import fetchRelation from '../data/RelationJson';
import * as d3 from 'd3';

const data = fetchRelation('python');
const nodesData = data.nodes;
const linkData = data.links;

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


/* Component */
export default function NetWork(props) {

  const d3Container = useRef(null);

  useEffect(() => {
    console.log(nodesData);
    if (nodesData && d3Container.current) {
      var width=1600;
      var height=600;

      const svg = d3.select(d3Container.current)
          .html("")
          .attr("viewBox", [0, 0, width, height]);
      
      const simulation = d3.forceSimulation(nodesData)
          .force("link", d3.forceLink(linkData).id(d => d.id))
          .force("charge", d3.forceManyBody().strength(-10))
          .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(linkData)
          .join("line")
          .attr("stroke-width", d => Math.sqrt(d.value));
       
      const node = svg.append("g")
          .selectAll("circle")
          .data(nodesData)
          .join("circle")
          .attr("r", 5)
          .attr("fill", 'blue')
          .call(drag(simulation));

      node.append("title")
          .text(d => d.name);

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
      });

    }
  }, [d3Container.current]);


  return (
    <svg
      className="d3-component"
      ref={d3Container}
    />
  );
}