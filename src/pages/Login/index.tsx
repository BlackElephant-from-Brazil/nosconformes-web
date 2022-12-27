import React from 'react'
import { Container, LeftSide, RightSide } from './styles'
import nosconformesRoundedLogo from '../../assets/nosconformes-rounded-logo.png'
import ncHorizontal from '../../assets/nc-horizontal.png'
import dm11Logotipo from '../../assets/dm11-logotipo.png'
import dashboardLogin from '../../assets/dashboard-login.png'
import { Button } from '../../components/Button'
import Mail from '@mui/icons-material/Mail'
import Lock from '@mui/icons-material/Lock'
import { Input } from '../../components/Input'

const Login: React.FC = () => {

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
					<Input label='Email' name='email' icon={Mail} type="email" />
					<Input label='Senha' name='password' icon={Lock} type="password" />
					<a href="#">Esqueci a senha</a>
					<Button text='Login' variant='primary' />
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