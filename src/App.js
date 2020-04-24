import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';

import LandinPageContainer from './containers/LandingPageContainer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="float-right mb-5">
            <Link to="/login" exact="true" className="btn btn-link">Login</Link>{' '}
          </div>
          <br />
          <br />
          <br />

          <Switch>
            <Route path="/" component={LandinPageContainer} />
            <Route path="/about" component={LandinPageContainer} />
            <Route path="/contact" render={() => <h1>Contact Us</h1>} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
