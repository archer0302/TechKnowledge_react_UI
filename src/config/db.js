import faunadb from 'faunadb';
const client = new faunadb.Client({
  secret: 'fnAEJE0jifACCDBqxs7jFi7KX_5o5l8zPIrcyn1H'
});
const q = faunadb.query;
export { client, q };