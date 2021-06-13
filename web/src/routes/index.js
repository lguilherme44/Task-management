import React, { useContext } from "react";
import AuthContext from "../context/auth";
import PublicRoutes from "./public.routes";
import PrivateRoutes from "./private.routes";

export default function Routes() {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <PrivateRoutes /> : <PublicRoutes />;
}
