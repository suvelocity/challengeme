import React from 'react';
import {Pie} from 'react-chartjs-2';
import './charts.css';

function ChartPie({data}){
    const state = {
      labels: data.labels,
      datasets: [
        {
          label: data.label,
          backgroundColor: data.colors,
          hoverBackgroundColor: data.colors,
          data: data.data
        }
      ]
    }

    return(
        <div className="canvas-container">
        <Pie
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
    )
}

export default ChartPie;