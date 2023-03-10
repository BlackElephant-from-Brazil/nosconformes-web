import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { api } from 'api'
import { Questionary } from 'interfaces/questionary.type'
import { handleApiError } from 'utils/handle-api-error'
import { Button } from 'components/button'
import { handleUserImageError } from 'utils/handle-image-error'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { Container, QuestionaryCard } from './styles'
import { AuditorsMenu } from './components/auditors-menu'

type QuestionariesProps = {
	openQuestionaryDetails: (link: string, questionaryId: string) => void
}

export const Questionaries: React.FC<QuestionariesProps> = ({
	openQuestionaryDetails,
}) => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = useState<Questionary[]>([])
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [auditorsMenuOpen, setAuditorsMenuOpen] = useState(false)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/questionaries')
				setQuestionaries(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestionary')

		try {
			const { data: findQuestionaries } = await api.get(
				`/questionaries?query=${searchInputValue}`,
			)
			setQuestionaries(findQuestionaries)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewQuestionaryButtonClick = async () => {
		let newQuestionaryId = ''
		try {
			const { data: newQuestionary } = await api.post('/questionaries')
			newQuestionaryId = newQuestionary.questionaryId
		} catch (err) {
			handleApiError(err)
		}
		openQuestionaryDetails('/detalhes-do-questionario', newQuestionaryId)
	}

	const toggleAuditorsMenu = (event?: React.MouseEvent<HTMLDivElement>) => {
		if (auditorsMenuOpen) setAnchorEl(null)
		else setAnchorEl(event?.currentTarget || null)

		setAuditorsMenuOpen(!auditorsMenuOpen)
	}

	const handleOpenQuestionaryDetails = (questionaryId: string) => {
		openQuestionaryDetails('/detalhes-do-questionario', questionaryId)
	}

	return (
		<Container>
			<div className="questionaries-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchQuestionary"
						placeholder="Pesquise pelo nome do question??rio"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					variant="primary"
					text="Cadastrar novo question??rio +"
					className="new-questionary-button"
					onClick={handleCreateNewQuestionaryButtonClick}
				/>
			</div>
			<div className="questionaries-list">
				{questionaries.map(questionary => (
					<QuestionaryCard>
						<h3
							onClick={() => handleOpenQuestionaryDetails(questionary._eq)}
							role="presentation"
						>
							{questionary.name}
						</h3>
						<div className="clients-list">
							<p className="clients">Clientes</p>
							{questionary.companies.map(company => (
								<div className="client">
									<img
										src={company.logo}
										alt={`Logo da empresa: ${company.name}`}
									/>
									<p>{company.name}</p>
								</div>
							))}
						</div>
					</QuestionaryCard>
				))}
			</div>
		</Container>
	)
}
