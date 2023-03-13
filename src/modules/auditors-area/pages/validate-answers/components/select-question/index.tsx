import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Question } from 'interfaces/question.type'
import { Container } from './styles'

type SelectQuestionProps = {
	questions: Question[]
	selectedQuestion: Question
	onSelect: (question: Question) => void
}

export const SelectQuestion: React.FC<SelectQuestionProps> = ({
	questions,
	selectedQuestion,
	onSelect,
}) => {
	const [isExpanded, setIsExpanded] = React.useState(false)

	const toggleExpand = () => {
		setIsExpanded(!isExpanded)
	}

	const handleSelectQuestion = (questionId: string) => {
		toggleExpand()
		const userSelectedQuestion = questions.find(
			question => question._eq === questionId,
		)
		if (!userSelectedQuestion) return
		onSelect(userSelectedQuestion)
	}

	return (
		<Container isExpanded={isExpanded}>
			<div
				className="selected-question"
				onClick={toggleExpand}
				role="presentation"
			>
				{selectedQuestion && <h3>{selectedQuestion.question}</h3>}
				<ExpandMoreIcon />
			</div>
			<div className="question-list">
				{questions.map(question => (
					<h3
						onClick={() => handleSelectQuestion(question._eq)}
						role="presentation"
					>
						{question.question}
					</h3>
				))}
			</div>
		</Container>
	)
}
