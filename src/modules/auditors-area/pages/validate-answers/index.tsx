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
import { Button } from 'components/button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { RightDrawer } from 'components/right-drawer'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import { FormHandles } from '@unform/core'
import { ChatDrawerContainer, Container, Message } from './styles'
import { SelectQuestion } from './components/select-question'
import { QuestionDetails } from './components/question-details'

export const ValidateAnswers: React.FC = () => {
	const [chatDrawerOpen, setChatDrawerOpen] = useState(false)
	const [analyzingQuestions, setAnalyzingQuestions] = useState<Question[]>([])
	const [selectedAnalyzingAnswer, setSelectedAnalyzingAnswer] =
		useState<Question>({} as Question)
	const [grouping, setGrouping] = useState<Grouping>()
	const formSendMessageRef = React.useRef<FormHandles>(null)
	const { groupingId, companyId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/groupings/${groupingId}`)
				setGrouping(data)
				setAnalyzingQuestions(data.questions)
				setSelectedAnalyzingAnswer(data.questions[0])
				data.questions.shift()
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [groupingId])

	const handleBackButtonClick = () => {
		navigate(-1)
	}

	const handleSelectAnalyzingQuestion = async (question: Question) => {
		setSelectedAnalyzingAnswer(question)
		try {
			const { data } = await api.get(`/groupings/${groupingId}`)
			const questionsLessSelected = data.questions.filter(
				(questionData: Question) => questionData._eq !== question._eq,
			)
			setAnalyzingQuestions(questionsLessSelected)
		} catch (error) {
			handleApiError(error)
		}
	}

	const renderTabAnalising = () => {
		return (
			<div key="tabAnalising">
				<SelectQuestion
					questions={analyzingQuestions}
					selectedQuestion={selectedAnalyzingAnswer}
					onSelect={handleSelectAnalyzingQuestion}
				/>
				<div className="select-question-space" />
				<QuestionDetails question={selectedAnalyzingAnswer} />
			</div>
		)
	}
	const renderTabApproved = () => {
		return (
			<div key="tabApproved">
				<h1>Tab Aprovado</h1>
			</div>
		)
	}
	const renderTabReproved = () => {
		return (
			<div key="tabReproved">
				<h1>Tab Reprovado</h1>
			</div>
		)
	}

	const handleClickApproveAnswer = async () => {
		try {
			await api.post(`/answers/${selectedAnalyzingAnswer._eq}/approve`)
			const { data } = await api.get(`/groupings/${groupingId}`)
			setGrouping(data)
			setAnalyzingQuestions(data.questions)
			setSelectedAnalyzingAnswer(data.questions[0])
			data.questions.shift()
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleClickReproveAnswer = async () => {
		try {
			await api.post(`/answers/${selectedAnalyzingAnswer._eq}/reprove`)
			const { data } = await api.get(`/groupings/${groupingId}`)
			setGrouping(data)
			setAnalyzingQuestions(data.questions)
			setSelectedAnalyzingAnswer(data.questions[0])
			data.questions.shift()
		} catch (error) {
			handleApiError(error)
		}
	}

	const toggleChatDrawer = () => setChatDrawerOpen(!chatDrawerOpen)

	const handleSendMessage = async () => {
		try {
			const message = formSendMessageRef.current?.getFieldValue('message')
			await api.post(`/answers/${selectedAnalyzingAnswer._eq}/messages`, {
				message,
			})
			formSendMessageRef.current?.reset()
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<Container>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
			<Body cardContext>
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
								renderTabAnalising(),
								renderTabApproved(),
								renderTabReproved(),
							]}
						/>
					</div>
				</div>
			</Body>
			<div className="action-buttons">
				<div className="approval-buttons">
					<Button
						className="button-approve"
						text="Aprovar"
						variant="success"
						endIcon={<CheckCircleIcon />}
						onClick={handleClickApproveAnswer}
					/>
					<Button
						className="button-reprove"
						text="Reprovar"
						variant="danger"
						endIcon={<CancelIcon />}
						onClick={handleClickReproveAnswer}
					/>
				</div>
				<Button
					startIcon={<ModeCommentIcon />}
					className="button-chat"
					text="Chat da pergunta"
					variant="primary"
					onClick={toggleChatDrawer}
				/>
			</div>
			<RightDrawer drawerOpen={chatDrawerOpen} toggleDrawer={toggleChatDrawer}>
				<ChatDrawerContainer>
					<CloseIcon
						className="close-drawer-icon"
						onClick={toggleChatDrawer}
						data-testid="close-drawer-button"
					/>
					<div className="chat-drawer-content">
						<div className="chat-drawer-header">
							<ModeCommentIcon />
							<h2>Chat da pergunta</h2>
						</div>
						<div className="messages">
							<Message>
								<div className="message-header">
									<img
										src="https://img.freepik.com/fotos-gratis/estilo-de-vida-beleza-e-moda-conceito-de-emocoes-de-pessoas-jovem-gerente-de-escritorio-feminino-asiatico-ceo-com-expressao-satisfeita-em-pe-sobre-um-fundo-branco-sorrindo-com-os-bracos-cruzados-sobre-o-peito_1258-59329.jpg"
										alt="Foto de perfil de Barbara Santana"
										// onError={}
									/>
									<h4>
										Barbara Santana <span>5h atrás</span>
									</h4>
								</div>
								<div className="message-body">
									<p>
										Não entendi o que significa esta pergunta, poderia me
										explicar?
									</p>
								</div>
							</Message>
						</div>
						<div className="send-message">
							<Form ref={formSendMessageRef} onSubmit={e => e.preventDefault()}>
								<Input
									className="input-send-message"
									name="message"
									placeholder="Deixe seu comentário..."
									multiline
									rows={4}
								/>
								<Button
									text="Enviar"
									variant="primary"
									onClick={handleSendMessage}
									className="send-message-button"
								/>
							</Form>
						</div>
					</div>
				</ChatDrawerContainer>
			</RightDrawer>
		</Container>
	)
}
