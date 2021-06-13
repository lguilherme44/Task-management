import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";
import Profile from "../views/Profile";

function PrivateRoute() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/task" exact component={Task} />
        <Route path="/task/:id" exact component={Task} />
        <Route path="/qrcode" exact component={QrCode} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default PrivateRoute;
