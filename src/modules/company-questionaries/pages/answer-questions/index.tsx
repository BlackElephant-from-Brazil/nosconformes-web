import React from 'react'
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
import { Container, GroupingProgress, QuestionDetails } from './styles'

export const AnswerQuestions = () => {
	const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false)
	const [selectedConformity, setSelectedConformity] = React.useState('')
	const [grouping, setGrouping] = React.useState<Grouping>()
	const navigate = useNavigate()
	const { groupingId } = useParams()

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/groupings/${groupingId}/company`)
				setGrouping(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [groupingId])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedConformity(event.target.value)
	}

	const handleBackButtonClick = () => {
		navigate('/questionarios-da-empresa')
	}

	return (
		<Container>
			<Header title="Questionários" icon={<ArticleIcon />} />
			<Body cardContext>
				<div className="content">
					<GroupingProgress>
						<div className="progress-bar" />
						<div className="grouping-name">
							<p>
								Agrupamento: <span>Nome do agrupamento</span>
							</p>
						</div>
					</GroupingProgress>
					<QuestionDetails>
						<div className="question-title">
							<div className="progress">Pergunta 1/100</div>
							<h2>
								A empres possui um plano de ação para a prevenção de acidentes
								de trabalho?
							</h2>
						</div>
						<div className="description">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
								ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
								dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
								sit amet, consectetur adipiscing elit.
							</p>
						</div>
						<div className="conformity-button-group">
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'conform'}
									onChange={handleChange}
									value="conform"
									name="radio-buttons"
								/>
								<p>Conforme</p>
							</div>
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'partial-conform'}
									onChange={handleChange}
									value="partial-conform"
									name="radio-buttons"
								/>
								<p>Parcialmente conforme</p>
							</div>
							<div className="radio-button">
								<Radio
									checked={selectedConformity === 'non-conform'}
									onChange={handleChange}
									value="non-conform"
									name="radio-buttons"
								/>
								<p>Não conforme</p>
							</div>
						</div>
					</QuestionDetails>

					<div className="bottom-buttons-group">
						<Button
							variant="secondary"
							text="< Voltar"
							onClick={handleBackButtonClick}
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
						<Button variant="primary" text="Próxima >" />
					</div>
				</div>
			</Body>
		</Container>
	)
}
