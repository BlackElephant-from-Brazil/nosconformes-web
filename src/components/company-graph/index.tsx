import React from 'react'
import { Container } from './styles'

type CompanyGraphProps = {
	points: number
}

export const CompanyGraph: React.FC<CompanyGraphProps> = ({ points }) => {
	return (
		<Container>
			<h1>{points}</h1>
		</Container>
	)
}
