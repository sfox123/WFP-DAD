import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { ApiContext } from '../context/ApiContext'
import { useCookies } from 'react-cookie';

export const Secured = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies(['isLoggedinASC', 'AscID']);
    const { user } = useContext(ApiContext)


    return (
        <Route
            {...rest}
            render={(props) => {
                if (user.level === 2 || cookies.isLoggedinASC) {
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
