import { Redirect, Route as Router } from "react-router-dom";

import React from "react";
import { getCookies } from "./Cookies";

const isAuthenticated = () => Boolean(getCookies("authToken"));

const AuthenticatedRoute = ({ component: Component, ...otherProps }) => {
    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }
    otherProps.isLoggedIn = isAuthenticated();
    return <Router {...otherProps} render={() => <Component {...otherProps} />} />;
};

export default AuthenticatedRoute;
