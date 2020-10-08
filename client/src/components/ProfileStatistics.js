import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    div: {
      textAlign: 'center',
      backgroundColor: 'lightblue',
      height: 'inherit',
      width: 'inherit'
    },
}));

function ProfileStatistics({ params }) {


// useEffect(() =>  getInfo , [])
//     const [info , setInfo] = useState(null);

//     const getInfo = () => {
//         axios.get(`statistic/profile/${params.id}`).then(r => r.data).then(r => {setInfo(r)});
//     };

console.log("PROFILE");
    const classes = useStyles();

  return (
    <div className={classes.root}>hellolololololo
      <Grid container spacing={3}>
        {/* <Grid item xs={12}> 
        </Grid> */}
        <Grid item xs={12} sm={6}>
            <div className={classes.div}>hello</div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <div className={classes.div}>hello</div>
        </Grid>
        <Grid item xs={12} sm={4}>
            <div className={classes.div}>hello</div>
        </Grid>
        <Grid item xs={12} sm={4}>
            <div className={classes.div}>hello</div>
        </Grid>
        <Grid item xs={12} sm={4}>
            <div className={classes.div}>hello</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileStatistics;
