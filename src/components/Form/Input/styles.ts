import styled from "styled-components";

export const InputStyle = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 0.94rem;
  transition: all ease 0.3s;
  border: 1px solid #d7d7d7;
  background: #f3f4f7;
  font-weight: 400;
  font-size: 1rem;
  height: 4rem;

  &::placeholder {
    color: var(--color-text-3);
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 4px rgba(239, 239, 239, 0.8),
      0px 0px 0px 5px rgba(123, 123, 123, 0.5);
  }
`;
