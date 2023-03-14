import React from 'react'
import error404Image from 'assets/error-404-image.png'
import { useNavigate } from 'react-router-dom'
import { Container } from './styles'

export const ErrorHandler: React.FC = () => {
	const navigate = useNavigate()
	const handleOpenSupportPageButtonClick = () => {
		navigate('/suporte')
	}

	return (
		<Container>
			<div className="top">
				<h1>ERRO!</h1>
				<img
					src={error404Image}
					alt="imagem de escritório vazio para ilustrar a página de erro."
				/>
			</div>
			<div className="bottom">
				<h2>Oooops!</h2>
				<h3>Ocorreu um erro no sistema</h3>
				<p>
					Por favor tente mais tarde ou entre em contato com o suporte{' '}
					<a onClick={handleOpenSupportPageButtonClick} role="presentation">
						clicando aqui
					</a>
					.
				</p>
			</div>
		</Container>
	)
}
