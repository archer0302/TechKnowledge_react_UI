import { client, q } from '../../config/db';

const getNodes = async (tag) => {
  const result = await client.query(
    q.Get(
      q.Match(q.Index('get_nodes_by_center'), tag)
    )
  );
  return result['data'];
}

export default getNodes;