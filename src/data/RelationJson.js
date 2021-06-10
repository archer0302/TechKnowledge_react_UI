import * as d3 from 'd3';

const relation_5 = require('./relation_least_8.json');
const relation = require('./relation.json');
const relation_new = require('./relation_8_new.json');
const louvain = require('louvain');

const colors = d3.schemeCategory10;

const sort_by_count = (a, b) => b.count - a.count;

export const newFormatTest = (center) => {
  const {count: centerCount, rules} = relation_new[center];
  let nodes = [center];
  const nodeCounts = {};
  const links = [];
  rules.sort(sort_by_count);

  let fi = 0
  while (fi < 8 && rules.length > fi) {
    const {target, count} = rules[fi++];
    nodes.push(target);
    nodeCounts[target] = count;
  }

  nodes.forEach((name) => {
    if (name !== center && !!relation_new[name]) {
      let {count: c, rules: subRules} = relation_new[name];
      console.log(Object.entries(subRules[0]));
      subRules.sort(sort_by_count);

      let i = 0;
      while (i < 4 && subRules.length > i) {
        const {target, count} = subRules[i++];

        if (target == center) continue;

        nodes.push(target);

        if (!(target in nodeCounts)) {
          nodeCounts[target] = count;
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
  var community = louvain.jLouvain().nodes(nodes).edges(links);
  var result  = community();
  nodes = nodes.filter(node => node !== center);

  var count_scale = d3.scaleLinear()
    .domain([0, d3.max(Object.values(nodeCounts))])
    .range([9, 100]);

  links.forEach((n, i) => {
    const sourceIndex = nodes.findIndex(d => d == n.source);
    n.source = sourceIndex;
    n.target = nodes.findIndex(d => d == n.target);
    n.stroke = colors[result[nodes[sourceIndex]]];
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


export const louTest = (center) => {
  // const firstLayerRelations = relation[center].length >= 5 ? relation[center] : relation_5[center];
  const firstLayerRelations = relation_5[center];
  let nodes = [center];
  const nodeSize = {};
  const links = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);

  let max = 0;
  let min = 1;

  let fi = 0
  while (fi < 8 && firstLayerRelations.length > fi) {
    const element = firstLayerRelations[fi++];
    const relationArray = element[0].flat();
    const node = relationArray[0] === center ? relationArray[1] : relationArray[0];
    const value = relationArray[0] === center ? element[1][1] : element[1][2];

    nodes.push(node);
    nodeSize[node] = value;

    max = value > max ? value : max;
    min = value < min ? value : min;
  }

  nodes.forEach((name, g) => {
    nodeSize[name] = Math.max(Math.sqrt(nodeSize[name]) * 10, 8);
    // nodeSize[name] = 10 - (2 * (max - nodeSize[name])) / (max - min);

    if (!!relation_5[name]) {
      let secondLayerRelation = relation_5[name];
      secondLayerRelation = secondLayerRelation.filter(r => r[0].every(n => n !== center));
      secondLayerRelation.sort((a, b) => b[1][0] - a[1][0]);

      let i = 0;
      while (i < 4 && secondLayerRelation.length > i) {
        const element = secondLayerRelation[i++];
        const relationArray = element[0].flat();
        const source = relationArray[0] === name ? relationArray[0] : relationArray[1];
        const target = relationArray[0] === name ? relationArray[1] : relationArray[0];
        const conf = relationArray[0] === name ? element[1][1] : element[1][2];
        const size = Math.max(Math.sqrt(conf) * 8, 4);

        nodes.push(target);
        if (!(target in nodeSize)) {
          nodeSize[target] = size;
        }

        links.push({
          "source": source, 
          "target": target, 
          "weight": conf
        });
      }
    }
  });

  nodes = Array.from(new Set(nodes));
  console.log(nodes, links);
  var community = louvain.jLouvain().nodes(nodes).edges(links);
  var result  = community();
  nodes = nodes.filter(node => node !== center);
  console.log(result);

  nodes = nodes.map(node => {
    console.log(nodeSize[node]);
    return {
      id: node,
      name: node,
      group: result[node],
      color: colors[result[node]],
      size: nodeSize[node]
    }
  });


  links.forEach((n, i) => {
    const sourceIndex = nodes.findIndex(d => d.name == n.source);
    n.source = sourceIndex;
    n.target = nodes.findIndex(d => d.name == n.target);
    n.stroke = colors[result[nodes[sourceIndex].name]];
  });

  console.log(links);

  return {"nodes": nodes, "links": links};
}

export const fetchChordRelation = (center) => {
  const includeAllChecker = (arr, target) => target.every(v => arr.includes(v));
  
  const firstLayerRelations = relation[center].length >= 5 ? relation[center] : relation_5[center];
  const keys = [];
  const keyIndex = {};

  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    const relationArray = element[0].flat();
    // get secondary tag
    const key = relationArray[0] === center ? relationArray[1] : relationArray[0];
    // confidence of primary tag (diagonal value)
    const linkValue = relationArray[0] === center ? element[1][1] : element[1][2];
    keys.push(key);
    // save index and value for building matrix
    keyIndex[key] = {
      index: [i, i],
      value: linkValue
    };
  });
  
  const relations = [];

  keys.forEach((key, i) => {
    if (key !== center && !!relation[key]) {
      const secondLayerRelations = relation[key];
      secondLayerRelations.forEach(element => {
        const relationArray = element[0].flat();
        // Check if all nodes are secondary tag of center and excluding relations with center
        if (includeAllChecker(keys, relationArray) && !relationArray.some(r => r === center)) {
          const secondaryKey = relationArray[0] === key ? relationArray[1] : relationArray[0];
          // confidence of primary tag (diagonal value)
          const linkValue = relationArray[0] === key ? element[1][1] : element[1][2];
          const p_index = keyIndex[key].index[0];
          const s_index = keyIndex[secondaryKey].index[0];
          relations.push({
            index: [p_index, s_index],
            value: linkValue * keyIndex[key].value
          });
        }
      });
    }
  });

  // init matrix with keys size and fill with 0
  const matrix = new Array(keys.length).fill(0);

  console.log(relations.length);

  let index = 0
  for (const key in keyIndex) {
    matrix[index] = new Array(keys.length).fill(0);
    const element = keyIndex[key];
    matrix[element.index[0]][element.index[1]] = element.value * 100;
    index ++;
  }

  relations.forEach((relation, i) => {
    matrix[relation.index[0]][relation.index[1]] = relation.value * 100;
  });

  console.log(matrix);
  return [keys, matrix];
}

export const fetchSankeyRelation = (center) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  let links = [];

  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);

  const confidenceDictionary = {};
  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
    const target = relationArray[0] === center ? relationArray[1] : relationArray[0];
    const confidence = relationArray[0] === center ? element[1][1] : element[1][2];
    links.push({
      "source": center, 
      "target": target, 
      "value": Math.sqrt(confidence * 100),
    });
    confidenceDictionary[target] = confidence;
  });

  // nodes = nodes.filter(node => node !== center);
  nodes = Array.from(new Set(nodes));

  nodes.forEach((node, i) => {
    if (node !== center && !!relation[node]) {
      const secondLayerRelations = relation[node];
      
      secondLayerRelations.forEach(element => {
        const relationArray = element[0].flat();

        // let checker = (arr, target) => target.every(v => arr.includes(v));
        // if (checker(nodes, relationArray) && !relationArray.some(r => r === center)) {
        //   const linkValue = relationArray[0] === node ? element[1][1] : element[1][2];
        //   const target = relationArray[0] === node ? relationArray[1] : relationArray[0];
        //   links.push({
        //     "source": node, 
        //     "target": target, 
        //     "value": linkValue,
        //   });
        // }
        
        let newNode = false;
        if (!relationArray.some(r => r === center)) {
          relationArray.forEach(e => {
            if (!nodes.some(n => n === e) && e !== center) {
              nodes.push(e);
              newNode = true;
            }
          });
        }
        if (newNode) {
          links.push({
            "source": node, 
            "target": relationArray[0] === node ? relationArray[1] : relationArray[0], 
            "value": relationArray[0] === node ? element[1][1] : element[1][2],
          });
        }
      });
    }
  });

  nodes = nodes.map(node => {
    return {
      "id": node,
      "name": node,
    }
  });

  return {"nodes": nodes, "links": links};
}

export const fetchSingleRelation = (center) => {
  // const firstLayerRelations = relation[center].length >= 5 ? relation[center] : relation_5[center];
  const firstLayerRelations = relation_5[center];
  let nodes = [];
  const links = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);

  let max = 0;
  let min = 1;

  let fi = 0
  while (fi < 8 && firstLayerRelations.length > fi) {
    const element = firstLayerRelations[fi++];
    const relationArray = element[0].flat();
    const node = relationArray[0] === center ? relationArray[1] : relationArray[0];
    const value = relationArray[0] === center ? element[1][1] : element[1][2];

    nodes.push({
      name: node,
      value: value
    });

    max = value > max ? value : max;
    min = value < min ? value : min;
  }

  // // add all directed related nodes
  // firstLayerRelations.forEach((element, i) => {
  //   const relationArray = element[0].flat();
  //   const node = relationArray[0] === center ? relationArray[1] : relationArray[0];
  //   const value = relationArray[0] === center ? element[1][1] : element[1][2];

  //   nodes.push({
  //     name: node,
  //     value: value
  //   });

  //   max = value > max ? value : max;
  //   min = value < min ? value : min;
  // });
  console.log(min, max)
  const node_elements = [];

  nodes.forEach((firstNode, i) => {
    const {name, value} = firstNode;
    const color = colors[i%colors.length];

    node_elements.push({
      "id": name,
      "name": name,
      "color": color,
      "group": i,
      "size": 10 - (2 * (max - value)) / (max - min)
    });

    // still have missing links
    // if (name !== center && !!relation[name]) {
    //   const secondLayerRelations = relation[name];

    //   secondLayerRelations.forEach(element => {
    //     const relationArray = element[0].flat();
        
    //     let newNode = false;
    //     if (!relationArray.some(r => r === center)) {
    //       relationArray.forEach(e => {
    //         if (!node_elements.some(n => n.name === e) && e !== center) {
    //           node_elements.push({
    //             "id": e,
    //             "name": e,
    //             "color": color,
    //             "size": e === name ? 10 - (2 * (max - value)) / (max - min) : 6
    //           });
    //           newNode = true;
    //         }
    //       });
    //     }

    //     if (newNode) {
    //       links.push({
    //         "source": relationArray[0], 
    //         "target": relationArray[1], 
    //         "stroke": color,
    //       });
    //     }

    //   });
    // }
  });

  nodes.forEach((firstNode, g) => {
    const {name, value} = firstNode;
    const color = colors[g%colors.length];

    if (!!relation_5[name]) {
      let secondLayerRelation = relation_5[name];
      secondLayerRelation = secondLayerRelation.filter(r => r[0].every(n => n !== center));
      secondLayerRelation.sort((a, b) => b[1][0] - a[1][0]);

      let i = 0;
      while (i < 4 && secondLayerRelation.length > i) {
        const element = secondLayerRelation[i++];
        const relationArray = element[0].flat();
        const source = relationArray[0] === name ? relationArray[0] : relationArray[1];
        const target = relationArray[0] === name ? relationArray[1] : relationArray[0];
        const conf = relationArray[0] === name ? element[1][0] : element[1][1];
        // const size = 8 - (2 * (max - conf)) / (max - min);
        const size = Math.max(Math.sqrt(conf) * 8, 4);

        if (!node_elements.some(n => n.name === target)) {
          node_elements.push({
            "id": target,
            "name": target,
            "color": color,
            "group": g,
            "size": size
          });
        }

        links.push({
          "source": source, 
          "target": target, 
          "stroke": color,
          "distance": 100,
          "weight": conf
        });
      }
    }


  });

  // let remainingNodes = nodes.map(e => e.name);
  // let nodeList = nodes.map(e => e.name);

  // const groups = [];
  // nodes.forEach((e, i) => {
  //   const {name, value} = e;
  //   if (!!relation[name] && remainingNodes.includes(name)) {
  //     const secondLayerRelations = relation[name];
  //     const color = colors[i%colors.length];
  //     const secondaryChildArray = [];

  //     secondLayerRelations.forEach(element => {
  //       const relationArray = element[0].flat();
  //       const secondaryChild = relationArray[0] === name ? relationArray[1] : relationArray[0];
  //       if (nodeList.includes(secondaryChild) && 
  //           remainingNodes.includes(secondaryChild) &&
  //           secondaryChild !== center) {
  //         secondaryChildArray.push(secondaryChild);
  //       }
  //     });

  //     remainingNodes = remainingNodes.filter(n => !secondaryChildArray.includes(n));
  //     groups.push({
  //       secondaryCenter: name,
  //       secondaryChilds: secondaryChildArray,
  //       color: color,
  //       value: value
  //     });
  //   }
  // });


  // groups.forEach((group) => {
  //   const {secondaryCenter, color, secondaryChilds, value} = group;
  //   node_elements.push({
  //     "id": secondaryCenter,
  //     "name": secondaryCenter,
  //     "color": color,
  //     "size": 8 - (2 * (max - value)) / (max - min)
  //   });

  //   secondaryChilds.forEach((child) => {
  //     links.push({
  //       "source": secondaryCenter, 
  //       "target": child, 
  //       "stroke": color,
  //     });
  //     node_elements.push({
  //       "id": child,
  //       "name": child,
  //       "color": color,
  //       "size": 8 - (2 * (max - value)) / (max - min)
  //     });
  //   });
  // });

  links.forEach((n, i) => {
    n.source = node_elements.findIndex(d => d.name == n.source);
    n.target = node_elements.findIndex(d => d.name == n.target);
  });


  return {"nodes": node_elements, "links": links};
}

export const mainPage = (center, i) => {
  const firstLayerRelations = relation[center];
  let nodes = [];
  const lines = [];
  firstLayerRelations.sort((a, b) => b[1][0] - a[1][0]);
  const color = colors[i%colors.length];

  // add all directed related nodes
  firstLayerRelations.forEach((element, i) => {
    const relationArray = element[0].flat();
    nodes.push.apply(nodes, relationArray);
    const node = relationArray[0] === center ? relationArray[1] : relationArray[0];

    lines.push({
      "source": relationArray[0], 
      "target": relationArray[1], 
      "stroke": color,
    });
  });

  nodes = Array.from(new Set(nodes));

  const node_elements = nodes.map(node => {
    return {
      "id": node,
      "name": node,
    }
  });

  return {"nodes": node_elements, "links": [...lines]};

}

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
            let support = element[1][0]
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