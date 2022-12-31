import React, { useState } from 'react'
import { Container, LeftSide, RightSide } from './styles'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dm11RoundedLogo from '../../../../assets/dm11-rounded-logo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import Lock from '@mui/icons-material/Lock'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { ErrorMessage } from '../../../../components/ErrorMessage'

type passErrorType = {
	pass: boolean,
	confirm: boolean
}

const errors = {
	unfilledField: 'Todos os campos precisam estar preenchidos',
	invalidPass: 'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.',
	diffPass: 'Os campos de senha e confirmação precisam ser iguais.',
}

const ChangePassword: React.FC = () => {
	const [pass, setPass] = useState<string>('')
	const [confirm, setConfirm] = useState<string>('')
	const [passError, setPassError] = useState<passErrorType>({
		pass: false,
		confirm: false
	})
	const [textError, setTextError] = useState<string>('')

	const isValidPass = (): boolean => {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(pass)
	}

	/**
	 * error order:
	 * -> unfilled 	(ex: '')
	 * -> invalid 	(ex: '123456')
	 * -> different (ex: different pass and confirm)
	 */

	const onChangePassword = (): void => {
		setPassError({
			pass: false,
			confirm: false
		})

		if(!pass || !confirm) {
			setPassError({
				pass: !pass,
				confirm: !confirm
			})
			setTextError(errors.unfilledField)
			return
		}

		if(!isValidPass()) {
			setPassError({
				pass: true,
				confirm: true
			})
			setTextError(errors.invalidPass)
			return
		}

		if(pass != confirm) {
			setPassError({
				pass: true,
				confirm: true
			})
			setTextError(errors.diffPass)
		}

		/**
		 * Change password in the back-end
		 */
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
				<img src={dm11RoundedLogo} alt="Logotipo DM11" className='dm11-rounded-logo' />
				<p className="welcome">Bem vindo! 👋</p>
				<form>
					<p className="pass-advise">Digite sua nova senha nos campos abaixo:</p>
					<Input value={pass} onChange={setPass} error={passError.pass} label='Senha' name='password' icon={Lock} type="password" />
					<Input value={confirm} onChange={setConfirm} error={passError.confirm} label='Confirme sua senha' name='confirm-password' icon={Lock} type="password" />
					<ErrorMessage
						className={'pass-error'}
						icon={<ReportGmailerrorredIcon />}
						text={textError}
						error={passError.pass || passError.confirm}
					/>
					<Button onClick={onChangePassword} text='Atualizar sua senha' buttonStyle='primary' />
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

export { ChangePassword }