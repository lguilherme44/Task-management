import { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Router,
} from "react-router-dom";
import AuthContext from "../context/auth";

/** pages */
import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Register from "../views/Register";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/task"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <PrivateRoute>
              <QrCode />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
