import React, { useState, useEffect, useContext } from "react";
import { Container, LeftSide, RightSide } from "./styles";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Api */
import api from "../../services/api";

/* Icons */
import logo from "../../assets/logo.svg";
import bell from "../../assets/bell.svg";

import isConnected from "../../utils/isConnected";
import AuthContext from "../../context/auth";

function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState(0);
  const history = createBrowserHistory();
  const { setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/${isConnected}`).then((response) => {
        setLateCount(response.data.length);
      });
    }

    lateVerify();
  }, []);

  async function Logout() {
    // localStorage.clear();
    setIsLogged(false);
    history.push("/");
  }

  return (
    <Container>
      <LeftSide>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </LeftSide>

      <RightSide>
        <Link to="/home">INÍCIO</Link>

        <span className="divider" />

        <Link to="/task">NOVA TAREFA</Link>

        {isConnected ? (
          <>
            {/* <span className='divider' />
            <Link to='/profile'>
              <button type='button'>PROFILE</button>
            </Link> */}

            <span className="divider" />
            <button onClick={Logout} type="button">
              SAIR
            </button>
          </>
        ) : (
          ""
        )}

        <>
          <span className="divider" />

          <button onClick={clickNotification} id="notification">
            <img src={bell} alt="Notificação" />
            <span>{lateCount}</span>
          </button>
        </>
      </RightSide>
    </Container>
  );
}

export default Header;
