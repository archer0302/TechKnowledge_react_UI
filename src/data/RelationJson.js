import * as d3 from 'd3';

const relation = require('./relation.json');

const colors = d3.schemeCategory10;

export const fetchSingleRelation = (center) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  const lines = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);

  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    nodes.push.apply(nodes, element[0].flat());
  });

  nodes = nodes.filter(node => node !== center);
  const node_elements = [];

  nodes.forEach((node, i) => {
    if (node !== center && !!relation[node]) {
      const secondLayerRelations = relation[node];
      const color = colors[i%colors.length];
      
      secondLayerRelations.forEach(element => {
        const relationArray = element[0].flat();
        
        let newNode = false;
        if (!relationArray.some(r => r === center)) {
          relationArray.forEach(e => {
            if (!node_elements.some(n => n.name === e) && e !== center) {
              node_elements.push({
                "id": e,
                "name": e,
                "color": color
              });
              newNode = true;
            }
          });
        }

        if (newNode) {
          lines.push({
            "source": relationArray[0], 
            "target": relationArray[1], 
            "stroke": color,
          });
        }

      });
    }
  });


  return {"nodes": node_elements, "links": lines};
}

// TODO: seperate into one center and multiple centers
export const fetchRelation = (center, includeCenter) => {
  includeCenter = includeCenter ? includeCenter : false;
  const firstLayerRelations = relation[center];
  let nodes = [];
  const lines = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);

  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
    const color = colors[i%colors.length];

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