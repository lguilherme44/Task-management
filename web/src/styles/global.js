import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

    }
    html, body, #root{
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    }

    body {
      font-family: 'Roboto', sans-serif;
    }
  
    button {
      border: none;
      background: none;
      cursor: pointer;
      outline: none;
    }

    input {
      outline: none;
    }
`;
