import styled from "styled-components";

export const UserSection = styled.section`
  background: var(--background-white);
  box-shadow: 10px 15px 25px rgba(192, 192, 192, 0.25),
    -10px -5px 25px rgba(228, 228, 228, 0.25);
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  position: relative;
  margin-top: -8rem;
  border-radius: 1.56rem;
  padding: 4rem;
  margin-bottom: 7rem;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    position: relative;
    @media (max-width: 980px) {
      grid-area: 1/1;
      align-items: center;
      flex-direction: row;

      &::after {
        display: none;
      }
    }
    @media (max-width: 670px) {
      gap: 0;
    }

    &::after {
      content: "";
      height: 100%;
      width: 2px;
      flex: 2;
      background: #d9d9d9;
      position: absolute;
      right: 0;
    }
  }

  @media (max-width: 1180px) {
    width: initial;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 980px) {
    width: initial;
    padding: 3rem 2.5rem;
    grid-template-columns: 1fr;
  }
  @media (max-width: 480px) {
    align-items: start;
    padding: 1.5rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 670px) {
    flex: 1;
  }

  img {
    max-width: 8.63rem;
    @media (max-width: 760px) {
      max-width: 6rem;
      height: 100%;
    }
    @media (max-width: 480px) {
      max-width: 4rem;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: space-between;
    @media (max-width: 670px) {
      flex-direction: row;
      align-items: center;
      flex: 1;
      margin-left: 0rem;
    }
    @media (max-width: 359px) {
      flex-direction: column;
      align-items: flex-start;
    }

    div {
      h1 {
        font-size: 1.25rem;
      }

      span {
        padding-top: 0.5rem;
        flex: 1;
      }
    }

    button {
      color: var(--color-text-2);
      border: 1px solid #d7d7d7;
      background-color: #ffffff;
      padding: 0.56rem 1.5rem;
      border-radius: 0.63rem;

      transition: all ease 0.3s;
      &:hover,
      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px rgba(239, 239, 239, 0.8),
          0px 0px 0px 5px rgba(123, 123, 123, 0.5);
      }
      @media (max-width: 359px) {
        margin-top: 0.5rem;
      }
    }
  }
`;

export const CardTotal = styled.div`
  div {
    background: var(--gradient-first);
    padding: 0.25rem;
    box-shadow: var(--box-shadow);
    border-radius: 1.6rem;
    max-width: 22rem;
    display: flex;
    @media (max-width: 670px) {
      display: none;
    }

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
      @media (max-width: 480px) {
        height: 13rem;
        min-width: 15rem;
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

export const NewCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  @media (max-width: 980px) {
    grid-area: 2/1;
    margin-left: 0rem;
    margin-top: 2rem;
  }
  @media (max-width: 480px) {
    grid-area: 1/1;
    margin-top: 5rem;
  }
  @media (max-width: 359px) {
    margin-top: 7rem;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    gap: 1rem;

    li {
      background-color: #f0f2f5;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      border-radius: 0.94rem;

      & + li {
        margin-top: 1rem;
      }
    }
  }
`;
