import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { FiLogIn } from "react-icons/fi";
import { ThemeProvider } from "styled-components";
import { Container, Section } from "./styles";
import GlobalStyles from "../../styles/global";
import theme from "../../styles/themes/theme";
import login from "../../assets/login.svg";
import AuthContext from "../../context/auth";

import Lottie from "react-lottie";
import loadingAnimation from "../../assets/loading.json";

export default function Login() {
  const history = createBrowserHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sigIn, loading } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    sigIn(email, password);
    history.push("/home");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Section>
            <img src={login} alt="Logo" />
            <form onSubmit={handleLogin}>
              <input
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {loading ? (
                <Lottie options={defaultOptions} height={125} width={125} />
              ) : (
                <>
                  <button className="button" type="submit">
                    Entrar
                  </button>
                  <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#7159c1" />
                    Criar conta grátis
                  </Link>
                </>
              )}
            </form>
          </Section>
        </Container>
      </ThemeProvider>
    </>
  );
}
