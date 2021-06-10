import * as d3 from 'd3';

const relation = require('./relation.json');
const nodesFile = require('./nodes.json');
const linksFile = require('./links_strict.json');
const relation_new = require('./relation_8_new.json');
const louvain = require('louvain');

const colors = d3.schemeCategory10;

const sort_by_count = (a, b) => b.count - a.count;

export const newNodeLinks = (center) => {
  const nodesData = nodesFile[center];
  const linksData = linksFile[center];
  let nodes = [];
  const links = [];
  const nodeCounts = {};

  nodesData.forEach((data) => {
    const [node, count] = data;
    nodeCounts[node] = count;
    nodes.push(node);
  });

  // nodes = Array.from(new Set(nodes));

  linksData.forEach((data) => {
    const [rule, , oeRatio] = data;
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
  
  var oe_scale = d3.scaleLinear()
    .domain([0, d3.max(links, d => Math.sqrt(d.weight))])
    .range([0.05, 0.6]);

  const oeToOpacity = (oe) => {
    console.log(oe);
    if (oe > 3) {
      return oe_scale(Math.sqrt(oe));
    } else {
      return 0.05;
    }
  }

  links.forEach((n, i) => {
    const sourceIndex = nodes.findIndex(d => d === n.source);
    n.source = sourceIndex;
    n.target = nodes.findIndex(d => d === n.target);
    n.stroke = colors[result[nodes[sourceIndex]]];
    n.opacity = oeToOpacity(n.weight);
  });

  nodes = nodes.map(node => {
    return {
      id: node,
      name: node,
      group: result[node],
      color: colors[result[node]],
      size: Math.sqrt(count_scale(nodeCounts[node]))
    }
  });

  return {"nodes": nodes, "links": links};
}


export const newFormatTest = (center) => {
  const {rules} = relation_new[center];
  let nodes = [center];
  const nodeCounts = {};
  const links = [];
  const init_groups = {};
  rules.sort(sort_by_count);

  let fi = 0
  while (fi < 8 && rules.length > fi) {
    const {target, count} = rules[fi++];
    nodes.push(target);
    init_groups[target] = fi;
    nodeCounts[target] = count;
  }

  nodes.forEach((name, g) => {
    if (name !== center && !!relation_new[name]) {
      let {rules: subRules} = relation_new[name];
      console.log(Object.entries(subRules[0]));
      subRules.sort(sort_by_count);

      let i = 0;
      while (i < 4 && subRules.length > i) {
        const {target, count} = subRules[i++];

        if (target === center) continue;

        nodes.push(target);

        if (!(target in nodeCounts)) {
          nodeCounts[target] = count;
          init_groups[target] = g;
        }

        links.push({
          "source": name, 
          "target": target, 
          "weight": count
        });
      }
    }
  });

  nodes = Array.from(new Set(nodes));
  var community = louvain.jLouvain()
    .nodes(nodes).edges(links)
    .partition_init(init_groups);
  var result  = community();
  nodes = nodes.filter(node => node !== center);

  var count_scale = d3.scaleLinear()
    .domain([0, d3.max(Object.values(nodeCounts))])
    .range([16, 100]);

  links.forEach((n, i) => {
    const sourceIndex = nodes.findIndex(d => d === n.source);
    n.source = sourceIndex;
    n.target = nodes.findIndex(d => d === n.target);
    // n.stroke = colors[result[nodes[sourceIndex]]];
  });

  nodes = nodes.map(node => {
    return {
      id: node,
      name: node,
      group: result[node],
      color: colors[result[node]],
      size: Math.sqrt(count_scale(nodeCounts[node]))
    }
  });

  return {"nodes": nodes, "links": links};
}

// export const multipleCenterRelation = (centers) => {
//   const {count: centerCount, rules} = relation_new[center];

// }

// TODO: seperate into one center and multiple centers
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