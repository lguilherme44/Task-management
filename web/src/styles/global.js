import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

    }

    html, body, #root{
      font-size: 0.9rem;
      max-width: 100vw;
      max-height: 100vh;
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 1080px) {
   html {
       font-size: 93.75%; // 16 * 0,9375 = 15px
      }
    }

    @media screen and (max-width: 720px) {
      html {
          font-size: 75%;
      }
    }

    @media screen and (max-width: 480px) {
      html {
          font-size: 68%;
      }
    }

    body {
      -webkit-font-smothing: antialiased !important;
      font-family: Lato, sans-serif;
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
