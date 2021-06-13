import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth";
import PublicRoutes from "./public.routes";
import PrivateRoutes from "./private.routes";
import isConnected from "../utils/isConnected";

export default function Routes() {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isConnected) {
      setIsLogged(true);
    }
  }, []);

  return isLogged ? <PrivateRoutes /> : <PublicRoutes />;
}
