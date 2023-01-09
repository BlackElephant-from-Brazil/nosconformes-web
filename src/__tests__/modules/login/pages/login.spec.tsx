import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { Login } from '../../../../modules/login/pages/Login'

jest.mock('../../../../hooks/authentication.hook', () => {
	return {
		useAuth: () => {
			return {
				signIn: jest.fn()
			}
		}
	}
})

jest.mock('react-router-dom', () => {
	return { useNavigate: jest.fn() }
})

describe('<Login />', () => {

	it('should be able to render login page correctly', async () => {
		const element = render(<Login />)

		expect(await element.findByText('Importe perguntas do excel para enviar para seu cliente')).toBeInTheDocument()
		expect(await element.findByText('Bem vindo! 👋')).toBeInTheDocument()
		expect(await element.findByLabelText('Email')).toBeInTheDocument()
		expect(await element.findByLabelText('Senha')).toBeInTheDocument()
		expect(await element.findByText('Esqueci a senha')).toBeInTheDocument()
		expect(await element.findByText('Login')).toBeInTheDocument()
		expect(await element.findByText('Todos os direitos reservados ©')).toBeInTheDocument()
	})

	afterEach(() => {
		cleanup()
	})
})