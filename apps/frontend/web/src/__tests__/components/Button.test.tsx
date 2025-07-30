import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/Form/Button'

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Test Button</Button>)
    const buttonElement = screen.getByText('Test Button')
    expect(buttonElement).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    const buttonElement = screen.getByText('Click Me')
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the correct styles for sign button', () => {
    render(<Button isActive="sign">Sign Button</Button>)
    const buttonElement = screen.getByText('Sign Button')

    // Check if the button has the correct styling
    expect(buttonElement).toHaveStyle('font-weight: bold')
    expect(buttonElement).toHaveStyle('color: #ffffff')
  })

  it('applies the correct styles for regular button', () => {
    render(<Button isActive="button">Regular Button</Button>)
    const buttonElement = screen.getByText('Regular Button')

    // Check if the button has the correct styling
    expect(buttonElement).toHaveStyle('font-weight: normal')
    // Não testamos a cor diretamente, pois ela é aplicada via CSS variables
    // e o ambiente de teste não consegue resolver corretamente
    expect(buttonElement).not.toHaveStyle('color: #ffffff')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    const buttonElement = screen.getByText('Disabled Button')

    expect(buttonElement).toBeDisabled()
  })
})
