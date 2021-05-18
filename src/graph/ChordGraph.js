import { ResponsiveChord } from '@nivo/chord'
import { fetchChordRelation } from '../data/RelationJson';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function ChordGraph({ tag }) {
  const [keys, matrix] = fetchChordRelation(tag);
  return (
    <div style={{height: 550}}>
      <ResponsiveChord
        matrix={matrix}
        keys={keys}
        margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.02}
        arcOpacity={1}
        arcBorderWidth={1}
        arcBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        ribbonOpacity={0.5}
        ribbonBorderWidth={1}
        ribbonBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        enableLabel={true}
        label="id"
        labelOffset={5}
        labelRotation={-90}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        colors={{ scheme: 'nivo' }}
        isInteractive={true}
        arcHoverOpacity={1}
        arcHoverOthersOpacity={0.25}
        ribbonHoverOpacity={0.75}
        ribbonHoverOthersOpacity={0.25}
        animate={true}
        motionStiffness={90}
        motionDamping={7}
        // legends={[
        //     {
        //         anchor: 'top-left',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 70,
        //         itemWidth: 80,
        //         itemHeight: 14,
        //         itemsSpacing: 0,
        //         itemTextColor: '#999',
        //         itemDirection: 'left-to-right',
        //         symbolSize: 12,
        //         symbolShape: 'circle',
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