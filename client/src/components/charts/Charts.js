import React, { useState } from 'react';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import ChartLine from './ChartLine';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import TimelineIcon from '@material-ui/icons/Timeline';
import './charts.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


function Charts(props) {
    const [chartType,setChartType] = useState(props.chart[0])
    
    const chartsData = {
        Line: props.data,
        Bar: props.data,
        Pie: {
            labels: props.data.labels,
            title: props.data.title,
            label: props.data.rawData[0].label,
            data: props.data.rawData[0].data,
            colors: props.data.rawData[0].backgroundColor
        }
    }
    
    function selectChart(){
        switch (chartType) {
            case 0:
                return <ChartBar data = {chartsData.Bar} />
            case 1:
                return <ChartLine data = {chartsData.Line}/>
            case 2:
                return <ChartPie data = {chartsData.Pie}/>
            default:
                return <ChartBar data = {chartsData.Bar} />
        }
    }
    const useStyles = makeStyles((theme) => ({
        chart: {
            position: 'relative',
            width: props.width,
            height: props.height,
            margin: 'auto'
        }
    }));
    const classes = useStyles();
  return (
    <div className={clsx(classes.chart)} id={props.name}>
        <div className="chart">
            {
                selectChart()         
            }
        </div>
        {
        typeof props.chart !== 'number'&&
        <BottomNavigation
                value={chartType}
                onChange={(event, newValue) => {
                setChartType(newValue);
                }}
                showLabels 
                className= {'chartNavBar'}
            >
            {
            (props.chart.includes(0) && props.chart.length > 1 ) &&
            <BottomNavigationAction label="Bar" icon={<EqualizerIcon />} id={props.name + "Bar"} />
            }
            {
            (props.chart.includes(1) && props.chart.length > 1 ) &&
            <BottomNavigationAction label="Line" icon={<TimelineIcon />} id={props.name + "Line"} />
            }
            {
            (props.chart.includes(2) && props.chart.length > 1 && props.data.rawData.length === 1) &&
            <BottomNavigationAction label="Pie" icon={<DonutSmallIcon/>} id={props.name + "Pie"} />
            }
        </BottomNavigation>
        }
       
    </div>
  );
}

export default Charts;