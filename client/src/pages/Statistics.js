import React from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NavBarStatistics from '../components/NavBarStatistics';
import ThemeApi from "../services/Theme"
import StatisticsHome from '../components/StatisticsHome';
import UserStatistics from '../components/UserStatistics';
import TeamStatistics from '../components/TeamStatistics';
import Insights from '../components/Insights';
import './Home.css'
import { makeStyles } from '@material-ui/core/styles';
import ProfileStatistics from '../components/ProfileStatistics';

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "6% 94%"
    },

});
function Statistics() {
    const darkMode = React.useContext(ThemeApi).darkTheme
    const classes = useStyles()
    const { path, url } = useRouteMatch();
    return (
        <div className={darkMode?"dark-home-page":"light-home-page"}>
            <div className={classes.root} >
                <div>
                    <NavBarStatistics />
                </div>
                <div>
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
