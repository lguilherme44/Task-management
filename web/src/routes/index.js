import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import isConnected from '../utils/isConnected';

/* Views */
import Home from '../views/Home';
import Task from '../views/Task';
import QrCode from '../views/QrCode';
import Login from '../views/Login';
import Register from '../views/Register';
import Profile from '../views/Profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isConnected ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />

        <PrivateRoute path='/home' exact component={Home} />
        <PrivateRoute path='/task' exact component={Task} />
        <PrivateRoute path='/task/:id' exact component={Task} />
        <PrivateRoute path='/qrcode' exact component={QrCode} />
        <PrivateRoute path='/profile' exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
