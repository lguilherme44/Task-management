import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../views/Login";
import Register from "../views/Register";

function PublicRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default PublicRoutes;
