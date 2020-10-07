import React from 'react';
import {Line} from 'react-chartjs-2';

function ChartLine({data}){
    const state = {
        labels: data.labels ,
        datasets: [
          {
            label: data.type,
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: data.data
          }
        ]
      }

    return(
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:data.title,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    )
}

export default ChartLine;
