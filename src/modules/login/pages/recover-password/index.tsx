import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BackButton } from 'components/back-button'
import { Container, Describer, ConfirmationContainer } from './styles'
import ncHorizontal from '../../../../assets/nc-horizontal.png'
import dm11Logotipo from '../../../../assets/dm11-logotipo.png'
import dashboardLogin from '../../../../assets/dashboard-login.png'

const RecoverPassword: React.FC = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const mail = state?.email

	const hideMail = (): string => {
		const [name, type] = mail.split('@')
		return `${name.substring(0, 2)}**********@${type}`
	}

	const handleBackToLoginPage = () => {
		navigate('/login')
	}

	return (
		<Container>
			<Describer>
				<img src={dm11Logotipo} alt="Logotipo DM11" className="dm11-logo" />
				<p>Importe perguntas do excel para enviar para seu cliente</p>
				<img
					src={dashboardLogin}
					alt="Dois computadores exibindo a tela de dashboard."
					className="dashboard-login"
				/>
			</Describer>
			<ConfirmationContainer>
				<div className="content">
					<div className="back">
						<BackButton
							handleClick={handleBackToLoginPage}
							testid="back-button"
						/>
						<p>Voltar</p>
					</div>
					<div className="message-container">
						<p className="title">Tudo certo! ✔</p>
						<p className="message">
							Encaminhamos um email com às instruções para o endereço de email:
						</p>
						<p className="mail">{hideMail()}</p>
					</div>
				</div>

				<div className="footer">
					<img src={ncHorizontal} alt="Logotipo NosConformes horizontal." />
					<p>Todos os direitos reservados ©</p>
				</div>
			</ConfirmationContainer>
		</Container>
	)
}

export { RecoverPassword }
