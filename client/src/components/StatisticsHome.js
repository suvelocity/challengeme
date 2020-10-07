import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChartBar from './charts/ChartBar';
import ChartLine from './charts/ChartLine';
import ChartPie from './charts/ChartPie';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    header: {
        textAlign: "center",
        color: "textPrimary", 
        gutterBottom: true,
    },
  }));


function StatisticsHome() {
    const classes = useStyles();

    return (
        <>
        <Typography className={classes.header} variant="h1" gutterBottom={true} align='center' color='inherit'>
             Challenge Statistics
        </Typography>
        <Grid container item xs={12} spacing={10} justify="center">
            <Grid item xs={6} alignItems="stretch">
                <Paper className={classes.paper}>Top rated challenges</Paper>
            </Grid>
        <Grid container xs={6} spacing={5} direction="column"  >
            <Grid item >
                <Paper className={classes.paper}>Top Users</Paper>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>Top teams by top success precents</Paper>
            </Grid>
        </Grid>
        </Grid>
</>
    )
}



export default StatisticsHome;
