import React from 'react'
import '@testing-library/jest-dom'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor,
} from '@testing-library/react'
import { ChangePassword } from '../../../../modules/login/pages/change-password'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
}))

const mockedAxiosPost = jest.fn()

jest.mock('../../../../api', () => {
	return {
		api: {
			post: (...args: any) => {
				return mockedAxiosPost(...args)
			},
		},
	}
})

let changePasswordPageElement: RenderResult

describe('<ChangePassword />', () => {
	beforeEach(() => {
		changePasswordPageElement = render(<ChangePassword />)
	})

	it('should be able to render ChangePassword page correctly', async () => {
		expect(
			await changePasswordPageElement.findByText(
				'Importe perguntas do excel para enviar para seu cliente',
			),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByText('Bem vindo! 👋'),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByText(
				'Digite sua nova senha nos campos abaixo:',
			),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByLabelText('Senha'),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByLabelText('Confirme sua senha'),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByText('Atualizar senha'),
		).toBeInTheDocument()
		expect(
			await changePasswordPageElement.findByText(
				'Todos os direitos reservados ©',
			),
		).toBeInTheDocument()
	})

	describe('field validations', () => {
		describe('8 letters, 1 uppercase character, 1 lowercase character and 1 number', () => {
			it('should not be able if not has at least 8 characters', async () => {
				const invalidPassword = '1nV@lid'
				const passwordInput = await changePasswordPageElement.findByLabelText(
					'Senha',
				)
				const confirmPasswordInput =
					await changePasswordPageElement.findByLabelText('Confirme sua senha')

				fireEvent.change(passwordInput, {
					target: {
						value: invalidPassword,
					},
				})

				fireEvent.change(confirmPasswordInput, {
					target: {
						value: invalidPassword,
					},
				})

				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
					),
				).toBeInTheDocument()
			})

			it('should not be able if not has 1 uppercase', async () => {
				const invalidPassword = '1nv@lidpassword'
				const passwordInput = await changePasswordPageElement.findByLabelText(
					'Senha',
				)
				const confirmPasswordInput =
					await changePasswordPageElement.findByLabelText('Confirme sua senha')

				fireEvent.change(passwordInput, {
					target: {
						value: invalidPassword,
					},
				})

				fireEvent.change(confirmPasswordInput, {
					target: {
						value: invalidPassword,
					},
				})

				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
					),
				).toBeInTheDocument()
			})

			it('should not be able if not has 1 lowercase', async () => {
				const invalidPassword = '1NV@LIDPASSWORD'
				const passwordInput = await changePasswordPageElement.findByLabelText(
					'Senha',
				)
				const confirmPasswordInput =
					await changePasswordPageElement.findByLabelText('Confirme sua senha')

				fireEvent.change(passwordInput, {
					target: {
						value: invalidPassword,
					},
				})

				fireEvent.change(confirmPasswordInput, {
					target: {
						value: invalidPassword,
					},
				})

				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
					),
				).toBeInTheDocument()
			})
			it('should not be able if not has 1 number', async () => {
				const invalidPassword = 'Inv@lidPassword'
				const passwordInput = await changePasswordPageElement.findByLabelText(
					'Senha',
				)
				const confirmPasswordInput =
					await changePasswordPageElement.findByLabelText('Confirme sua senha')

				fireEvent.change(passwordInput, {
					target: {
						value: invalidPassword,
					},
				})

				fireEvent.change(confirmPasswordInput, {
					target: {
						value: invalidPassword,
					},
				})

				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
					),
				).toBeInTheDocument()
			})
		})

		describe('unfilled fields', () => {
			it('should not be able to update password if password and password confirmation field is not filled', async () => {
				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Preencha o campo de confirmação da senha. Preencha o campo de senha. Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
					),
				).toBeInTheDocument()
			})

			it('should not be able to update password if password confirmation field is not filled', async () => {
				const validPassword = 'V@l1dPassword'
				const passwordInput = await changePasswordPageElement.findByLabelText(
					'Senha',
				)

				fireEvent.change(passwordInput, {
					target: {
						value: validPassword,
					},
				})

				const updatePasswordbutton = await changePasswordPageElement.findByText(
					'Atualizar senha',
				)
				fireEvent.click(updatePasswordbutton)

				expect(
					await changePasswordPageElement.findByText(
						'Preencha o campo de confirmação da senha. Os campos de senha e confirmação precisam ser iguais.',
					),
				).toBeInTheDocument()
			})
		})

		it('should not be able to update if password and password validations dont match', async () => {
			const validPassword = 'V@l1dPassword'
			const passwordInput = await changePasswordPageElement.findByLabelText(
				'Senha',
			)
			const passwordConfirmationInput =
				await changePasswordPageElement.findByLabelText('Confirme sua senha')

			fireEvent.change(passwordInput, {
				target: {
					value: validPassword,
				},
			})

			fireEvent.change(passwordConfirmationInput, {
				target: {
					value: 'wrong-confirmation',
				},
			})

			const updatePasswordbutton = await changePasswordPageElement.findByText(
				'Atualizar senha',
			)
			fireEvent.click(updatePasswordbutton)

			expect(
				await changePasswordPageElement.findByText(
					'Os campos de senha e confirmação precisam ser iguais.',
				),
			).toBeInTheDocument()
		})
	})

	it('should be able to update password if password and password confirmation match and password is a valid password', async () => {
		const validPassword = 'V@l1dPassword'
		const passwordInput = await changePasswordPageElement.findByLabelText(
			'Senha',
		)
		const passwordConfirmationInput =
			await changePasswordPageElement.findByLabelText('Confirme sua senha')

		fireEvent.change(passwordInput, {
			target: {
				value: validPassword,
			},
		})

		fireEvent.change(passwordConfirmationInput, {
			target: {
				value: validPassword,
			},
		})

		const updatePasswordbutton = await changePasswordPageElement.findByText(
			'Atualizar senha',
		)
		fireEvent.click(updatePasswordbutton)

		await waitFor(() => {
			expect(mockedAxiosPost).toHaveBeenCalledTimes(1)
			expect(mockedAxiosPost).toHaveBeenCalledWith('/auth/change-password', {
				_protocol: 'valid-protocol',
				email: 'valid@email.com',
				password: validPassword,
				passwordConfirmation: validPassword,
			})
			expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
			expect(mockedUseNavigate).toHaveBeenCalledWith('/login')
		})
	})

	afterEach(() => {
		cleanup()
	})
})
