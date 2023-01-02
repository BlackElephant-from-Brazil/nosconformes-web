import React, { useState } from 'react'
import { FirstNewQuestionarie } from './FirstNewQuestionarie'
import { QuestionariesList } from './QuestionariesList'

export const Questionaries: React.FC = () => {
	const [questionaries, setQuestionaries] = useState(1)

	const renderQuestionaries = () => {
		if (questionaries === 0) {
			return (
				<FirstNewQuestionarie />
			)
		} else {
			return <QuestionariesList />
		}
	}

	return (
		<>
			{
				renderQuestionaries()
			}
		</>
	)
}