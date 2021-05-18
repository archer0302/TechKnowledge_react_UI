import { client, q } from '../../config/db';

const getTagRelation = async (tag) => {
  const result = await client.query(
    q.Get(
      q.Match(q.Index('relation_get_by_tag'), tag)
    )
  );
  return result['data'];
}

export default getTagRelation;