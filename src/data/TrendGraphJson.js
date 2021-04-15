const trendJson = require('./trend_graph.json');

const fetchTrendGraph = (tag) => {
  return trendJson[tag];
}

export default fetchTrendGraph;