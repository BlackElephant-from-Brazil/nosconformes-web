import React, { useRef, useState } from 'react'
import { Container, LeftSide, RightSide } from './styles'
import nosconformesRoundedLogo from '../../../../assets/nosconformes-rounded-logo.png'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'
import Mail from '@mui/icons-material/Mail'
import Lock from '@mui/icons-material/Lock'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../../components/Input'
import { Alert } from '../../../../components/Alert'
import { Button } from '../../../../components/Button'
import { useAuth } from '../../../../hooks/authentication.hook'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles, SubmitHandler } from '@unform/core'


const errorMessages = {
	invalidMail: 'O email precisa ser um email válido. ',
	unfilledMail: 'O email precisa estar preenchido. ',
	unfilledPass: 'A senha precisa estar preenchida. ',
}

type LoginForm = {
	email: string
	password: string
}

const Login: React.FC = () => {
	const navigate = useNavigate()
	const { signIn } = useAuth()
	const formRef = useRef<FormHandles>(null)

	const [displayError, setDisplayError] = useState<string>('')

	const handleSubmitFormLogin: SubmitHandler<LoginForm> = async (data) => {
		setDisplayError('')
		try {
			const schema = Yup.object().shape({
				email: Yup.string().email(errorMessages.invalidMail).required(errorMessages.unfilledMail),
				password: Yup.string().required(errorMessages.unfilledPass)
			})

			await schema.validate(data, {
				abortEarly: false
			})


		} catch (errors) {
			let allErrors = ''
			if (errors instanceof Yup.ValidationError) {

				const validationErrors: {[key: string]: string} = {}
				errors.inner.forEach(error => {
					if(error.path)
						validationErrors[error.path] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				setDisplayError(allErrors)
				return
			} else {
				console.log(errors)
				return
			}
		}

		try {
			await signIn({
				email: data.email,
				password: data.password
			})
			navigate('/dashboard')
		} catch (err) {
			console.log(err)
			return
			//TODO: COLOCAR UM TOAST AQUI QUE O USUÁRIO É INVÁLIDO
		}
	}

	const handleRecoverPasswordCLick = async () => {

		setDisplayError('')
		const emailValue = formRef.current?.getFieldValue('email')
		try {
			const schema = Yup.object().shape({
				email: Yup.string().email(errorMessages.invalidMail).required(errorMessages.unfilledMail),
			})

			await schema.validate({ email: emailValue }, {
				abortEarly: false
			})
		} catch (err) {
			let allErrors = ''

			if (err instanceof Yup.ValidationError) {

				const validationErrors: {[key: string]: string} = {}
				err.inner.forEach(error => {
					if(error.path)
						validationErrors[error.path] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				setDisplayError(allErrors)
				return
			} else {
				console.log(err)
				return
			}
		}
		navigate('/recuperar-senha', {
			state: {
				email: emailValue
			}
		})
		// TODO: SÓ ENTRARÁ NA PÁGINA DE MUDAR A SENHA CASO ENTRE PELO LINK COM UM PROTOCOLO VÁLIDO

	}

	return (
		<Container>
			<LeftSide>
				<img src={dm11Logotipo} alt="Logotipo DM11" className='dm11-logo' />
				<p>
					Importe perguntas do excel para enviar para seu cliente
				</p>
				<img src={dashboardLogin} alt="Dois computadores exibindo a tela de dashboard." className='dashboard-login' />
			</LeftSide>
			<RightSide>
				<img src={nosconformesRoundedLogo} alt="Logotipo da empresa DM11" className='dm11-logo'/>
				<p className="welcome">Bem vindo! 👋</p>
				<Form ref={formRef} onSubmit={handleSubmitFormLogin} autoComplete="off">

					<Input label='Email' name='email' startAdornmentIcon={<Mail />} type="text" placeholder='Digite aqui seu email...' />
					<Input label='Senha' name='password' startAdornmentIcon={<Lock />} type="password" placeholder='Insira sua senha...' />
					<a
						onClick={handleRecoverPasswordCLick}
						role="button"
					>Esqueci a senha</a>
					<Alert
						text={displayError}
						type='error'
					/>
					<Button type="submit" text='Login' buttonStyle='primary' />
				</Form>
				<div className='footer'>
					<img src={ncHorizontal} alt="Logotipo NosConformes horizontal." />
					<p>
						Todos os direitos reservados ©
					</p>
				</div>
			</RightSide>
		</Container>
	)
}

export { Login }