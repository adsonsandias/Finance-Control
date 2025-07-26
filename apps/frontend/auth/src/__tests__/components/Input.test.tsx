import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '../../components/Form/Input'

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input name="test" placeholder="Test Input" />)
    const inputElement = screen.getByPlaceholderText('Test Input')
    expect(inputElement).toBeInTheDocument()
  })

  it('handles value changes', () => {
    render(<Input name="test" placeholder="Test Input" />)
    const inputElement = screen.getByPlaceholderText('Test Input') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(inputElement.value).toBe('New Value')
  })

  it('applies error styles when error prop is provided', () => {
    render(<Input name="test" placeholder="Test Input" error="This field is required" />)

    const inputElement = screen.getByPlaceholderText('Test Input')
    const errorMessage = screen.getByText('This field is required')

    expect(errorMessage).toBeInTheDocument()
    expect(inputElement).toHaveStyle('border-color: var(--color-error)')
  })

  it('calls onChange callback when input value changes', () => {
    const handleChange = jest.fn()
    render(<Input name="test" placeholder="Test Input" onChange={handleChange} />)

    const inputElement = screen.getByPlaceholderText('Test Input')
    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with the correct type', () => {
    render(<Input name="password" type="password" placeholder="Password" />)
    const inputElement = screen.getByPlaceholderText('Password') as HTMLInputElement

    expect(inputElement.type).toBe('password')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input name="test" placeholder="Test Input" disabled />)
    const inputElement = screen.getByPlaceholderText('Test Input')

    expect(inputElement).toBeDisabled()
  })
})
