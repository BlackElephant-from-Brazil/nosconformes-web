import React, { useState } from 'react'
import { Container, LeftSide, RightSide } from './styles'
import nosconformesRoundedLogo from '../../../../assets/nosconformes-rounded-logo.png'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'
import Mail from '@mui/icons-material/Mail'
import Lock from '@mui/icons-material/Lock'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../../components/Input'
import { Alert, ALERT_TYPE_ERROR } from '../../../../components/Alert'
import { Button } from '../../../../components/Button'
import api from '../../../../api'
import { useAuth } from '../../../../hooks/authentication.hook'

type loginErrorType = {
	mail: boolean,
	pass: boolean
}

const errors = {
	invalidMail: 'O email precisa ser um email válido.',
	unfilledMail: 'O email precisa estar preenchido.',
	unfilledPass: 'A senha precisa estar preenchida.',
	invalidUser: 'Email ou senha inválidos. Clique em “Esqueci a senha” ou por favor digite novamente.',
}

const Login: React.FC = () => {
	const navigate = useNavigate()
	const { signIn } = useAuth()

	const [loginError, setLoginError] = useState<loginErrorType>({
		mail: false,
		pass: false
	})
	const [textError, setTextError] = useState<string>('')
	const [mail, setMail] = useState<string>('')
	const [pass, setPass] = useState<string>('')

	const verifyMail = (): boolean => {
		return /^.+@.+[.].+$/g.test(mail)
	}

	/**
	 * error order:
	 * -> unfilled 	(ex: '')
	 * -> invalid 	(ex: 'dsl@')
	 * -> incorrect (ex: incorrect/inexistent mail or incorrect password)
	 */

	const onLogin = async () => {
		await signIn({
			email: mail,
			password: pass
		})
		navigate('/dashboard')
		// const response = api.post('auth/login', {

		// })
		// 	setLoginError({
		// 		mail: false,
		// 		pass: false
		// 	})

		// 	if(!mail || !pass) {
		// 		setLoginError({
		// 			mail: !mail,
		// 			pass: !pass
		// 		})
		// 		setTextError(`${!mail ? errors.unfilledMail : ''} ${!pass ? errors.unfilledPass : ''}`)
		// 		return
		// 	}

		// 	if(!verifyMail()) {
		// 		setLoginError({
		// 			mail: true,
		// 			pass: true
		// 		})
		// 		setTextError(errors.invalidMail)
		// 		return
		// 	}

		// 	const validAccess = false

		// 	if(!validAccess) { // if email/pass are incorrect
		// 		setLoginError({
		// 			mail: true,
		// 			pass: true
		// 		})
		// 		setTextError(errors.invalidUser)
		// 		return
		// }

		/**
		 * Redirect to next page
		 */
	}

	const handleRecoverPasswordCLick = (): void => {
		if(!verifyMail()) {
			setLoginError({
				...loginError,
				mail: true
			})
			setTextError(mail ? errors.invalidMail : errors.unfilledMail)
			return
		}

		navigate('/mudar-senha', {
			state: {
				mail
			}
		})
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
				<form>
					<Input value={mail} onChange={setMail} error={loginError.mail} label='Email' name='email' startAdornmentIcon={<Mail />} type="email" placeholder='Digite aqui seu email...' />
					<Input value={pass} onChange={setPass} error={loginError.pass} label='Senha' name='password' startAdornmentIcon={<Lock />} type="password" placeholder='Insira sua senha...' />
					<a
						onClick={handleRecoverPasswordCLick}
						role="button"
					>Esqueci a senha</a>
					<Alert
						text={textError}
						error={loginError.mail || loginError.pass}
						type={ALERT_TYPE_ERROR}
					/>
					<Button onClick={onLogin} text='Login' buttonStyle='primary' />
				</form>
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