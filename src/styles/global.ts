import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --gradient-first: linear-gradient(93.67deg, #FFE664 -8.18%, #FA8341 112.11%);
    --gradient-green: linear-gradient(103.87deg, #7FDFBD -41.3%, #12A454 90.03%);
    --gradient-blue: linear-gradient(93.67deg, #64D0FF -8.18%, #4174FA 112.11%);
    --gradient-purple: linear-gradient(93.67deg, #F364FF -8.18%, #9241FA 112.11%);
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

    /* Theme Color */
    --category-1: linear-gradient(93.67deg, #6486FF -8.18%, #FDB2A1 112.11%);
    --category-2: linear-gradient(93.67deg, #DC89E3 -5.67%, #D85BE2 41.32%, #833DDD 112.11%);
    --category-3: linear-gradient(93.67deg, #517FA4 -8.18%, #243949 112.11%);
    --category-4: linear-gradient(93.67deg, #FFA394 -8.18%, #EB3349 112.11%);
    --category-5: linear-gradient(93.67deg, #FF9A9E -8.18%, #FAD0C4 112.11%);
    --category-6: linear-gradient(93.67deg, #71E39B -8.18%, #25A97A 112.11%);
    --category-7: linear-gradient(103.87deg, #B62EE6 -41.3%, #F296A5 90.03%);
    --category-8: linear-gradient(93.67deg, #FF6464 -8.18%, #FAE741 112.11%);
    --category-9: linear-gradient(93.67deg, #B98EFF -8.18%, #854DDF 112.11%);
    --category-10: linear-gradient(93.67deg, #ECE078 -8.18%, #45BE31 81.41%, #0AA62C 112.11%);
    --category-11: linear-gradient(93.67deg, #FFF73A -8.18%, #FFB546 112.11%);
    --category-12: linear-gradient(93.67deg, #ABDCFF -8.18%, #0396FF 112.11%);
    --category-13: linear-gradient(104.23deg, #A5AEFD 16.95%, #8F94FB 36.35%, #4E54C8 89.96%);
    --category-14: linear-gradient(93.67deg, #FD6E6A -8.18%, #F4AEE1 112.11%);
    --category-15: linear-gradient(93.67deg, #FFB774 -8.18%, #A8390A 112.11%);
    --category-16: linear-gradient(93.67deg, #90F7EC -8.18%, #32CCBC 112.11%);
    --category-17: linear-gradient(93.67deg, #F6D365 -8.18%, #FDA085 112.11%);
    --category-18: linear-gradient(93.67deg, #FF64EF -8.18%, #FAC641 112.11%);
    --category-19: linear-gradient(93.67deg, #64D0FF -8.18%, #4174FA 112.11%);
    --category-20: linear-gradient(93.67deg, #B10EEC -8.18%, #FF130F 112.11%);
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, #root {
    width: 100vw;
    height: 100vh;
  }

  #root{
    display: flex;
    flex-direction: column;
    overflow: auto;
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
    z-index: 99999;
    @media (max-width: 576px) {
      align-items: flex-end;
    }
  }
  .react-modal-content{
    width: 100%;
    max-width: 576px;
  }

  /* Syles Svg 404 */
  @keyframes error {
    to {
      opacity: 1;
    }
  }
  .error {
    opacity: 0.3;
    animation: error 1s ease alternate infinite;
  }
  @keyframes smoke-02 {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(0px);
    }
  }
  .smoke-02 {
    transform: translateY(10px);
    animation: smoke-02 2s ease alternate infinite;

  }
  @keyframes smoke-01 {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-10px);
    }
  }
  .smoke-01 {
    transform: translateY(10px);
    animation: smoke-01 1.2s ease alternate infinite;
  }
  @keyframes fallen {
    0% {
      transform: translate(3px,-3px);
    }
    50% {
      transform: translate(-3px,2px);
    }
    100% {
      transform: translate(-4px,-3px);

    }
  }
  .fallen {
    transform: translate(-3px,2px);
    animation: fallen 1s linear alternate infinite;
  }
  .bg{
    animation: fallen 5s linear alternate-reverse infinite;
  }

`;
