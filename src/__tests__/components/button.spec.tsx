import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { Button } from '../../components/Button'

describe('<Button />', () => {
	it('should be able to render correctly a button', async () => {
		const element = render(<Button text="Salvar" buttonStyle="primary" />)
		expect(element.getByText('Salvar')).toBeInTheDocument()
	})

	afterEach(() => {
		cleanup()
	})
})
