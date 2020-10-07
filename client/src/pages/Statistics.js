import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarStatistics from "../components/NavBarStatistics";
import StatisticsHome from '../components/StatisticsHome';
import UserStatistics from '../components/UserStatistics';
import TeamStatistics from '../components/TeamStatistics';
import Insights from '../components/Insights';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
});
function Statistics() {
    const classes = useStyles()
    return (
        <Router>
            <Grid className={classes.root} container>
                <Grid xs={12}>
                    <NavBarStatistics />
                </Grid>
            <Switch>
                <Route exact path="/statistic" component={StatisticsHome} />
                <Route path="/statistic/users" component={UserStatistics}/>
                <Route path="/statistic/teams" component={TeamStatistics} />
                <Route path="/statistic/insights" component={Insights} />
            </Switch>
           </Grid>
        </Router>
            
        
    )
}

export default Statistics;
