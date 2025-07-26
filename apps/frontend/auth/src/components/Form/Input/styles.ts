import styled from 'styled-components'

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
`

interface InputStyleProps {
  error?: boolean
}

export const InputStyle = styled.input<InputStyleProps>`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 0.94rem;
  transition: all ease 0.3s;
  border: 1px solid ${(props) => (props.error ? 'var(--color-error)' : '#d7d7d7')};
  background: #f3f4f7;
  font-weight: 400;
  font-size: 1rem;
  height: 4rem;
  display: block;
  @media (max-width: 480px) {
    height: 3.5rem;
    font-size: 0.88rem;
  }

  &::placeholder {
    color: var(--color-text-3);
  }

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 4px rgba(239, 239, 239, 0.8), 0px 0px 0px 5px rgba(123, 123, 123, 0.5);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`
