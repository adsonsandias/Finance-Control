import styled from "styled-components";

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: -8rem;
  @media (max-width: 1100px) {
    overflow: auto;
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  & > div {
    background: var(--gradient-first);
    padding: 0.25rem;
    box-shadow: var(--box-shadow);
    border-radius: 1.6rem;

    max-width: 22rem;

    display: flex;

    &:nth-child(2) div strong {
      padding-left: 1rem;
    }
    &:nth-child(2) div strong::before {
      content: "-";
      display: inline-block;
      color: currentColor;
      position: absolute;
      left: 0;
    }
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--background-white);
      padding: 1.5rem 2rem;
      border-radius: 1.56rem;
      overflow: hidden;
      @media (max-width: 980px) {
        max-width: 19rem;
      }
      @media (max-width: 480px) {
        height: 12rem;
      }

      header {
        flex: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;

        p {
          font-size: 1rem;
        }

        img {
          max-width: 40px;
          padding: 0.25rem;
        }
        @media (max-width: 480px) {
          align-items: flex-start;
          p {
            padding-top: 0.25rem;
          }
        }
      }

      strong {
        color: var(--color-text-2);
        font-size: 2.25rem;
        font-weight: 400;
        letter-spacing: 0.03rem;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        display: none;
        @media (max-width: 480px) {
          display: block;
          font-size: 0.95rem;
          padding-top: 1rem;
          color: var(--color-text-3);
        }
      }
    }
  }
`;
