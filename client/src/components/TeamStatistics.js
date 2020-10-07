import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

 // material - grid
 const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      backgroundColor: 'lightblue',
      height: 'inherit',
      width: 'inherit'
    },
}));


function TeamStatistics({ id }) {

    // states
    const [team, setTeam] = useState(null);
    
    //effect
    useEffect(() => getInfo(id), []);
    
    //functions
    const getInfo = async () => {
        const { data } = await axios.get(`/teams/${id}`);
        setTeam(data);
    };

      const classes = useStyles();

      function FormRow() {
        return (
          <React.Fragment>
            <Grid item xs={4}>
              <Paper className={classes.paper}>chart</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>chart</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>chart</Paper>
            </Grid>
          </React.Fragment>
        );
      }
    
      return (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </div>
      );
    }

    export default TeamStatistics;

  