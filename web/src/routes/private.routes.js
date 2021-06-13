import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";
import Profile from "../views/Profile";
import AuthContext from "../context/auth";
import isConnected from "../utils/isConnected";

function PrivateRoute() {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isConnected) {
      setIsLogged(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {isLogged ? (
          <>
            <Redirect to="/home" />
            <Route path="/home" component={Home} />
          </>
        ) : (
          <>
            <Route path="/task" component={Task} />
            <Route path="/task/:id" component={Task} />
            <Route path="/qrcode" component={QrCode} />
            <Route path="/profile" component={Profile} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default PrivateRoute;
