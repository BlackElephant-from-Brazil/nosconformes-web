import React from 'react'
import { Container } from './styles'

type HeaderProps = {
	icon: JSX.Element
	title: string
}

const Header: React.FC<HeaderProps> = ({ icon, title }) => {
	return (
		<Container>
			{icon}
			<h1>{title}</h1>
		</Container>
	)
}

export { Header }