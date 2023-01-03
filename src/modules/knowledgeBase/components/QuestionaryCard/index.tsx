import React from 'react'
import { Container } from './styles'

export type Client = {
	name: string
	photo: string
}

type QuestionaryCardy = {
	title: string
	clients: Client[]
}

export const QuestionaryCardy: React.FC<QuestionaryCardy> = ({ title, clients }) => {
	return (
		<Container>
			<h2>
				{title}
			</h2>
			<h3>
				Clientes
			</h3>
			<div className="clients-list">
				{
					clients.map((client, i) => {
						return (
							<div key={i}>
								<img src={client.photo} alt="Logo do cliente" />
								<p>{client.name}</p>
							</div>
						)
					})
				}
			</div>
		</Container>
	)
}