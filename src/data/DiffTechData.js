const final = require('./final.json');
const opinion = require('./opinion.json');

function fetchDiffData(tags) {
  const diffData = final[tags.join(' ')] ? 
    final[tags.join(' ')] : final[tags[1] + ' ' + tags[0]] ?
      final[tags[1] + ' ' + tags[0]] : null;

  let opinions;

  if (opinion[tags.join('_')]) {
    opinions = opinion[tags.join('_')];
  } else if (opinion[tags[1] + '_' + tags[0]]) {
    opinions = opinion[tags[1] + '_' + tags[0]];

    for (let [k, v] of Object.entries(opinions)) {
      opinions[k] = {
        0: v[1] ? v[1] : 0,
        1: v[0] ? v[0] : 0,
        2: v[2] ? v[2] : 0,
        ids: v['ids']
      }
    }
  }
  
  const posts = {};

  if (diffData && opinions) {
    diffData.forEach(data => {
      posts[data[4]] = {
        content: data[5],
        highlight: data[1]
      }
    }); 
  }

  return { opinions, posts };
}

// console.log(fetchDiffData(['udp', 'tcp'])['opinions']);

export default fetchDiffData;