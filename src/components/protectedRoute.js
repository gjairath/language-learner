import React, {useContext} from 'react';
import { Route, Redirect } from "react-router-dom";

import {AuthContext} from "./auth.js"

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    console.log({...rest});
  return (
    <Route
    {...rest}
      render={({ location }) => {
        if (currentUser) {
          return <Component {...rest}/>;
        }

        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );

};

export default ProtectedRoute;
