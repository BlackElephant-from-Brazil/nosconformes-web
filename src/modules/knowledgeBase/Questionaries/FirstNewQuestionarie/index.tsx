import React from 'react'
import { AddFirstNewQuestionarieButton, Container } from './styles'
import AddIcon from '@mui/icons-material/Add'

export const FirstNewQuestionarie: React.FC = () => {
	return (
		<Container>
			<AddFirstNewQuestionarieButton>
				<p>
					Cadastrar novo questionário
				</p>
				<AddIcon />
			</AddFirstNewQuestionarieButton>
		</Container>
	)
}