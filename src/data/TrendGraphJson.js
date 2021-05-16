// import faunadb, { query as q } from "faunadb";
// var serverClient = new faunadb.Client({ secret: 'fnAEJE0jifACCDBqxs7jFi7KX_5o5l8zPIrcyn1H' });

// const fetchTrendGraph = (tags) => {
//   let trends = [];

//   tags.forEach(tag => {

//     serverClient.query(
//       q.Get(
//         q.Match(q.Index('trend_get_by_tag'), tag)
//       )
//     )
//     .then((ret) => {
//       ret['data']['trend'].forEach((count, index) => 
//         trends[index] = {
//             ...trends[index],
//             [tag]: count
//           }
//         );

//       const monthNames = ["January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"];
    
//       trends = trends.map((t, index) => {
//         return {
//           ...t,
//           'ym': monthNames[(index + 6)%12] + ' ' + (2008 + parseInt(index/12))
//         }
//       });
//     })
//     .catch((err) => console.error('Error: %s', err));

//   });

  
  
//   return trends;
// }

// export default fetchTrendGraph;