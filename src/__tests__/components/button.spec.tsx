import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Button } from 'components/button'
import '@testing-library/jest-dom'

describe('Button', () => {
	afterEach(() => {
		cleanup()
	})

	test('renders button with correct text and class', () => {
		render(
			<Button text="Click me" className="custom-class" variant="primary" />,
		)
		const button = screen.getByText('Click me')
		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('custom-class')
	})

	test('renders button with primary style', () => {
		render(<Button text="Click me" variant="primary" />)
		const button = screen.getByText('Click me')
		const buttonStyles = getComputedStyle(button)
		expect(buttonStyles.background).toBe('rgb(31, 76, 213)')
	})

	test('renders button with secondary style', () => {
		render(<Button text="Click me" variant="secondary" />)
		const button = screen.getByText('Click me')
		const buttonStyles = getComputedStyle(button)
		expect(buttonStyles.background).toBe('rgb(255, 255, 255)')
	})

	test('renders button with primary-orange style', () => {
		render(<Button text="Click me" variant="primary-orange" />)
		const button = screen.getByText('Click me')
		const buttonStyles = getComputedStyle(button)
		expect(buttonStyles.background).toBe('rgb(255, 153, 28)')
	})

	test('renders button with danger style', () => {
		render(<Button text="Click me" variant="danger" />)
		const button = screen.getByText('Click me')
		const buttonStyles = getComputedStyle(button)
		expect(buttonStyles.background).toBe('rgb(255, 33, 99)')
	})

	test('calls onClick function when button is clicked', () => {
		const onClick = jest.fn()
		render(<Button text="Click me" onClick={onClick} variant="primary" />)
		const button = screen.getByText('Click me')
		fireEvent.click(button)
		expect(onClick).toHaveBeenCalled()
	})

	test('renders button with Excel icon when style is excel', () => {
		render(<Button text="Download Excel" variant="excel" />)
		const button = screen.getByText('Download Excel')
		const icon = screen.getByAltText('Ícone do excel')
		expect(button).toBeInTheDocument()
		const buttonStyles = getComputedStyle(button)
		expect(buttonStyles.background).toBe('rgb(29, 112, 68)')
		expect(icon).toBeInTheDocument()
	})

	test('sets data-testid attribute on button', () => {
		render(<Button text="Click me" testid="my-button" variant="primary" />)
		const button = screen.getByTestId('my-button')
		expect(button).toBeInTheDocument()
	})
})
