import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Container } from './styles'

type Question = {
	_eq: string
	question: string
}

type SelectQuestionProps = {
	questions: Question[]
	selectedQuestionId: string
	onSelect: (questionId: string) => void
}

export const SelectQuestion: React.FC<SelectQuestionProps> = ({
	questions,
	selectedQuestionId,
	onSelect,
}) => {
	const [selectedQuestion, setSelectedQuestion] = React.useState<Question>(
		questions[0],
	)
	const [isExpanded, setIsExpanded] = React.useState(false)

	useEffect(() => {
		const currentQuestion = questions.find(
			question => question._eq === selectedQuestionId,
		)
		if (currentQuestion) {
			setSelectedQuestion(currentQuestion)
		}
	}, [questions, selectedQuestionId])

	return (
		<Container>
			<h3>{selectedQuestion.question}</h3>
			<ExpandMoreIcon />
		</Container>
	)
}
