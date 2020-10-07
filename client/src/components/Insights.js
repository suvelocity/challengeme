import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
   
    grid: {
      display: 'grid',
      gridGap: '20px',
      textAlign: 'center',
      backgroundColor: 'lightblue',
      padding: '10px',
      height: 'inherit',
      width: 'inherit',
      gridTemplate: `
      'headChart headChart smallChart' 100px 
      'headChart headChart sideChart' 100px
      'leftChart rightChart sideChart' 100px
      'bottomChart bottomChart bottomChart' 100px / 150px 150px 250px;`
    },
    div: {
        textAlign: 'center',
        backgroundColor: 'lightgray',
        borderRadius: '20px',
        boxShadow: '6px 6px 12px black'
    }
}));

function Insights() {
    const classes = useStyles();

    // useEffect(() =>  getInfo , [])
    //     const [info , setInfo] = useState(null);

    // const getInfo = () => {
    //     axios.get(`statistic/insights`).then(r => r.data).then(r => {setInfo(r)});
    // };


    return (
        <div>
        <div className={classes.grid}>
            <div className={classes.div} style={{gridArea: 'headChart'}}>submitions per day</div>
            <div className={classes.div} style={{gridArea: 'smallChart'}}>total sumition number</div>
            <div className={classes.div} style={{gridArea: 'sideChart'}}>anouther graph</div>  
            <div className={classes.div} style={{gridArea: 'leftChart'}}>challenges with most submitions</div>
            <div className={classes.div} style={{gridArea: 'rightChart'}}>challenges with most success rate</div>
            <div className={classes.div} style={{gridArea: 'bottomChart'}}>challenges per type</div>
        </div>
        </div>
    )
}

export default Insights;
