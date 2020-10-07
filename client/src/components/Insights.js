import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Charts from './charts/Charts';
import axios from 'axios';


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
      'headChart headChart smallChart' 200px 
      'headChart headChart sideChart' 200px
      'leftChart rightChart sideChart' 200px
      'bottomChart bottomChart bottomChart' 150px / 350px 350px 450px;`
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

function Insights() {
    const classes = useStyles();

    const imageStyle = {backgroundColor: 'lightgray'}

    // useEffect(() =>  getInfo , [])
    //     const [info , setInfo] = useState(null);

    // const getInfo = () => {
    //     axios.get(`statistic/insights`).then(r => r.data).then(r => {setInfo(r)});
    // };

    const data={
        labels: ['January', 'February', 'March','April', 'May'], // array of values for x axis (strings)
        title: 'test', // title for the chart
        rawData: [
        //   {
        //     label: 'data1',// name of the line (one or two words)
        //     backgroundColor: 'red',//raw color
        //     borderColor: 'red',//use the same as background color
        //     fill: false, // change the line chart
        //     data: [65, 59, 80, 81, 56], // array of values for Y axis (numbers)
        //   },
          {
            label: 'data1',// name of the line (one or two words)
            backgroundColor: 'green',//raw color
            borderColor: 'green',//use the same as background color
            fill: false, // change the line chart
            data: [44, 50, 86, 61, 56], // array of values for Y axis (numbers)
          }
            // you can add as many object as you wand, each one will a different line with different color
        ]
    } 
    

    return (
        <div className={classes.main}>
        <div className={classes.grid}>
            <div id="SubmissionPerDayChart" className={classes.div} style={{gridArea: 'headChart', ...imageStyle}}>submissions per day<br/> <Charts width={'650px'} height={'650px'} chart={[0,1]} data={data}/></div>
            <div id="SubmissionTotalChart" className={classes.div} style={{gridArea: 'smallChart', ...imageStyle}}>total sumition number<br /><span className={classes.span}>1349</span></div>
            <div id="challengesByTypeChart" className={classes.div} style={{gridArea: 'sideChart',  ...imageStyle}}>challenges per type <br/> <Charts width={'450px'} height={'450px'} chart={[0,1,2]} data={data}/></div>  
            <div id="challengesMostSubChart" className={classes.div} style={{gridArea: 'leftChart', ...imageStyle}}>challenges with most submitions<br/> <Charts width={'300px'} height={'300px'} chart={[2]} data={data}/></div>
            <div id="challengesMostSuccessChart" className={classes.div} style={{gridArea: 'rightChart', ...imageStyle}}>challenges with most success rate<br/> <Charts width={'300px'} height={'300px'} chart={[2]} data={data}/></div>
            <div id="SubmissionChart" className={classes.div} style={{gridArea: 'bottomChart', ...imageStyle}}></div>
        </div>
        
        </div>
    )
}

export default Insights;
