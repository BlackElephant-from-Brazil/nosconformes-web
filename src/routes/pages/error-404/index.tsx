import React from 'react'
import error404Image from 'assets/error-404-image.png'
import { Container } from './styles'

export const Error404: React.FC = () => {
	return (
		<Container>
			<div className="top">
				<h1>404</h1>
				<img
					src={error404Image}
					alt="imagem de escritório vazio para ilustrar a página de erro 404."
				/>
			</div>
			<div className="bottom">
				<h2>Oooops!</h2>
				<h3>Página não encontrada</h3>
				<p>Essa página não existe ou foi removida! Volte para a home</p>
			</div>
		</Container>
	)
}
