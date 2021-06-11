// import faunadb, { query as q } from "faunadb";

var faunadb = require('faunadb'),

q = faunadb.query;
var serverClient = new faunadb.Client({ secret: 'fnAEJE0jifACCDBqxs7jFi7KX_5o5l8zPIrcyn1H' });

// serverClient.query(
//   q.Get(q.Ref(q.Collection('trend'), '298446390620586509'))
// )
// .then((ret) => console.log(ret))

serverClient.query(
  q.Get(
    q.Match(q.Index('get_links_by_center'), 'tostring')
  )
)
.then((ret) => console.log(ret.data.links))
.catch((err) => console.error('Error: %s', err))

serverClient.query(
  q.Get(
    q.Match(q.Index('get_nodes_by_center'), 'tostring')
  )
)
.then((ret) => console.log(ret.data))
.catch((err) => console.error('Error: %s', err))

// serverClient.query(
//   q.Get(
//     q.Match(q.Index('node_get_by_center'), 'html')
//   )
// )
// .then((ret) => console.log(ret))
// .catch((err) => console.error('Error: %s', err))

// Search by index
// serverClient.query(
//   q.Get(
//     q.Match(q.Index('posts_by_title'), 'My cat and other marvels')
//   )
// )
// .then((ret) => console.log(ret))