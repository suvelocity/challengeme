import React from 'react';
import {Bar} from 'react-chartjs-2';

function ChartBar({data}) {
   
    const state = {
        labels: data.labels,
        datasets: data.rawData
      }
  return (
    <>
    <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:data.title,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
    </>
  );
}

export default ChartBar;