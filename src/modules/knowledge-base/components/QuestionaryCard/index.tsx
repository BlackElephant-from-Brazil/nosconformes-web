import React from 'react'
import { Container } from './styles'

export type Client = {
	_eq: string
	name: string
	photo: string
}

type QuestionaryCardProps = {
	title: string
	clients: Client[]
}

export const QuestionaryCard: React.FC<QuestionaryCardProps> = ({
	title,
	clients,
}) => {
	return (
		<Container>
			<h2>{title}</h2>
			<h3>Clientes</h3>
			<div className="clients-list">
				{clients.map(client => {
					return (
						<div key={client._eq}>
							<img src={client.photo} alt="Logo do cliente" />
							<p>{client.name}</p>
						</div>
					)
				})}
			</div>
		</Container>
	)
}
