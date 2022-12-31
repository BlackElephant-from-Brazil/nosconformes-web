import React, { useState } from 'react'
import { Container, LeftSide, RightSide } from './styles'
import nosconformesRoundedLogo from '../../../../assets/nosconformes-rounded-logo.png'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'
import Mail from '@mui/icons-material/Mail'
import Lock from '@mui/icons-material/Lock'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../../components/Input'
import { ErrorMessage } from '../../../../components/ErrorMessage'
import { Button } from '../../../../components/Button'

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

	const onLogin = (): void => {
		setLoginError({
			mail: false,
			pass: false
		})

		if(!mail || !pass) {
			setLoginError({
				mail: !mail,
				pass: !pass
			})
			setTextError(`${!mail ? errors.unfilledMail : ''} ${!pass ? errors.unfilledPass : ''}`)
			return
		}

		if(!verifyMail()) {
			setLoginError({
				mail: true,
				pass: true
			})
			setTextError(errors.invalidMail)
			return
		}

		const validAccess = false

		if(!validAccess) { // if email/pass are incorrect
			setLoginError({
				mail: true,
				pass: true
			})
			setTextError(errors.invalidUser)
			return
		}

		/**
		 * Redirect to next page
		 */
	}

	const recoverPassword = (): void => {
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
					<Input value={mail} onChange={setMail} error={loginError.mail} label='Email' name='email' startAdornmentIcon={<Mail />} type="email" />
					<Input value={pass} onChange={setPass} error={loginError.pass} label='Senha' name='password' startAdornmentIcon={<Lock />} type="password" />
					<a
						onClick={recoverPassword}
						role="button"
					>Esqueci a senha</a>
					<ErrorMessage
						className={'login-error'}
						icon={<ReportGmailerrorredIcon />}
						text={textError}
						error={loginError.mail || loginError.pass}
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