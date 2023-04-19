import React, { useEffect } from 'react'
import { Header } from 'components/header'
import ArticleIcon from '@mui/icons-material/Article'
import { Body } from 'components/body'
import { Button } from 'components/button'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { Radio } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Grouping } from 'interfaces/grouping.type'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Question } from 'interfaces/question.type'
import { ProgressGraph } from 'components/progress-graph'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Container, GroupingProgress, QuestionDetails } from './styles'

type AccordingAttachmentFiles = {
	attachments: File[]
	accordingButtonId: string
}

type PartialAccordingAttachmentFiles = {
	attachments: File[]
	partialAccordingButtonId: string
}

export const AnswerQuestions = () => {
	const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false)
	const [selectedConformity, setSelectedConformity] = React.useState('')
	const [grouping, setGrouping] = React.useState<Grouping>()
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
	const [accordingAttachments, setAccordingAttachments] = React.useState<
		AccordingAttachmentFiles[]
	>([])
	const [partialAccordingAttachments, setPartialAccordingAttachments] =
		React.useState<PartialAccordingAttachmentFiles[]>([])
	const navigate = useNavigate()
	const { groupingId } = useParams()

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/groupings/${groupingId}/company`)
				setGrouping(data)
				setCurrentQuestionIndex(() => {
					return data.questions.findIndex(
						(question: Question) => !question.answer,
					)
				})
				console.log(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [groupingId])

	const handleSelectConformityChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSelectedConformity(event.target.value)
	}

	const handleBackButtonClick = () => {
		navigate('/questionarios-da-empresa')
	}

	const handleBtSkipClick = async () => {
		console.log('skip')
	}

	const handleBtNextClick = async () => {
		console.log('next')
	}

	const handleAccordingButtonChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		accordingButtonId?: string,
	) => {
		if (!accordingButtonId) return
		const { files } = event.target
		if (!files || files.length === 0) return

		const accordingAttachmentIndex = accordingAttachments.findIndex(
			attachment => attachment.accordingButtonId === accordingButtonId,
		)

		if (accordingAttachmentIndex !== -1) {
			const updatedAccordingAttachment = {
				...accordingAttachments[accordingAttachmentIndex],
			}

			for (let i = 0; i < files.length; i += 1) {
				updatedAccordingAttachment.attachments.push(files[i])
			}

			setAccordingAttachments(prevState => {
				const newState = [...prevState]
				newState[accordingAttachmentIndex] = updatedAccordingAttachment
				return newState
			})
			return
		}

		setAccordingAttachments([{ attachments: [...files], accordingButtonId }])
	}

	return (
		<Container>
			<Header title="Questionários" icon={<ArticleIcon />} />
			<Body cardContext>
				<div className="content">
					<GroupingProgress>
						<div className="progress-bar">
							<ProgressGraph percentage={grouping?.percentage || 0} />
						</div>
						<div className="grouping-name">
							<p>
								Agrupamento: <span>{grouping?.name}</span>
							</p>
						</div>
					</GroupingProgress>
					<QuestionDetails>
						<div className="question-title">
							<div className="progress">
								Pergunta {currentQuestionIndex + 1}/{grouping?.questions.length}
							</div>
							<h2>{grouping?.questions[currentQuestionIndex].question}</h2>
						</div>
						{selectedConformity === 'conform' && (
							<>
								<div className="attachment">
									<input
										multiple
										type="file"
										name="according-attachment"
										className="attachment-item"
										onChange={e =>
											handleAccordingButtonChange(
												e,
												grouping?.questions[currentQuestionIndex]
													.accordingButtons[0]._eq,
											)
										}
									/>
									<CloudDownloadIcon />
									<p>
										{
											grouping?.questions[currentQuestionIndex]
												.accordingButtons[0].label
										}
									</p>
								</div>
								<div className="attachment-buttons">
									<Button text="Anexos anteriores" variant="secondary" />
									<Button
										text="Não possuo o anexo"
										variant="secondary-danger"
									/>
									<Button text="Salvar anexos" variant="secondary" />
								</div>
							</>
						)}
						{selectedConformity === 'partial-conform' && (
							<>
								<div className="attachment">
									<input
										type="file"
										name="partial-attachment"
										id=""
										className="attachment-item"
									/>
									<CloudDownloadIcon />
									<p>
										{
											grouping?.questions[currentQuestionIndex]
												.partialAccordingButtons[0].label
										}
									</p>
								</div>
								<div className="attachment-buttons">
									<Button text="Anexos anteriores" variant="secondary" />
									<Button
										text="Não possuo o anexo"
										variant="secondary-danger"
									/>
									<Button text="Salvar anexos" variant="secondary" />
								</div>
							</>
						)}
						{selectedConformity === 'non-conform' && (
							<div className="threat">
								<p>{grouping?.questions[currentQuestionIndex].threat}</p>
							</div>
						)}
						{selectedConformity === '' && (
							<div className="description">
								<p>{grouping?.questions[currentQuestionIndex].description}</p>
							</div>
						)}
						<div className="conformity-button-group">
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'conform'}
									onChange={handleSelectConformityChange}
									value="conform"
									name="radio-buttons"
								/>
								<p>Conforme</p>
							</div>
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'partial-conform'}
									onChange={handleSelectConformityChange}
									value="partial-conform"
									name="radio-buttons"
								/>
								<p>Parcialmente conforme</p>
							</div>
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'non-conform'}
									onChange={handleSelectConformityChange}
									value="non-conform"
									name="radio-buttons"
								/>
								<p>Não conforme</p>
							</div>
						</div>
					</QuestionDetails>
					<div className="bottom-buttons-group">
						<Button
							startIcon={<KeyboardArrowLeftIcon />}
							variant="secondary"
							text="Pergunta anterior"
							onClick={handleBackButtonClick}
							className={currentQuestionIndex === 0 ? 'disabled' : ''}
							disabled={currentQuestionIndex === 0}
						/>
						<Button
							startIcon={
								<div className={`has-message ${hasUnreadMessages && 'unread'}`}>
									<ModeCommentIcon />
									<div className="dot" />
								</div>
							}
							className="button-chat"
							text="Chat da pergunta"
							variant="primary"
							// onClick={handleChatOpen}
						/>
						{selectedConformity === 'non-conform' ? (
							<Button
								variant="danger"
								text="Pular"
								endIcon={<KeyboardArrowRightIcon />}
								onClick={handleBtSkipClick}
							/>
						) : (
							<Button
								variant="primary"
								text="Próxima pergunta"
								endIcon={<KeyboardArrowRightIcon />}
								className={selectedConformity === '' ? 'disabled' : ''}
								disabled={selectedConformity === ''}
								onClick={handleBtNextClick}
							/>
						)}
					</div>
				</div>
			</Body>
		</Container>
	)
}
