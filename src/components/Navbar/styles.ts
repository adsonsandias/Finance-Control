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
    gap: 16px;
    padding: 0.94rem 1.44rem;
    position: absolute;

    li {
      a {
        display: block;
        box-sizing: border-box;
        background: var(--btn-nav);
        padding: 0.38rem 0.94rem;
        border-radius: 15px;

        &:hover {
          background: var(--btn-nav-hover);
        }
        & svg path {
          fill: var(--background-white);
          fill-opacity: 0.6;
        }
        &:hover svg path {
          fill: var(--detail);
          fill-opacity: 1;
        }
      }
    }
  }
`;
