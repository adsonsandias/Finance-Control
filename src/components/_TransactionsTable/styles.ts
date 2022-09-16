import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.section)`
  max-width: 1120px;
  margin-top: 4rem;

  /* Media Query Section 1100px */
  @media (max-width: 1100px) {
    margin-top: 0rem;
    padding: 0 1rem;
  }

  /***********  Table  *********/
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    /***********  Thead  *********/
    thead {
      th {
        color: var(--color-text-3);
        font-weight: 400;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
      }

      /* Media Query thead 680px */
      @media (max-width: 800px) {
        display: none;
      }
    }

    /***********  TBody  *********/
    tbody {
      tr {
        border-radius: 0.95rem;
        background: var(--background-white);
        overflow: hidden;
        & + tr {
          margin-top: 0.5rem;
        }
      }

      td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--background-white);
        color: var(--color-text-3);
        &:first-child {
          color: var(--color-text-2);
        }
        &:first-child {
          color: var(--color-text-2);
          border-top-left-radius: 0.95rem;
          border-bottom-left-radius: 0.95rem;
        }
        &:last-child {
          border-top-right-radius: 0.95rem;
          border-bottom-right-radius: 0.95rem;
        }
        &.deposit {
          color: var(--success);
        }
        &.withdraw {
          color: var(--withdraw);
        }
      }
    }
    /* Media Query tbody 680px */
    @media (max-width: 800px) {
      tbody {
        display: flex;
        flex-direction: column;
        width: calc(100vw - 2rem);

        tr {
          display: grid;
          grid-template-columns: 1fr;

          td:nth-child(1),
          td:nth-child(2) {
            padding-bottom: 0;
          }
          td:nth-child(3),
          td:nth-child(4) {
            padding-top: 0.5rem;
            font-size: 0.88rem;
          }

          td:nth-child(2) {
            grid-area: 1/2;
          }

          td:nth-child(2n + 0) {
            text-align: end;
          }
        }
      }
    }

    @media (max-width: 460px) {
      tbody {
        tr {
          display: grid;
          grid-template-columns: 1fr 1fr;

          td:nth-child(1),
          td:nth-child(2) {
            grid-column: 1/3;
            padding-bottom: initial;
          }
          td:nth-child(2) {
            grid-row: 2;
          }
          td:nth-child(2) {
            padding: 1rem 2rem;
            font-size: 1.5rem;
          }
          td:nth-child(3),
          td:nth-child(4) {
            padding-top: initial;
          }
          td:nth-child(2n + 0) {
            text-align: initial;
          }
          td:nth-child(4) {
            text-align: end;
          }
        }
      }
    }
  }
`;

export const MobileTitle = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: flex;
    font-weight: 400;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-2);
    padding: 1rem;

    h1 {
      font-weight: 400;
    }
  }
`;
