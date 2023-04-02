import { BackButton } from 'components/back-button'
import React, { useEffect, useState } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import { Header } from 'components/header'
import { Body } from 'components/body'
import { useNavigate, useParams } from 'react-router-dom'
import { ProgressGraph } from 'components/progress-graph'
import { Tabs } from 'components/tabs'
import { Question } from 'interfaces/question.type'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Grouping } from 'interfaces/grouping.type'
import { Container } from './styles'
import { SelectQuestion } from './components/select-answer'
import { AnswerDetails } from './components/answer-details'
import { ContextButtons } from './components/context-buttons'

export const ValidateAnswers: React.FC = () => {
	const [grouping, setGrouping] = useState<Grouping>()
	const { groupingId, companyId } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [approvedAnsweredQuestions, setApprovedAnsweredQuestions] = useState<
		Question[]
	>([])
	const [selectedApprovedAnswer, setSelectedApprovedAnswer] =
		useState<Question>()
	const [rejectedAnsweredQuestions, setRejectedAnsweredQuestions] = useState<
		Question[]
	>([])
	const [selectedRejectedAnswer, setSelectedRejectedAnswer] =
		useState<Question>()
	const [pendingQuestions, setPendingQuestions] = useState<Question[]>([])
	const [nonAnsweredQuestions, setNonAnsweredQuestions] = useState<Question[]>(
		[],
	)
	const [selectedPendingQuestion, setSelectedPendingQuestion] =
		useState<Question>()
	const [contextQuestionId, setContextQuestionId] = useState<string>('')

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/answers/${companyId}/${groupingId}`)
				if (data.pendingAnsweredQuestions.length > 0) {
					setSelectedPendingQuestion(data.pendingAnsweredQuestions[0])
					setContextQuestionId(data.pendingAnsweredQuestions[0].question._eq)
					data.pendingAnsweredQuestions.shift()
				} else {
					setSelectedPendingQuestion(data.nonAnsweredQuestions[0])
					setContextQuestionId(data.nonAnsweredQuestions[0]._eq)
					data.nonAnsweredQuestions.shift()
				}
				setApprovedAnsweredQuestions(data.approvedAnswers)
				setRejectedAnsweredQuestions(data.rejectedAnswers)
				setPendingQuestions(data.pendingAnsweredQuestions)
				setNonAnsweredQuestions(data.nonAnsweredQuestions)

				setIsLoading(false)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [companyId, groupingId])

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/groupings/${groupingId}`)
				setGrouping(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [groupingId])

	const handleBackButtonClick = () => {
		navigate(-1)
	}

	const handleSelectedPendingQuestion = async (question: Question) => {
		setSelectedPendingQuestion(question)
		setContextQuestionId(question._eq)
	}

	const handleSelectedApprovedQuestion = async (question: Question) => {
		setSelectedApprovedAnswer(question)
		setContextQuestionId(question._eq)
	}

	const handleSelectedRejectedQuestion = async (question: Question) => {
		setSelectedRejectedAnswer(question)
		setContextQuestionId(question._eq)
	}

	const renderTabPending = () => {
		return (
			<div key="tabAnalising">
				<SelectQuestion
					questions={pendingQuestions}
					nonAnsweredQuestions={nonAnsweredQuestions}
					selectedQuestion={selectedPendingQuestion?.question}
					onSelect={handleSelectedPendingQuestion}
				/>
				<div className="select-question-space" />
				<AnswerDetails question={selectedPendingQuestion} />
			</div>
		)
	}

	const renderTabApproved = () => {
		return (
			<div key="tabApproved">
				<SelectQuestion
					questions={approvedAnsweredQuestions}
					selectedQuestion={selectedApprovedAnswer?.question}
					onSelect={handleSelectedApprovedQuestion}
				/>
				<div className="select-question-space" />
				<AnswerDetails question={selectedApprovedAnswer} />
			</div>
		)
	}

	const renderTabRejected = () => {
		return (
			<div key="tabReproved">
				<SelectQuestion
					questions={rejectedAnsweredQuestions}
					selectedQuestion={selectedRejectedAnswer?.question}
					onSelect={handleSelectedRejectedQuestion}
				/>
				<div className="select-question-space" />
				<AnswerDetails question={selectedRejectedAnswer} />
			</div>
		)
	}

	return (
		<Container>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
			<Body cardContext isLoading={isLoading}>
				<div className="page-wrapper">
					<div className="page-header">
						<BackButton handleClick={handleBackButtonClick} />
						<div className="grouping-info">
							<h2>{grouping?.name}</h2>
							<ProgressGraph percentage={grouping?.percentage || 0} size={22} />
						</div>
					</div>
					<div className="tab-container">
						<Tabs
							tabTitles={['Em análise', 'Aprovadas', 'Reprovadas']}
							tabContents={[
								renderTabPending(),
								renderTabApproved(),
								renderTabRejected(),
							]}
						/>
					</div>
				</div>
			</Body>
			<ContextButtons
				contextQuestionId={contextQuestionId}
				companyId={companyId}
				hasAnswer={
					pendingQuestions.find(q => q._eq === contextQuestionId)?.answer !==
					undefined
				}
			/>
		</Container>
	)
}
