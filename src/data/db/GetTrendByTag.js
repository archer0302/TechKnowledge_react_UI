import { client, q } from '../../config/db';

const getTagTrend = async (tag) => {
  console.log('getTagTrend');
  const result = await client.query(
    q.Get(
      q.Match(q.Index('trend_get_by_tag'), tag)
    )
  );
  return result['data'];
}

export default getTagTrend;