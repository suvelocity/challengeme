import React from 'react';
import {Pie} from 'react-chartjs-2';

function ChartPie({data}){
    const state = {
      labels: data.labels,
      datasets: [
        {
          label: data.label,
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4',
            '#0a1201',
            '#747871',
            '#c7e3aa',
            '#05d1fa',
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#020302',
          '#5a5c58',
          '#9ebd7e',
          '#0589a3',
          ],
          data: data.data
        }
      ]
    }

    return(
        <div>
        <Pie
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

export default ChartPie;