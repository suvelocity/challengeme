import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Logged } from '../context/LoggedInContext';

const PrivateRoute = ({ component: Component, exact, path, darkMode }) => {

    const LoggedContext = useContext(Logged);

    return (
        <Route exact={exact ? true : false} path={path}>
            {LoggedContext.logged ? (
                darkMode ?
                    <Component darkMode={darkMode} /> :
                    <Component />
            ) : (
                    <Redirect to="/login" />
                )}
        </Route>
    )
};

export default PrivateRoute;