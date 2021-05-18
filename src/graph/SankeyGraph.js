import { ResponsiveSankey } from '@nivo/sankey'
import { fetchSingleRelation } from '../data/RelationJson';

export default function SankeyGraph({ tag }) {
  let relation = fetchSingleRelation(tag);
  relation['links'] = relation['links'].map(element => {
    return {
      ...element,
      value: Math.floor(Math.random() * 1000)
    }
  });
  // relation['nodes'].push({
  //   "id": 'test-alone',
  //   "name": 'test-alone',
  // });
  console.log('test sankey, ' + tag);
  console.log(relation);
  return (
    <div style={{height: 400}}>
      <ResponsiveSankey
          data={relation}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="justify"
          colors={{ scheme: 'category10' }}
          nodeOpacity={1}
          nodeThickness={10}
          nodeInnerPadding={1}
          nodeSpacing={5}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelPadding={16}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
          // legends={[
          //     {
          //         anchor: 'bottom-right',
          //         direction: 'column',
          //         translateX: 130,
          //         itemWidth: 100,
          //         itemHeight: 14,
          //         itemDirection: 'right-to-left',
          //         itemsSpacing: 2,
          //         itemTextColor: '#999',
          //         symbolSize: 14,
          //         effects: [
          //             {
          //                 on: 'hover',
          //                 style: {
          //                     itemTextColor: '#000'
          //                 }
          //             }
          //         ]
          //     }
          // ]}
      />
    </div>
  )
}
