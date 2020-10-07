import React, { useState } from 'react';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import ChartLine from './ChartLine';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import TimelineIcon from '@material-ui/icons/Timeline';
import './charts.css'

function Charts() {
    const [chartType,setChartType] = useState(0)
    const mockData={
        labels: ['January', 'February', 'March',
        'April', 'May'],
        title: 'test',
        data:[65, 59, 80, 81, 56],
        type:['month']
    }
    function selectChart(){
        switch (chartType) {
            case 0:
              return <ChartBar data = {mockData} />
            case 1:
                return <ChartLine data = {mockData}/>
            case 2:
                return <ChartPie data = {mockData}/>
        }
    }
    
  return (
    <div className="chartComponent">
        <div className="chart">
            {
                selectChart()         
            }
        </div>
        <BottomNavigation
                value={chartType}
                onChange={(event, newValue) => {
                setChartType(newValue);
                }}
                showLabels 
                className= {'chartNavBar'}
            >
            <BottomNavigationAction label="Bar" icon={<EqualizerIcon />} />
            <BottomNavigationAction label="Line" icon={<TimelineIcon />} />
            <BottomNavigationAction label="Pie" icon={<DonutSmallIcon/>} />
        </BottomNavigation>
       
    </div>
  );
}

export default Charts;