import { Route as Router, Redirect } from "react-router-dom";
import { getCookies } from "./Cookies";
import React from "react";

const isAuthenticated = () => Boolean(getCookies("authToken"));
const userInfo = getCookies("userInfo");

const AuthenticatedRoute = ({ component: Component, ...otherProps }) => {
    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }
    otherProps.isLoggedIn = isAuthenticated();
    if (userInfo) {
        otherProps.userInfo = JSON.parse(userInfo);
    } else {
        otherProps.userInfo = {};
    }
    return <Router {...otherProps} render={() => <Component {...otherProps} />} />;

};

export default AuthenticatedRoute;
