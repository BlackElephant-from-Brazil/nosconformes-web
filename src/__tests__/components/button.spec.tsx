import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { Button } from '../../components/button'

describe('<Button />', () => {
	it('should be able to render correctly a button', async () => {
		const element = render(<Button text="Salvar" variant="primary" />)
		expect(element.getByText('Salvar')).toBeInTheDocument()
	})

	afterEach(() => {
		cleanup()
	})
})
