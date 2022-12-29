import React from 'react'
import { Container, LeftSide, RightSide } from './styles'
import { useLocation, useNavigate } from 'react-router-dom'
import ncHorizontal from '../../assets/nc-horizontal.png'
import dm11Logotipo from '../../assets/dm11-logotipo.png'
import dashboardLogin from '../../assets/dashboard-login.png'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

const RecoverPassword: React.FC = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const mail = state?.mail

	console.log(state)
	// return <div>oioioio{state?.mail}</div>

	const hideMail = (): string => {
		const [name, type] = mail.split('@')
		return name.substring(0, 2) + '**********@' + type
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
				<div className='back' onClick={() => navigate('/login')}>
					<ArrowCircleLeftIcon />
					<p>
						Voltar
					</p>
				</div>
				<div className='message-container'>
					<p className='title'>Tudo certo! ✔</p>
					<p className='message'>Encaminhamos um email com às instruções para o endereço de email:</p>
					<p className='mail'>{hideMail()}</p>
				</div>

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

export { RecoverPassword }