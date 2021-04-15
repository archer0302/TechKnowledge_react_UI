const relation = require('./relation.json');

const fetchRelation = (center) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  let firstLayerLines = [];
  const secondLayerLines = [];

  firstLayerRelations.forEach(element => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
    firstLayerLines.push({
      "source": relationArray[0], 
      "target": relationArray[1]
    });
  });

  nodes.forEach(node => {
    if (node !== center && !!relation[node]) {
      const secondLayerRelations = relation[node];
      
      secondLayerRelations.forEach(element => {
        const relationArray = element[0].flat();
        nodes.push.apply(nodes, relationArray);
        if (firstLayerLines.filter(e => e.source === relationArray[0] && e.target === relationArray[1]).length == 0) {
          secondLayerLines.push({
            "source": relationArray[0], 
            "target": relationArray[1], 
            "stroke": "blue"
          });
        }
      });
    
    }
  });

  firstLayerLines = firstLayerLines.map(line => {
    return {
      ...line,
      stroke: "red"
    }
  });

  nodes = Array.from(new Set(nodes));

  const node_elements = nodes.map(node => {
    return {
      "id": node,
      "name": node,
      "center": node === center,
    }
  });

  return {"nodes": node_elements, "links": [...firstLayerLines, ...secondLayerLines]};
}

export default fetchRelation;