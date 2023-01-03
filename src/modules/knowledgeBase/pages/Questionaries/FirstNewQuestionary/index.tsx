import React from 'react'
import { AddFirstNewQuestionaryButton, Container } from './styles'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

export const FirstNewQuestionary: React.FC = () => {
	const navigate = useNavigate()

	const handleAddNewQuestionary = () => {
		navigate('?novo-questionario')
	}

	return (
		<Container>
			<AddFirstNewQuestionaryButton onClick={handleAddNewQuestionary}>
				<p>
					Cadastrar novo questionário
				</p>
				<AddIcon />
			</AddFirstNewQuestionaryButton>
		</Container>
	)
}