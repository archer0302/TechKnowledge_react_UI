import * as d3 from 'd3';

const relation = require('./relation.json');
const louvain = require('louvain');

const colors = d3.schemeCategory10;

export const processToNetworkGraph = (center, nodesData, linksData) => {
  let nodes = [];
  const links = [];
  const nodeCounts = {};

  nodesData.forEach((data) => {
    let [node, count] = data;

    // Avoid keywords
    if (node === 'constructor') {
      node = 'constructer';
    }

    nodeCounts[node] = count;
    nodes.push(node);
  });

  linksData.forEach((data) => {
    let [rule, , oeRatio] = data;

    // Avoid keywords
    if (rule[0] === 'constructor') {
      rule[0] = 'constructer';
    } else if (rule[1] === 'constructor') {
      rule[1] = 'constructer';
    } 

    links.push({
      "source": rule[0], 
      "target": rule[1], 
      "weight": oeRatio
    });
  });

  var community = louvain.jLouvain()
    .nodes(nodes).edges(links);
  var result  = community();
  nodes = nodes.filter(node => node !== center);

  var count_scale = d3.scaleLinear()
    .domain([0, d3.max(Object.values(nodeCounts))])
    .range([16, 100]);
 
  const oeToOpacity = (oe) => {
    return Math.min( (oe - 1)/8 , 1);
  }

  links.forEach((n, i) => {
    const sourceIndex = nodes.findIndex(d => d === n.source);
    n.source = sourceIndex;
    n.target = nodes.findIndex(d => d === n.target);
    n.stroke = colors[result[nodes[sourceIndex]]];
    n.opacity = oeToOpacity(n.weight);
  });

  nodes = nodes.map(node => {
    const group = result[node];
    const color = colors[result[node]];
    const size = Math.sqrt(count_scale(nodeCounts[node]));

    // Avoid keywords
    if (node === 'constructer') {
      node = 'constructor';
    }

    return {
      id: node,
      name: node,
      group: group,
      color: color,
      size: size
    }
  });

  return {"nodes": nodes, "links": links};
}


export const fetchRelation = (center, includeCenter, i) => {
  includeCenter = includeCenter ? includeCenter : false;
  const firstLayerRelations = relation[center];
  let nodes = [];
  const lines = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);
  const color = colors[i%colors.length];

  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);

    if (includeCenter) {
      lines.push({
        "source": relationArray[0], 
        "target": relationArray[1], 
        "stroke": color,
      });
    }
  });

  if (!includeCenter) {
    nodes = nodes.filter(node => node !== center);
  }

  // link nodes if related to each other
  if (!includeCenter) {
    nodes.forEach(node => {
      if (node !== center && !!relation[node]) {
        const secondLayerRelations = relation[node];
        // let checker = (arr, target) => target.every(v => arr.includes(v));
        
        secondLayerRelations.forEach((element, i) => {
          const relationArray = element[0].flat();
          const color = colors[i%colors.length];
  
          if (includeCenter || !relationArray.includes(center)) {
            // let support = element[1][0]
            nodes.push.apply(nodes, relationArray);
            lines.push({
              "source": relationArray[0], 
              "target": relationArray[1], 
              "stroke": color,
            });
          }
        });
      }
    });
  }

  nodes = Array.from(new Set(nodes));

  const node_elements = nodes.map(node => {
    return {
      "id": node,
      "name": node,
    }
  });

  return {"nodes": node_elements, "links": [...lines]};
}