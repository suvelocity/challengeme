import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


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
      'headChart headChart smallChart' 100px 
      'headChart headChart sideChart' 100px
      'leftChart rightChart sideChart' 100px
      'bottomChart bottomChart bottomChart' 100px / 150px 150px 250px;`
    },
    div: {
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'lightgray',
        borderRadius: '20px',
        boxShadow: '6px 6px 12px black'
    },
    main: {
        marginTop: '70px',
        display: 'grid',
        padding: '30px',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        gridTemplateColumns: 'auto',
        width: '100%'
    }
}));

function Insights() {
    const classes = useStyles();

    const imageStyle = {backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'};

    // useEffect(() =>  getInfo , [])
    //     const [info , setInfo] = useState(null);

    // const getInfo = () => {
    //     axios.get(`statistic/insights`).then(r => r.data).then(r => {setInfo(r)});
    // };


    return (
        <div className={classes.main}>
        <div className={classes.grid}>
            <div className={classes.div} style={{gridArea: 'headChart', backgroundImage: 'url(https://www.mindtools.com/media/Diagrams/Charts-and-Graphs-5.jpg)' , ...imageStyle}}>submitions per day</div>
            <div className={classes.div} style={{gridArea: 'smallChart', backgroundImage: 'url(https://www.luminafoundation.org/wp-content/uploads/2019/03/chart-pie3.jpg)' , ...imageStyle}}>total sumition number</div>
            <div className={classes.div} style={{gridArea: 'sideChart', backgroundImage: 'url(https://images.theconversation.com/files/326025/original/file-20200407-31007-dits9d.png?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip)' , ...imageStyle}}>anouther graph</div>  
            <div className={classes.div} style={{gridArea: 'leftChart', backgroundImage: 'url(https://cdn-skill.splashmath.com/panel-uploads/GlossaryTerm/0053540d59ee4824b70187bce47ef0e4/1551236725_Drawing-a-bar-graph-to-represent-the-data.png)' , ...imageStyle}}>challenges with most submitions</div>
            <div className={classes.div} style={{gridArea: 'rightChart', backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgSfZTw02gCzDZYTtUkd0eFRLfhVItCYT8Tg&usqp=CAU)' , ...imageStyle}}>challenges with most success rate</div>
            <div className={classes.div} style={{gridArea: 'bottomChart', backgroundImage: 'url(https://www.wireshark.org/docs/wsug_html_chunked/wsug_graphics/ws-stats-iographs.png)' , ...imageStyle}}>challenges per type</div>
        </div>
        </div>
    )
}

export default Insights;
