const relation = require('./relation_0.0007_0.15.json');

// const colors = [
//   '#ACDDDE',
//   '#CAF1DE',
//   '#E1F8DC',
//   '#FEF8DD',
//   '#FFE7C7',
//   '#F7D8BA',
//   '#86C5D8'
// ]

const fetchRelation = (center) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  const secondLayerLines = [];

  // add all directed related nodes
  firstLayerRelations.forEach(element => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
  });

  // link nodes if related to each other
  nodes.forEach(node => {
    if (node !== center && !!relation[node]) {
      const secondLayerRelations = relation[node];
      // let checker = (arr, target) => target.every(v => arr.includes(v));
      
      secondLayerRelations.forEach((element, i) => {
        const relationArray = element[0].flat();
        // const color = colors[i%colors.length];

        if (!relationArray.includes(center)) {
          nodes.push.apply(nodes, relationArray);
          secondLayerLines.push({
            "source": relationArray[0], 
            "target": relationArray[1], 
            "stroke": 'lightblue',
          });
        }
      });
    }
  });

  nodes = Array.from(new Set(nodes));

  nodes = nodes.filter(node => node !== center);

  const node_elements = nodes.map(node => {
    return {
      "id": node,
      "name": node,
    }
  });

  return {"nodes": node_elements, "links": [...secondLayerLines]};
}

export default fetchRelation;