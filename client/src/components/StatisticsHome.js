import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Charts from './charts/Charts';

const useStyles = makeStyles((theme) => ({
   
    grid: {
      display: 'grid',
      gridGap: '20px',
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
      padding: '10px',
      height: 'inherit',
      width: 'inherit',
      gridTemplate: `
      'headChart topChart' 300px 
      'headChart bottomChart' 300px / 800px 600px;`
    },
    div: {
        textAlign: 'center',
        alignContent: 'center',
        padding: '20px',
        fontWeight: 'bold',
        backgroundColor: 'lightgray',
        borderRadius: '20px',
        boxShadow: '6px 6px 12px black'
    },
    main: {
        display: 'grid',
        padding: '10px',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        gridTemplateColumns: 'auto',
        width: '100%'
    },
    span: {
        fontSize: '30px'
    }
}));


const challengeData = {
    labels: ['Challenge1', 'Challenge2', 'Challenge3','Challenge4', 'Challenge5'], // array of values for x axis (strings)
    title: 'Top Rated Challenges', // title for the chart
    rawData: [
      {
        label: 'data1',// name of the line (one or two words)
        backgroundColor: ['purple','blue', 'green', 'red', 'yellow'],//raw color
        borderColor: 'cyan',//use the same as background color
        fill: false, // change the line chart
        data: [85, 83, 80, 78, 75, 0], // array of values for Y axis (numbers)
      }
        // you can add as many object as you wand, each one will a different line with different color
    ]
} ;

const teamData = {
    labels: ['January', 'February', 'March','April', 'May'], // array of values for x axis (strings)
    title: 'Top Teams', // title for the chart
    rawData: [
      {
        label: 'Team1',// name of the line (one or two words)
        backgroundColor: 'red',//raw color
        borderColor: 'red',//use the same as background color
        fill: false, // change the line chart
        data: [2, 5, 10, 17, 25], // array of values for Y axis (numbers)
      },
      {
        label: 'Team2',// name of the line (one or two words)
        backgroundColor: 'green',//raw color
        borderColor: 'green',//use the same as background color
        fill: false, // change the line chart
        data: [5, 8, 15, 25, 31], // array of values for Y axis (numbers)
      },
      {
        label: 'Team3',// name of the line (one or two words)
        backgroundColor: 'blue',//raw color
        borderColor: 'blue',//use the same as background color
        fill: false, // change the line chart
        data: [3, 9, 14, 22, 29], // array of values for Y axis (numbers)
      },
      {
        label: 'Team4',// name of the line (one or two words)
        backgroundColor: 'yellow',//raw color
        borderColor: 'yellow',//use the same as background color
        fill: false, // change the line chart
        data: [1, 6, 7, 11, 13], // array of values for Y axis (numbers)
      },
      {
        label: 'Team5',// name of the line (one or two words)
        backgroundColor: 'black',//raw color
        borderColor: 'black',//use the same as background color
        fill: false, // change the line chart
        data: [1, 5, 10, 16, 22], // array of values for Y axis (numbers)
      }
        // you can add as many object as you wand, each one will a different line with different color
    ]
} ;
const userData = {
    labels: ['January', 'February', 'March','April', 'May'], // array of values for x axis (strings)
    title: 'Top Users', // title for the chart
    rawData: [
      {
        label: 'User1',// name of the line (one or two words)
        backgroundColor: 'red',//raw color
        borderColor: 'red',//use the same as background color
        fill: false, // change the line chart
        data: [40, 59, 80, 81, 88], // array of values for Y axis (numbers)
      },
      {
        label: 'User2',// name of the line (one or two words)
        backgroundColor: 'green',//raw color
        borderColor: 'green',//use the same as background color
        fill: false, // change the line chart
        data: [44, 50, 57, 61, 66], // array of values for Y axis (numbers)
      },
      {
        label: 'User3',// name of the line (one or two words)
        backgroundColor: 'blue',//raw color
        borderColor: 'blue',//use the same as background color
        fill: false, // change the line chart
        data: [23, 25, 37, 47, 49], // array of values for Y axis (numbers)
      },
      {
        label: 'User4',// name of the line (one or two words)
        backgroundColor: 'yellow',//raw color
        borderColor: 'yellow',//use the same as background color
        fill: false, // change the line chart
        data: [22, 31, 35, 50, 59], // array of values for Y axis (numbers)
      },
      {
        label: 'User5',// name of the line (one or two words)
        backgroundColor: 'black',//raw color
        borderColor: 'black',//use the same as background color
        fill: false, // change the line chart
        data: [25, 35, 45, 62, 84 ], // array of values for Y axis (numbers)
      },
        // you can add as many object as you wand, each one will a different line with different color
    ]
} ;


function StatisticsHome() {
    const classes = useStyles();
    console.log("HOME");
    const imageStyle = {backgroundColor: 'lightgray'};

    return (
      
        <div className={classes.main}>
        <div className={classes.grid}>
            <div className={classes.div} style={{gridArea: 'headChart', ...imageStyle}}><Charts width={'600px'} height={'2000px'} chart={[0,2]} data={challengeData}/></div>
            <div className={classes.div} style={{gridArea: 'topChart', ...imageStyle}}><Charts width={'450px'} height={'70px'} chart={[0,1]} data={userData}/></div>
            <div className={classes.div} style={{gridArea: 'bottomChart', ...imageStyle}}><Charts width={'450px'} height={'70px'} chart={[0,1]} data={teamData}/></div>
        </div>
        
        </div>
    )
}



export default StatisticsHome;
