import React from 'react'
import { Container } from './styles'

type HeaderProps = {
	icon: JSX.Element
	title: string
}

export const Header: React.FC<HeaderProps> = ({ icon, title }) => {
	return (
		<Container>
			{icon}
			<h1>{title}</h1>
		</Container>
	)
}