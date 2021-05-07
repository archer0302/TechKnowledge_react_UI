const trendJson = require('./trend.json');

const fetchTrendGraph = (tags) => {
  let trends = [];

  tags.forEach(tag => {
    const trend = trendJson[tag];

    trend.forEach((count, index) => 
      trends[index] = {
        ...trends[index],
        [tag]: count
      }
    );
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  trends = trends.map((t, index) => {
    return {
      ...t,
      'ym': monthNames[(index + 6)%12] + ' ' + (2008 + parseInt(index/12))
    }
  });

  console.log(trends);
  return trends;
}

export default fetchTrendGraph;