import React from 'react'
import { Question } from 'interfaces/question.type'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/button'
import AddIcon from '@mui/icons-material/Add'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { shortFilePath } from 'utils/short-file-path'
import { AccordingAttachmentFields, Container, QuestionContent } from './styles'

type QuestionAccordionProps = {
	question: Question
	reloadQuestions: () => void
}

export const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
	question,
	reloadQuestions,
}) => {
	const [isExpanded, setIsExpanded] = React.useState(false)
	const [isDragging, setIsDragging] = React.useState(false)
	const navigate = useNavigate()

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	const handleContactUsButtonClick = () => {
		navigate('/convide-nos')
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		setIsDragging(true)
		event.preventDefault()
		event.currentTarget.classList.add('dragging')
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		setIsDragging(false)
		event.preventDefault()
		event.currentTarget.classList.remove('dragging')
	}

	const handleDrop = async (
		event: React.DragEvent<HTMLDivElement>,
		buttonId: string,
	) => {
		setIsDragging(false)
		event.preventDefault()
		event.currentTarget.classList.remove('dragging')
		const files = Array.from(event.dataTransfer.files)

		try {
			files.forEach(async file => {
				const formData = new FormData()
				formData.append('file', file)
				await api.post(
					`/answers/${question._eq}/according-button/${buttonId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				)
				reloadQuestions()
			})
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container isExpanded={isExpanded}>
			<div
				className="accordion-content"
				onClick={toggleExpanded}
				role="presentation"
			>
				<div className="base-info">
					<div className="question-title">
						<h3>
							<span>Questionários: </span>{' '}
							{question.groupings.map(g =>
								g.questionaries.map(q => `${q.name}. `),
							)}
						</h3>
					</div>
					<div className="question-informations">
						<div className="points">
							<span>3</span>
						</div>
						<div className="grouping-name">
							<h3>{question.groupings.map(g => `${g.name} `)}</h3>
							<span>Você possui pendências.</span>
						</div>
						<div className="points-on-conclued">
							<p>
								+ 90 pontos <span> Se concluir a tarefa</span>
							</p>
						</div>
					</div>
				</div>
				<ExpandMoreIcon />
			</div>

			<QuestionContent>
				<span className="contact">
					Deseja nos contratar para realizar este serviço?{' '}
					<a onClick={handleContactUsButtonClick} role="presentation">
						Clique aqui para saber mais.
					</a>
				</span>
				<div className="question-details">
					<h2>{question.question}</h2>
					<span>{question.description}</span>
				</div>
			</QuestionContent>

			<AccordingAttachmentFields>
				{question.accordingButtons.map((button, i) => (
					<div className="according-button">
						<div className="button-info">
							<span className="button-name">
								{i + 1} - {button.label}
							</span>
							<Button
								text="Adicionar tarefa a usuários"
								endIcon={<AddIcon />}
								variant="secondary"
								className="bt-add-task"
							/>
						</div>
						<div
							className="attachment"
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={e => handleDrop(e, button._eq)}
						>
							<input
								type="file"
								name="partial-attachment"
								className="attachment-item"
								multiple
							/>
							<CloudDownloadIcon />
							<p>
								{isDragging
									? 'Solte o arquivo aqui'
									: 'Arraste o arquivo ou clique aqui para anexar'}
							</p>
						</div>
						{question.answer && (
							<div className="current-files">
								<h3>Arquivo</h3>
								{button.accordingButtonFiles?.map(file => (
									<div className="file">
										<span>{shortFilePath(file.filePath)}</span>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</AccordingAttachmentFields>
		</Container>
	)
}
