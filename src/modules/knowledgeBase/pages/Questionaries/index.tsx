import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FirstNewQuestionary } from './FirstNewQuestionary'
import { NewQuestionary } from './NewQuestionary'
import { QuestionariesList } from './QuestionariesList'
import { Container } from './styles'

export const Questionaries: React.FC = () => {
	const [questionaries, setQuestionaries] = useState(1)
	const navigate = useNavigate()
	const location = useLocation()

	const handleOpenAddNewQuestionary = () => {
		navigate('?novo-questionario')
	}

	const renderQuestionaries = () => {
		const query = location.search

		if ('?novo-questionario' === query) {
			return <NewQuestionary />
		}
		if (questionaries === 0) {
			return (
				<FirstNewQuestionary />
			)
		} else {
			console.log(query)
			return <QuestionariesList openAddNewQuestionary={handleOpenAddNewQuestionary} />
		}
	}

	return (
		<Container>
			{renderQuestionaries()}
		</Container>
	)

}