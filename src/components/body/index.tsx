import React from 'react'
import { Container } from './styles'

type BodyProps = {
	children: React.ReactNode
	cardContext?: boolean
}

export const Body: React.FC<BodyProps> = ({ children, cardContext }) => {
	return (
		<Container cardContext={cardContext}>
			<div className="wrapper">{children}</div>
		</Container>
	)
}
