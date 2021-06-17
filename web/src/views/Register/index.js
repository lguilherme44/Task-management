import { useState } from "react";

// chama a api
import api from "../../services/api";

import { Link } from "react-router-dom";

import { createBrowserHistory } from "history";

// pacote de icones
import { FiArrowLeft } from "react-icons/fi";

// importa o css da pagina
import { Container, Section } from "./styles";

import { toast } from "react-toastify";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "../../styles/global";
import theme from "../../styles/themes/theme";

import login from "../../assets/login.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = createBrowserHistory();

  async function handleNewUser(e) {
    e.preventDefault();

    const data = { name, email, password };

    try {
      const result = await api.post("/register", data);

      if (result) {
        toast(`Usuário cadastrado com sucesso.`);

        history.push("/");
      }
      return;
      // Redireciona para index
    } catch ({ error }) {
      toast.error("Falha no cadastro, Usuário já existe.");
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Section>
            <img src={login} alt="Logo" />
            <h1 className="text-center">Cadastro</h1>
            <p>Faça seu cadastro para entrar na plataforma.</p>

            <form onSubmit={handleNewUser}>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
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

              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>

            <Link className="back-link" to="/">
              <FiArrowLeft size={26} color="#7159c1" />
            </Link>
          </Section>
        </Container>
      </ThemeProvider>
    </>
  );
}
