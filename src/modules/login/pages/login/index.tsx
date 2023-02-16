import React, { useRef, useState } from 'react'
import nosconformesRoundedLogo from 'assets/nosconformes-rounded-logo.png'
import ncHorizontal from 'assets/nc-horizontal.png'
import dm11Logotipo from 'assets/dm11-logotipo.png'
import dashboardLogin from 'assets/dashboard-login.png'
import Mail from '@mui/icons-material/Mail'
import Lock from '@mui/icons-material/Lock'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'components/alert'
import { Button } from 'components/button'
import { useAuth } from 'hooks/authentication.hook'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Input } from 'components/input'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { handleYupErrors } from 'utils/handle-yup-errors'
import { Container, Describer, FormLogin } from './styles'

const errorMessages = {
	invalidMail: 'O email precisa ser um email válido. ',
	unfilledMail: 'O email precisa estar preenchido. ',
	unfilledPass: 'A senha precisa estar preenchida. ',
}

type LoginForm = {
	email: string
	password: string
}

export const Login: React.FC = () => {
	const navigate = useNavigate()
	const { signIn } = useAuth()
	const formRef = useRef<FormHandles>(null)

	const [displayError, setDisplayError] = useState<string>('')

	const handleSubmitFormLogin: SubmitHandler<LoginForm> = async data => {
		setDisplayError('')
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.email(errorMessages.invalidMail)
					.required(errorMessages.unfilledMail),
				password: Yup.string().required(errorMessages.unfilledPass),
			})

			await schema.validate(data, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayError)
		}

		try {
			await signIn({
				email: data.email,
				password: data.password,
			})
			navigate('/empresas')
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleRecoverPasswordCLick = async () => {
		setDisplayError('')
		const emailValue = formRef.current?.getFieldValue('email')
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.email(errorMessages.invalidMail)
					.required(errorMessages.unfilledMail),
			})

			await schema.validate(
				{ email: emailValue },
				{
					abortEarly: false,
				},
			)
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayError)
		}

		try {
			await api.post('/password/forgot', { email: emailValue })
		} catch (err) {
			handleApiError(err)
			return
		}
		navigate('/recuperar-senha', {
			state: {
				email: emailValue,
			},
		})
	}

	return (
		<Container>
			<Describer>
				<img src={dm11Logotipo} alt="Logotipo DM11" className="dm11-logo" />
				<h2>Importe perguntas do excel para enviar para seu cliente</h2>
				<img
					src={dashboardLogin}
					alt="Dois computadores exibindo a tela de dashboard."
					className="dashboard-login"
				/>
			</Describer>
			<FormLogin>
				<div className="content">
					<img
						src={nosconformesRoundedLogo}
						alt="Logotipo da empresa DM11"
						className="dm11-logo"
					/>
					<p className="welcome">Bem vindo! 👋</p>
					<Form
						ref={formRef}
						onSubmit={handleSubmitFormLogin}
						autoComplete="off"
					>
						<Input
							label="Email"
							name="email"
							startAdornmentIcon={<Mail />}
							type="text"
							placeholder="Digite aqui seu email..."
						/>
						<Input
							label="Senha"
							name="password"
							startAdornmentIcon={<Lock />}
							type="password"
							placeholder="Insira sua senha..."
						/>
						<a
							onClick={handleRecoverPasswordCLick}
							type="button"
							role="presentation"
						>
							Esqueci a senha
						</a>
						<Alert text={displayError} type="error" />
						<Button type="submit" text="Login" buttonStyle="primary" />
					</Form>
				</div>
				<div className="footer">
					<img src={ncHorizontal} alt="Logotipo NosConformes horizontal." />
					<p>Todos os direitos reservados ©</p>
				</div>
			</FormLogin>
		</Container>
	)
}
