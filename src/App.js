import {
  Collapse, Navbar, NavbarToggler, Nav, NavItem,
} from 'reactstrap';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from './utils/AuthenticatedRoute';
import DashboardContainer from './containers/DashboardContainer';
import LandingPageContainer from './containers/LandingPageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import {getCookies, removeAllCookies} from "./utils/Cookies";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoggedIn: false,
      showLoginLink: false,
    }
  }

  componentDidMount() {
    const isLoggedIn = Boolean(getCookies("authToken"));
    this.setState({ isLoggedIn });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  setLoginStatus = (isLoggedIn) => {
      this.setState({ isLoggedIn });
  };

  setShowLoginLink = (value) => {
    this.setState({showLoginLink: value});
  };

  logOut = () => {
    removeAllCookies();
    this.setState({
      isLoggedIn: false,
      showLoginLink: true,
    });
  };

  renderNavBar = () => {
    const { isOpen, isLoggedIn, showLoginLink } = this.state;
    const brandNavLink = isLoggedIn ? "/dashboard" : "/";
    return(
        <Navbar color="light" fixed="top" light expand="md">
          <Link className="navbar-brand" to={brandNavLink}>
            <span className="text-warning">Cost </span>
            <span className="text-info">Tracker</span>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto order-3" navbar>
              <NavItem>
                {showLoginLink &&
                  (<Link className="nav-link" to={"/login"}>Login</Link>)
                }
                {isLoggedIn &&
                  (<Link className="nav-link" to="#" onClick={this.logOut}>LogOut</Link>)
                }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    )
  };

  render() {
    return (
      <Router>
        <div className="container-fluid">
          {this.renderNavBar()}
          <div style={{ "marginTop": "80px" }}>
            <Switch>
              <Route path="/" exact render={(props) =>
                  <LandingPageContainer
                      {...props}
                      setShowLoginLink={this.setShowLoginLink}
                   />
              }/>
              <Route path="/login" exact render={(props) =>
                  <LoginPageContainer
                      {...props}
                      setLoginStatus={this.setLoginStatus}
                      setShowLoginLink={this.setShowLoginLink}
                  />
              }/>
              <AuthenticatedRoute component={DashboardContainer} exact path="/dashboard" />
              <Route render={() => <h1 className="text-center text-danger">Page not found</h1>} />
          </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
