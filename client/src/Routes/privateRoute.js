import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Logged } from '../context/LoggedInContext';

const PrivateRoute = ({ component: Component, exact, path }) => {
  const LoggedContext = useContext(Logged);

  return (
    <Route exact={!!exact} path={path}>
      {LoggedContext.logged ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default PrivateRoute;
