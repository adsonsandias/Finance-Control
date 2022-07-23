import styled from "styled-components";

export const Container = styled.nav`
  max-width: 1120px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  bottom: 6rem;
  position: fixed;
  right: 0;
  left: 0;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    background: var(--gradient-first);
    box-shadow: var(--box-shadow);
    border-radius: 1.56rem;
    gap: 12px;
    padding: 0.6rem 1rem;
    position: absolute;

    li {
      button {
        display: block;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.3);
        padding: 0.38rem 0.94rem;
        border-radius: 15px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
        transition: all ease 0.5s;
        border: none;
        transform: scale(0.9);

        &:hover {
          background-color: rgba(255, 255, 255, 0.6);
          transform: scale(1);
        }
        & svg path {
          fill: var(--background-white);
          fill-opacity: 0.8;
          transition: fill ease 0.5s;
        }
        &:hover svg path {
          fill: var(--detail);
          fill-opacity: 1;
        }
      }
    }
  }
`;
