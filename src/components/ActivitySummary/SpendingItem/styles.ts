import { motion } from "framer-motion";
import styled from "styled-components";

export const SpendingItemStyles = styled(motion.li)`
  background: var(--gradient-first);
  padding: 0.5rem;
  width: 16rem;
  height: 6.25rem;
  border-radius: 1.75rem;
  display: flex;

  & > div {
    display: flex;
    align-items: center;
    flex: 1;
    background-color: #f0f2f5;
    border-radius: 1.25rem;
    box-shadow: 0 0 0 0.38rem #ffffff;
    position: relative;

    & > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${(props) => props.theme.icon};
      padding: 0.75rem;
      margin-left: 1rem;
      border-radius: 50%;
    }

    & > div:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 1rem;
      flex: 1;

      strong {
        color: var(--color-text-2);
        width: 100%;
        text-align: end;
        font-size: 1.38rem;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        bottom: 0.5rem;
      }

      span {
        color: var(--color-text-3);
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 600;
        margin-top: 0.38rem;
        position: absolute;
        white-space: nowrap;
        text-align: end;
        overflow: hidden;
        bottom: 1rem;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
`;
