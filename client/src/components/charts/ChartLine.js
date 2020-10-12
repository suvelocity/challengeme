import React from 'react';
import {Line, defaults} from 'react-chartjs-2';
import './charts.css';
defaults.global.maintainAspectRatio = false



function ChartLine({data}){
    const state = {
        labels: data.labels ,
        datasets: data.rawData
      }


    return(
      <div className="canvas-container">
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:data.title,
              fontSize:20        
            },
            legend:{
              display:false,
              backgroundColor: 'rgba(75,192,192,1)',
              position:'right'
            },
            responsive: true,
          }}
        />
      </div>
    )
}

export default ChartLine;
