import React from "react";
import Routes from "./routes";
import { AuthContextProvider } from "./context/auth";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createRoot } from "react-dom/client";

const engine = new Styletron();
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <AuthContextProvider>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ToastContainer />
        <Routes />
      </BaseProvider>
    </StyletronProvider>
  </AuthContextProvider>
);
