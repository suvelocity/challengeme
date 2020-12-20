import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
export const PublicRoute = ({ 
    isAuthenticated, 
    component: Component, 
    exact,
    path,
    darkMode
 }) => ( 
    <Route exact={exact? true:false} path={path}>
        { !isAuthenticated ? (
            darkMode ?
                <Component darkMode={darkMode}/>:
                <Component/>
        ) : (
            <Redirect to="/" />
        )}
    </Route>
);

export default PublicRoute;