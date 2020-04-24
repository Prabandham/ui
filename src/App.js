import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';

import AuthenticatedRoute from './utils/AuthenticatedRoute';
import DashboardContainer from './containers/DashboardContainer';
import LandingPageContainer from './containers/LandingPageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import {Col} from "reactstrap";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          {/*Replace below with NavBar*/}
          <div className="mb-5">
            <Link to="/">
              <h1>
                <span className="text-warning">Cost </span>
                <span className="text-info" style={{ "color": "#2c458b" }}>Tracker</span>
              </h1>
            </Link>
            <Link to="/login" className="btn btn-link float-right">Login</Link>{' '}
          </div>
          <br />
          <br />
          <br />

          <Switch>
            <Route path="/" exact component={LandingPageContainer} />
            <Route path="/login" exact component={LoginPageContainer} />
            <AuthenticatedRoute component={DashboardContainer} exact path="/dashboard" />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
