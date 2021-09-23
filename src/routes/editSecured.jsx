import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const EditSecured = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies(['isLoggedinEditor']);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (cookies.isLoggedinEditor) {
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
