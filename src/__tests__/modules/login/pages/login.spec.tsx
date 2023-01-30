import React from 'react'
import '@testing-library/jest-dom'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor,
} from '@testing-library/react'
import { Login } from '../../../../modules/login/pages/login'

const mockedSignIn = jest.fn()

jest.mock('../../../../hooks/authentication.hook', () => {
	return {
		useAuth: () => {
			return {
				signIn: mockedSignIn,
			}
		},
	}
})

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
}))

let loginPageElement: RenderResult

describe('<Login />', () => {
	beforeEach(() => {
		loginPageElement = render(<Login />)
	})

	it('should be able to render login page correctly', async () => {
		expect(
			await loginPageElement.findByText(
				'Importe perguntas do excel para enviar para seu cliente',
			),
		).toBeInTheDocument()
		expect(
			await loginPageElement.findByText('Bem vindo! 👋'),
		).toBeInTheDocument()
		expect(await loginPageElement.findByLabelText('Email')).toBeInTheDocument()
		expect(await loginPageElement.findByLabelText('Senha')).toBeInTheDocument()
		expect(
			await loginPageElement.findByText('Esqueci a senha'),
		).toBeInTheDocument()
		expect(await loginPageElement.findByText('Login')).toBeInTheDocument()
		expect(
			await loginPageElement.findByText('Todos os direitos reservados ©'),
		).toBeInTheDocument()
	})

	describe('forget password button click', () => {
		it('should not be able to change password if email is not filled', async () => {
			const forgetPasswordButton = await loginPageElement.findByText(
				'Esqueci a senha',
			)
			fireEvent.click(forgetPasswordButton)

			expect(
				await loginPageElement.findByText('O email precisa estar preenchido.'),
			).toBeInTheDocument()
		})

		it('should not be able to change password if email is not valid', async () => {
			const emailInput = await loginPageElement.findByLabelText('Email')
			fireEvent.change(emailInput, {
				target: {
					value: 'invalid-email',
				},
			})
			const forgetPasswordButton = await loginPageElement.findByText(
				'Esqueci a senha',
			)
			fireEvent.click(forgetPasswordButton)

			expect(
				await loginPageElement.findByText(
					'O email precisa ser um email válido.',
				),
			).toBeInTheDocument()
		})

		it('should be able to change get a recovery password email if email is valid', async () => {
			const emailInput = await loginPageElement.findByLabelText('Email')
			const validEmail = 'valid@email.com'
			fireEvent.change(emailInput, {
				target: {
					value: validEmail,
				},
			})
			const forgetPasswordButton = await loginPageElement.findByText(
				'Esqueci a senha',
			)
			fireEvent.click(forgetPasswordButton)
			await waitFor(() => {
				expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
				expect(mockedUseNavigate).toHaveBeenCalledWith('/recuperar-senha', {
					state: { email: validEmail },
				})
			})
		})
	})

	describe('login button click', () => {
		it('should not be able to login if email and password fields is not filled', async () => {
			const loginButton = await loginPageElement.findByText('Login')
			fireEvent.click(loginButton)
			expect(
				await loginPageElement.findByText(
					'O email precisa estar preenchido. A senha precisa estar preenchida.',
				),
			).toBeInTheDocument()
		})

		it('should not be able to login if email field is not valid', async () => {
			const loginButton = await loginPageElement.findByText('Login')
			const emailInput = await loginPageElement.findByLabelText('Email')
			fireEvent.change(emailInput, {
				target: {
					value: 'invalid-email',
				},
			})
			fireEvent.click(loginButton)
			expect(
				await loginPageElement.findByText(
					'O email precisa ser um email válido. A senha precisa estar preenchida.',
				),
			).toBeInTheDocument()
		})

		it('should not be able to login if password is not filled', async () => {
			const loginButton = await loginPageElement.findByText('Login')
			const emailInput = await loginPageElement.findByLabelText('Email')
			fireEvent.change(emailInput, {
				target: {
					value: 'valid@email.com',
				},
			})
			fireEvent.click(loginButton)
			expect(
				await loginPageElement.findByText('A senha precisa estar preenchida.'),
			).toBeInTheDocument()
		})

		it('should be able to login if email and password been filled correctly', async () => {
			const loginButton = await loginPageElement.findByText('Login')
			const emailInput = await loginPageElement.findByLabelText('Email')
			const passwordinput = await loginPageElement.findByLabelText('Senha')
			const validEmail = 'valid@email.com'
			const validPassword = 'valid-password'
			fireEvent.change(emailInput, {
				target: {
					value: validEmail,
				},
			})
			fireEvent.change(passwordinput, {
				target: {
					value: validPassword,
				},
			})
			fireEvent.click(loginButton)
			await waitFor(() => {
				expect(mockedSignIn).toBeCalledTimes(1)
				expect(mockedSignIn).toBeCalledWith({
					email: validEmail,
					password: validPassword,
				})
				expect(mockedUseNavigate).toHaveBeenCalledWith('/dashboard')
			})
		})
	})

	afterEach(() => {
		cleanup()
	})
})
