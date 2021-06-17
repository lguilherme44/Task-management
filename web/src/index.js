import ReactDOM from "react-dom";
import Routes from "./routes";
import { AuthContextProvider } from "./context/auth";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const engine = new Styletron();

ReactDOM.render(
  <AuthContextProvider>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ToastContainer />
        <Routes />
      </BaseProvider>
    </StyletronProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
