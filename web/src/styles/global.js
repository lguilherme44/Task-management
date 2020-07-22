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
      /* background: linear-gradient(324deg, #0d0d0dfc 0%, #0d0d0dc7 35%, #0d0d0dde 100%) repeat-y; */
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
