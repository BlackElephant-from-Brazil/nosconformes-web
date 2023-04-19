import { Body } from 'components/body'
import { Header } from 'components/header'
import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { Container } from 'components/container'
import { CompanyGraph } from 'components/company-graph'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Question } from 'interfaces/question.type'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { ProgressIndicator } from './styles'
import { QuestionAccordion } from './components/question-accordion'

export const CompanyActionPlan: React.FC = () => {
	const [questions, setQuestions] = React.useState<Question[]>([])
	const [isPageLoading, setIsPageLoading] = React.useState(true)

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/action-plan')
				setQuestions(data)
				setIsPageLoading(false)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const reloadQuestions = async () => {
		try {
			const { data } = await api.get('/action-plan')
			setQuestions(data)
			console.log(data)
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<Container>
			<Header title="Plano de ação" icon={<PendingActionsIcon />} />
			<Body cardContext isLoading={isPageLoading}>
				<ProgressIndicator>
					<CompanyGraph points={340} size="medium" />
					<div className="arrow-indicator">
						<span>Para</span>
						<ArrowRightAltIcon />
					</div>
					<CompanyGraph points={1000} size="medium" />
				</ProgressIndicator>
				{questions.map(question => (
					<QuestionAccordion
						question={question}
						reloadQuestions={reloadQuestions}
					/>
				))}
			</Body>
		</Container>
	)
}
