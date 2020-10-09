import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

//import { NavBarStatistics, StatisticsHome, UserStatistics, TeamStatistics, Insights} from '../components';

import NavBarStatistics from '../components/NavBarStatistics';

import StatisticsHome from '../components/StatisticsHome';
import UserStatistics from '../components/UserStatistics';
import TeamStatistics from '../components/TeamStatistics';
import Insights from '../components/Insights';
import ButtonAppBar from '../components/Navigation/NavbarMock';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileStatistics from '../components/ProfileStatistics';

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "6% 94%"
    },
    navBar: {
        
    },
    main: {
    }
});
function Statistics() {
    const classes = useStyles()
    const { path, url } = useRouteMatch();
    const res = useRouteMatch();
    console.log(res);
    return (
        <div>
            <div className={classes.root} >
                <div className={classes.navBar}>
                    <NavBarStatistics />
                </div>
                <div  className={classes.main} >
            <Switch>
                <Route exact path={`${path}`} component={StatisticsHome}/>
                <Route path={`${path}/users`} component={UserStatistics}/>
                <Route path={`${path}/teams`} component={TeamStatistics} />
                <Route path={`${path}/insights`} component={Insights} />
                <Route path={`${path}/profile`} component={ProfileStatistics} />
            </Switch>
            </div>
           </div>
           </div>
       
            
        
    )
}

export default Statistics;