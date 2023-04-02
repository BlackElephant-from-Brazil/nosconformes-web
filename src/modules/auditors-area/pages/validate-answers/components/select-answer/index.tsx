import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Question } from 'interfaces/question.type'
import { Container } from './styles'

type SelectAnswerProps = {
	questions: Question[]
	selectedQuestion?: string
	onSelect: (question: Question) => void
	nonAnsweredQuestions?: Question[]
}

export const SelectQuestion: React.FC<SelectAnswerProps> = ({
	questions,
	selectedQuestion,
	onSelect,
	nonAnsweredQuestions,
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

	if (!questions || (questions.length === 0 && !selectedQuestion)) {
		return (
			<Container isExpanded={false}>
				<div className="selected-question unclickable">
					<h3>Nenhuma pergunta foi encontrada...</h3>
				</div>
			</Container>
		)
	}

	return (
		<Container isExpanded={isExpanded}>
			<div
				className="selected-question"
				onClick={toggleExpand}
				role="presentation"
			>
				{selectedQuestion && <h3>{selectedQuestion}</h3>}
				<ExpandMoreIcon />
			</div>
			<div className="question-list">
				{questions.map(question => (
					<h3
						onClick={() => handleSelectQuestion(question._eq)}
						role="presentation"
					>
						{question.question ? 'Selecione uma pergunta' : question.question}
					</h3>
				))}
				{nonAnsweredQuestions &&
					nonAnsweredQuestions.map(question => (
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
