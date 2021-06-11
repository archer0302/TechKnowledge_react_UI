import { client, q } from '../../config/db';

const getLinks = async (tag) => {
  const result = await client.query(
    q.Get(
      q.Match(q.Index('get_links_by_center'), tag)
    )
  );
  return result['data'];
}

export default getLinks;