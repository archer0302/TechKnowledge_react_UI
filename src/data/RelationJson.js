const relation = require('./relation_new.json');

const fetchRelation = (center) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  const secondLayerLines = [];

  firstLayerRelations.forEach(element => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
  });

  nodes.forEach(node => {
    if (node !== center && !!relation[node]) {
      const secondLayerRelations = relation[node];
      let checker = (arr, target) => target.every(v => arr.includes(v));
      
      secondLayerRelations.forEach(element => {
        const relationArray = element[0].flat();

        if (!relationArray.includes(center) && checker(nodes, relationArray)) {
          nodes.push.apply(nodes, relationArray);
          secondLayerLines.push({
            "source": relationArray[0], 
            "target": relationArray[1], 
            "stroke": "blue",
          });
        }
      });
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

  return {"nodes": node_elements, "links": [...secondLayerLines]};
}

export default fetchRelation;