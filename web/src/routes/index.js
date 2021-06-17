import { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "../context/auth";

/** pages */
import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Register from "../views/Register";

const CustomRoute = ({ isPrivate = false, ...rest }) => {
  const { isLogged } = useContext(AuthContext);

  if (isPrivate && !isLogged) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" component={Login} exact />
        <CustomRoute path="/register" component={Register} />
        <CustomRoute path="/home" component={Home} isPrivate />
        <CustomRoute path="/task" component={Task} isPrivate />
        <CustomRoute path="/task/:id" component={Task} isPrivate />
        <CustomRoute path="/qrcode" component={QrCode} isPrivate />
        <CustomRoute path="/profile" component={Profile} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
