import React, { useState, useEffect } from 'react';
import { Container, Content, QrCodeArea, ValidationCode } from './styles';
import { ThemeProvider } from 'styled-components';
import api from '../../services/api';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import GlobalStyles from '../../styles/global';
import theme from '../../styles/themes/theme';

import Qr from 'qrcode.react';

import isConnected from '../../utils/isConnected';

function QrCode() {
  const [lateCount, setLateCount] = useState();
  const [mac, setMac] = useState();

  async function SaveMac() {
    // if (!mac) {
    //   alert('Você precisa informar o número que apareceu no celular');
    // } else {
    //   await localStorage.setItem('@todo/macaddress', mac);
    //   window.location.reload();
    // }
  }

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/${isConnected}`).then((response) => {
        setLateCount(response.data.length);
      });
    }

    lateVerify();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Header lateCount={lateCount} />
        <Content>
          <h1>CAPTURE O QRCODE PELO APP</h1>
          <p>Suas atividades serão sincronizadas com a do seu celular</p>
          <QrCodeArea>
            <Qr value='getmecaddress' size={350}></Qr>
          </QrCodeArea>

          <ValidationCode>
            <span>Digite a numeração que apareceu no celular</span>
            <input
              type='text'
              onChange={(e) => setMac(e.target.value)}
              value={mac}
            />
            <button onClick={SaveMac} type='button'>
              SINCRONIZAR
            </button>
          </ValidationCode>
        </Content>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default QrCode;
