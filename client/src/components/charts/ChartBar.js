import React from 'react';
import {Bar} from 'react-chartjs-2';
import './charts.css';

function ChartBar({data}) {
   
    const state = {
        labels: data.labels,
        datasets: data.rawData
      }
  return (
    <div className="canvas-container">
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
            },
            responsive: true,
          }}
        />
    </div>
  );
}

export default ChartBar;