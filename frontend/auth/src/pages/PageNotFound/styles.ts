import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--gradient-first);
  flex-direction: column;
  padding: 2rem;

  h1 {
    font-size: 4rem;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    color: #fff;
    letter-spacing: 5px;

    &:before,
    &:after {
      display: block;
      content: attr(data-glitch);
      text-transform: uppercase;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0.8;
    }
    &:after {
      color: #f0f;
      z-index: -2;
    }
    &:before {
      color: #0ff;
      z-index: -1;
    }

    &:before {
      animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
    }
    &:after {
      animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse
        infinite;
    }
  }

  @media only screen and (max-width: 400px) {
    .glitch {
      font-size: 3em;
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-5px, 5px);
    }
    40% {
      transform: translate(-5px, -5px);
    }
    60% {
      transform: translate(5px, 5px);
    }
    80% {
      transform: translate(5px, -5px);
    }
    to {
      transform: translate(0);
    }
  }

  svg {
    width: 100%;
    height: 100%;
    max-width: 698px;
    max-height: 640px;
    padding-top: 8rem;
  }

  div {
    background: #fff;
    padding: 2rem;
    border-radius: 2rem;
    max-width: 700px;
    padding-bottom: 3rem;
    box-shadow: 10px 15px 25px rgba(150, 150, 150, 0.25),
      -10px -5px 25px rgba(150, 150, 150, 0.25);
    @media (max-width: 380px) {
      border-radius: 1.5rem;
      padding: 1.5rem;
      padding-bottom: 2.5rem;
    }

    p {
      color: var(--color-text-2);
      font-size: 1.5rem;
      font-weight: 600;
      @media (max-width: 380px) {
        font-size: 1rem;
      }

      &:nth-child(2n + 0) {
        font-size: 1rem;
        padding-top: 1rem;
        padding-bottom: 2rem;
        color: var(--color-text-3);
        @media (max-width: 380px) {
          font-size: 0.94rem;
        }
      }
    }

    a {
      padding: 1rem 2rem;
      text-decoration: none;
      color: var(--color-text-2);
      font-size: 1rem;
      padding: 1rem 3.5rem;
      font-weight: normal;
      border: 1px solid #d7d7d7;
      background: transparent;
      border-radius: 0.94rem;
      @media (max-width: 380px) {
        font-size: 0.94rem;
        padding: 1rem 2rem;
      }

      & + a {
        margin-left: 1rem;
      }

      transition: all 0.3s;
      &:hover,
      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(239, 239, 239, 0.8),
          0px 0px 0px 5px rgba(123, 123, 123, 0.5);
      }
    }
  }
`;
