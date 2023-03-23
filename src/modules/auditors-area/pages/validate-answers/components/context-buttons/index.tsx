import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'components/button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import { RightDrawer } from 'components/right-drawer'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import { getTimeDifferenceFromToday } from 'utils/get-time-difference-from-today'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Message as MessageInterface } from 'interfaces/message.type'
import { FormHandles } from '@unform/core'
import { useAuth } from 'hooks/authentication.hook'
import { Container, ChatDrawerContainer, Message } from './styles'

type ContextButtonsProps = {
	contextQuestionId: string
	companyId?: string
	hasAnswer?: boolean
}

export const ContextButtons: React.FC<ContextButtonsProps> = ({
	contextQuestionId,
	companyId,
	hasAnswer,
}) => {
	const [chatDrawerOpen, setChatDrawerOpen] = useState(false)
	const [buttonSendMessageLoading, setButtonSendMessageLoading] =
		useState(false)
	const [messages, setMessages] = useState<MessageInterface[]>([])
	const formSendMessageRef = React.useRef<FormHandles>(null)
	const [hasUnreadMessages, setHasUnreadMessages] = useState(false)
	const { user } = useAuth()
	const messagesRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		;(async () => {
			if (!contextQuestionId) return
			try {
				const { data } = await api.get(
					`/messages/${contextQuestionId}/${companyId}`,
				)
				setMessages(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [companyId, contextQuestionId])

	useEffect(() => {
		;(async () => {
			try {
				if (!contextQuestionId) return
				if (!companyId) return
				const { data } = await api.get(
					`/messages/${contextQuestionId}/${companyId}/unread-for-auditor`,
				)
				setHasUnreadMessages(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [companyId, contextQuestionId])

	useEffect(() => {
		if (chatDrawerOpen) {
			setTimeout(() => {
				const messagesDiv = messagesRef.current
				if (messagesDiv) {
					messagesDiv.scrollTo({
						top: messagesDiv.scrollHeight,
					})
				}
			}, 1)
		}
	}, [chatDrawerOpen])

	const reloadMessages = async () => {
		try {
			const { data } = await api.get(
				`/messages/${contextQuestionId}/${companyId}`,
			)
			setMessages(data)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleSendMessage = async () => {
		setButtonSendMessageLoading(true)
		try {
			const message = formSendMessageRef.current
				?.getFieldValue('message')
				.trim()
			if (!message) {
				setButtonSendMessageLoading(false)
				return
			}
			const sendMessage = {
				text: message,
				userId: user._eq,
				employeeId: null,
				questionId: contextQuestionId,
				companyId,
			}
			await api.post('/messages', {
				...sendMessage,
			})
			formSendMessageRef.current?.reset()
			setButtonSendMessageLoading(false)
			reloadMessages()
		} catch (error) {
			handleApiError(error)
			setButtonSendMessageLoading(false)
		}
	}

	const handleClickApproveAnswer = async () => {
		try {
			await api.post(`/answers/${contextQuestionId}/approve`)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleClickRejectAnswer = async () => {
		try {
			await api.post(`/answers/${contextQuestionId}/reject`)
		} catch (error) {
			handleApiError(error)
		}
	}

	const toggleChatDrawer = () => setChatDrawerOpen(!chatDrawerOpen)

	const handleChatOpen = async () => {
		toggleChatDrawer()

		try {
			await api.put(
				`/messages/${contextQuestionId}/${companyId}/set-message-as-read-for-auditor`,
			)
			setHasUnreadMessages(false)
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<>
			<Container>
				{hasAnswer && (
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
							onClick={handleClickRejectAnswer}
						/>
					</div>
				)}
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
					onClick={handleChatOpen}
				/>
			</Container>
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
						<div className="messages scroll" ref={messagesRef}>
							{messages.map(message => {
								if (message.user) {
									return (
										<Message>
											<div className="message-header">
												<img
													src={message.user.profilePicture}
													alt={`Foto de perfil de ${message.user.name}`}
												/>
												<h4>
													{message.user.name}{' '}
													<span>
														{getTimeDifferenceFromToday(message.createdAt)}
													</span>
												</h4>
											</div>
											<div className="message-body">
												<p>{message.text}</p>
											</div>
										</Message>
									)
								}
								if (message.employee) {
									return (
										<Message>
											<div className="message-header">
												<img
													src={message.employee.profilePicture}
													alt={`Foto de perfil de ${message.employee.name}`}
												/>
												<h4>
													{message.employee.name}{' '}
													<span>
														{getTimeDifferenceFromToday(message.createdAt)}
													</span>
												</h4>
											</div>
											<div className="message-body">
												<p>{message.text}</p>
											</div>
										</Message>
									)
								}
								return null
							})}
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
									isLoading={buttonSendMessageLoading}
								/>
							</Form>
						</div>
					</div>
				</ChatDrawerContainer>
			</RightDrawer>
		</>
	)
}
