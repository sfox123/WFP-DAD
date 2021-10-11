import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApiContext } from '../context/ApiContext'
import { useCookies } from 'react-cookie';

export const Protected = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(['isLoggedinAdmin']);
  const { user } = useContext(ApiContext)
  const { level } = user;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (level === 1 || cookies.isLoggedinAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to='/'
            />
          );
        }
      }}
    />
  );
};
