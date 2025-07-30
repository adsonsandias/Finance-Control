/* eslint-disable react/require-default-props */
import { ChangeEvent } from 'react'

import { InputStyle, InputContainer, ErrorMessage } from './styles'

export interface IINPUTPROPS {
  type?: string
  name: string
  id?: string
  placeholder?: string
  value?: string
  required?: boolean
  disabled?: boolean
  error?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ ...props }: IINPUTPROPS) {
  const { type = 'text', name, placeholder, id, value, onChange, required, disabled, error } = props

  return (
    <InputContainer>
      <InputStyle
        type={type}
        name={name}
        id={id || name}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        error={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  )
}
