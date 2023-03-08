import { BackButton } from 'components/back-button'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People'
import { Header } from 'components/header'
import { Body } from 'components/body'
import { useNavigate } from 'react-router-dom'
import { ProgressGraph } from 'components/progress-graph'
import { Tabs } from 'components/tabs'
import { Container } from './styles'
import { SelectQuestion } from './components/select-question'
import { QuestionDetails } from './components/question-details'

const questions = [
	{
		_eq: '1',
		question: 'A empresa realiza análise de risco?',
		details: 'Detalhes da pergunta',
	},
	{
		_eq: '2',
		question: 'A empresa realiza análise de risco?',
		details: 'Detalhes da pergunta',
	},
]

export const ValidateAnswers: React.FC = () => {
	const [selectedQuestionId, setSelectedQuestionId] = React.useState(
		questions[0]._eq,
	)
	const navigate = useNavigate()

	const handleBackButtonClick = () => {
		navigate(-1)
	}

	const handleSelectQuestion = (questionId: string) => {
		setSelectedQuestionId(questionId)
	}

	const renderTabAnalising = () => {
		return (
			<div>
				<SelectQuestion
					questions={questions}
					selectedQuestionId={selectedQuestionId}
					onSelect={handleSelectQuestion}
				/>
				<QuestionDetails />
			</div>
		)
	}
	const renderTabApproved = () => {
		return (
			<div>
				<h1>Tab Aprovado</h1>
			</div>
		)
	}
	const renderTabReproved = () => {
		return (
			<div>
				<h1>Tab Reprovado</h1>
			</div>
		)
	}

	return (
		<Container>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
			<Body cardContext>
				<div className="page-wrapper">
					<div className="page-header">
						<BackButton handleClick={handleBackButtonClick} />
						<div className="grouping-info">
							<h2>Trabalho remoto</h2>
							<ProgressGraph percentage={35} size={22} />
						</div>
					</div>
					<div className="tab-container">
						<Tabs
							tabTitles={['Em análise', 'Aprovadas', 'Reprovadas']}
							tabContents={[
								renderTabAnalising(),
								renderTabApproved(),
								renderTabReproved(),
							]}
						/>
					</div>
				</div>
			</Body>
		</Container>
	)
}
