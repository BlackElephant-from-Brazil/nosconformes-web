import React from 'react'
import notFound from 'assets/not-found.png'
import { Container } from './styles'

export const NotFound = () => {
	return (
		<Container>
			<img
				src={notFound}
				alt="Demonstrativo de que nada foi encontrado no sistema com a busca atual."
			/>
			<h4>Desculpe!</h4>
			<span>Não encontramos no sistema o que você busca ;(</span>
		</Container>
	)
}
