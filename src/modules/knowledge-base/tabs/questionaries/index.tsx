import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { api } from 'api'
import { Questionary } from 'interfaces/questionary.type'
import { handleApiError } from 'utils/handle-api-error'
import { Button } from 'components/button'
import { Container, QuestionaryCard } from './styles'

type QuestionariesProps = {
	openQuestionaryDetails: (link: string, questionaryId: string) => void
}

export const Questionaries: React.FC<QuestionariesProps> = ({
	openQuestionaryDetails,
}) => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = useState<Questionary[]>([])

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

	const handleOpenQuestionaryDetails = (questionaryId: string) => {
		openQuestionaryDetails('/detalhes-do-questionario', questionaryId)
	}

	return (
		<Container>
			<div className="questionaries-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchQuestionary"
						placeholder="Pesquise pelo nome do questionário"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					variant="primary"
					text="Cadastrar novo questionário +"
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
