import React from 'react';

import { ThemeProvider } from 'styled-components';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

/* Importação de temas e css default */
import GlobalStyles from '../../styles/global';
import theme from '../../styles/themes/theme';

import { Container, Form, Input } from './styles';

export default function Profile() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />
          <Form>
            <h1>Profile Page</h1>
            <img src='' alt='Profile' />
            <Input></Input>
          </Form>

          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
}
