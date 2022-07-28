import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --gradient-first: linear-gradient(93.67deg, #FFE664 -8.18%, #FA8341 112.11%);
    --gradient-green: linear-gradient(103.87deg, #7FDFBD -41.3%, #12A454 90.03%);
    --gradient-red: linear-gradient(103.87deg, #E62E4D -41.3%, #F296A5 90.03%);
    --box-shadow: 4px 8px 25px rgba(250, 131, 65, 0.25), -5px -2px 25px rgba(255, 230, 100, 0.25);
    --background: #F0F2F5;
    --background-white: #ffffff;
    --success:#33CC95;
    --withdraw:#E62E4D;
    --detail:#FB9C49;
    --btn-detail:rgba(255, 255, 255, 0.5);
    --btn-nav: linear-gradient(92.26deg, rgba(255, 250, 224, 0.2) -31.74%, rgba(255, 235, 223, 0.2) 122.11%);
    --btn-nav-hover: linear-gradient(92.26deg, #FFFAE0 -31.74%, #FFEBDF 122.11%);
    --btn-comfirm-in:#D1DFD7;
    --btn-comfirm-out:#D1DFD7;
    --color-text-1: #834713;
    --color-text-2: #363F5F;
    --color-text-3: #969CB2;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    } 
  }

  body, #root {
    width: 100vw;
    height: 100vh;
  }

  #root{
    display: flex;
    flex-direction: column;
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    @media (max-width: 576px) {
      align-items: flex-end;
    }
  }
  .react-modal-content{
    width: 100%;
    max-width: 576px;
    background: var(--gradient-first);
    padding: .25rem;
    box-shadow: var(--box-shadow);
    border-radius: 0.94rem;
    position: relative;

  }

`;
