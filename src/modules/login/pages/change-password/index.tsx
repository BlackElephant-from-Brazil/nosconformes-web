import React, { useRef, useState } from 'react'
import Lock from '@mui/icons-material/Lock'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Container, LeftSide, RightSide } from './styles'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dm11RoundedLogo from '../../../../assets/dm11-rounded-logo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { Alert } from '../../../../components/Alert'
import { api } from '../../../../api'

const errorMessages = {
	unfilledPassword: 'Preencha o campo de senha. ',
	unfilledPasswordConfirmation: 'Preencha o campo de confirmação da senha. ',
	invalidPassword:
		'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial. ',
	passwordsDontMatch: 'Os campos de senha e confirmação precisam ser iguais. ',
}

type ChangePasswordForm = {
	password: string
	passwordConfirmation: string
}

const ChangePassword: React.FC = () => {
	const [displayErrors, setDisplayErrors] = useState('')
	const formRef = useRef<FormHandles>(null)
	const navigate = useNavigate()

	const handleChangePasswordFormSubmit: SubmitHandler<
		ChangePasswordForm
	> = async data => {
		setDisplayErrors('')
		try {
			const schema = Yup.object().shape({
				password: Yup.string()
					.required(errorMessages.unfilledPassword)
					.matches(
						/^(?=.*[a-z])(?=.*[0-9].*)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
						{
							message: errorMessages.invalidPassword,
						},
					),
				passwordConfirmation: Yup.string()
					.required(errorMessages.unfilledPasswordConfirmation)
					.oneOf([Yup.ref('password'), null], errorMessages.passwordsDontMatch),
			})

			await schema.validate(data, {
				abortEarly: false,
			})
		} catch (errors) {
			let allErrors = ''
			if (errors instanceof Yup.ValidationError) {
				const validationErrors: { [key: string]: string } = {}
				errors.inner.forEach(error => {
					if (error.path) validationErrors[error.path] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				setDisplayErrors(allErrors)
				return
			}
			console.log(errors)
			return
		}

		try {
			await api.post('/auth/change-password', {
				email: 'valid@email.com',
				password: data.password,
				passwordConfirmation: data.passwordConfirmation,
				_protocol: 'valid-protocol',
			})
		} catch (serverErrors) {
			console.log(serverErrors)
			return
		}
		navigate('/login')
	}

	return (
		<Container>
			<LeftSide>
				<img src={dm11Logotipo} alt="Logotipo DM11" className="dm11-logo" />
				<p>Importe perguntas do excel para enviar para seu cliente</p>
				<img
					src={dashboardLogin}
					alt="Dois computadores exibindo a tela de dashboard."
					className="dashboard-login"
				/>
			</LeftSide>
			<RightSide>
				<img
					src={dm11RoundedLogo}
					alt="Logotipo DM11"
					className="dm11-rounded-logo"
				/>
				<p className="welcome">Bem vindo! 👋</p>
				<Form onSubmit={handleChangePasswordFormSubmit} ref={formRef}>
					<p className="pass-advise">
						Digite sua nova senha nos campos abaixo:
					</p>
					<Input
						label="Senha"
						name="password"
						startAdornmentIcon={<Lock />}
						type="password"
						placeholder="Digite a sua nova senha..."
					/>
					<Input
						label="Confirme sua senha"
						name="passwordConfirmation"
						startAdornmentIcon={<Lock />}
						type="password"
						placeholder="Confirme a senha digitada..."
					/>
					<Alert text={displayErrors} type="error" />
					<Button text="Atualizar senha" buttonStyle="primary" type="submit" />
				</Form>

				<div className="footer">
					<img src={ncHorizontal} alt="Logotipo NosConformes horizontal." />
					<p>Todos os direitos reservados ©</p>
				</div>
			</RightSide>
		</Container>
	)
}

export { ChangePassword }
