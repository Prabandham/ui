import { Redirect, Route as Router } from "react-router-dom";

import React from "react";
import { getCookies } from "./Cookies";

const isAuthenticated = () => Boolean(getCookies("authToken"));

const AuthenticatedRoute = ({ component: Component, ...otherProps }) => {
    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }
    otherProps.isLoggedIn = isAuthenticated();
    if (otherProps.userInfo.ID === undefined) {
        otherProps.userInfo = JSON.parse(getCookies("userInfo"));
    }
    return <Router {...otherProps} render={() => <Component {...otherProps} />} />;
};

export default AuthenticatedRoute;
