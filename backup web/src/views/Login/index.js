import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FiLogIn } from 'react-icons/fi';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global';
import theme from '../../styles/themes/theme';

import isConnected from '../../utils/isConnected';

import login from '../../assets/login.svg';

import { Container, Section } from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (isConnected) {
      history.push('/home');
    }
  }, [history]);

  async function handleLogin(e) {
    e.preventDefault();

    await api
      .post('sessions', { email, password })
      .then((response) => {
        localStorage.setItem('userName', response.data.user.name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userId', response.data.user.id);

        history.push('/home');

        window.location.reload();
      })
      .catch((error) => {
        toast.error('Usuário e/ou Password invalidos.');
      });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Section>
            <img src={login} alt='Logo' />
            <form onSubmit={handleLogin}>
              <input
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className='button' type='submit'>
                Entrar
              </button>

              <Link className='back-link' to='/register'>
                <FiLogIn size={16} color='#7159c1' />
                Criar conta grátis
              </Link>
            </form>
          </Section>
        </Container>
      </ThemeProvider>
    </>
  );
}
