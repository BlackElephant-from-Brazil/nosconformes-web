import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { RecoverPassword } from '../../../../modules/login/pages/recover-password'

const mockedUseNavigate = jest.fn()
// const mockedUseLocation = jest.fn().mockReturnValue({ state: { email: 'valid-user@email.com' } })

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
	useLocation: () => {
		return {
			state: {
				email: 'valid-user@email.com'
			}
		}
	},
}))

let recoverPasswordPageElement: RenderResult

describe('<RecoverPassword />', () => {

	beforeEach(() => {
		recoverPasswordPageElement = render(<RecoverPassword />)
	})

	it('should be able to render RecoverPassword page correctly', async () => {
		expect(await recoverPasswordPageElement.findByText('Importe perguntas do excel para enviar para seu cliente')).toBeInTheDocument()
		expect(await recoverPasswordPageElement.findByText('Tudo certo! ✔')).toBeInTheDocument()
		expect(await recoverPasswordPageElement.findByText('Encaminhamos um email com às instruções para o endereço de email:')).toBeInTheDocument()
		expect(await recoverPasswordPageElement.findByText('va**********@email.com')).toBeInTheDocument()
		expect(await recoverPasswordPageElement.findByText('Todos os direitos reservados ©')).toBeInTheDocument()
	})

	it('should be able to back to login page after click in back button', async () => {
		const backButton = await recoverPasswordPageElement.findByTestId('back-button')
		await waitFor(() => {
			fireEvent.click(backButton)
		})

		expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
		expect(mockedUseNavigate).toHaveBeenCalledWith('/login')
	})

	afterEach(() => {
		cleanup()
	})
})