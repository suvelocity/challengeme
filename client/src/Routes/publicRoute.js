import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Logged } from '../context/LoggedInContext';

const PublicRoute = ({ component: Component, exact, path,  }) => {

    const LoggedContext = useContext(Logged);
    
    return (
        <Route exact={exact ? true : false} path={path}>
            { !LoggedContext.logged ? (
                    <Component />
            ) : (
                    <Redirect to="/" />
                )}
        </Route>
    )
};

export default PublicRoute;