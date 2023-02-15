import React from 'react'
import { Container } from './styles'

type HeaderProps = {
	icon: JSX.Element
	title: string
}

export const Header: React.FC<HeaderProps> = ({ icon, title }) => {
	return (
		<Container>
			<div className="content">
				<div className="title">
					{icon}
					<h1>{title}</h1>
				</div>
			</div>
		</Container>
	)
}
