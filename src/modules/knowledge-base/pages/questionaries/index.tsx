import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { api } from 'api'
import { Questionary } from 'interfaces/questionary.type'
import { handleApiError } from 'utils/handle-api-error'
import { Button } from 'components/button'
import { HeaderWithTabs } from 'components/header-with-tabs'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Body } from 'components/body'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { NotFound } from 'components/not-found'
import { Container, QuestionaryCard } from './styles'

export const Questionaries: React.FC = () => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = useState<Questionary[]>([])
	const [isPageLoading, setIsPageLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/questionaries')
				setQuestionaries(data)
				setIsPageLoading(false)
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
		navigate(`/base-de-conhecimento/questionarios/${newQuestionaryId}`)
	}

	const handleOpenQuestionaryDetails = (questionaryId: string) => {
		navigate(`/base-de-conhecimento/questionarios/${questionaryId}`)
	}

	return (
		<Container>
			<HeaderWithTabs
				icon={<CommentBankIcon />}
				title="Base de conhecimento"
				tabs={[
					{
						title: 'Perguntas',
						link: '/base-de-conhecimento/perguntas',
					},
					{
						title: 'Questionários',
						link: '/base-de-conhecimento/questionarios',
					},
				]}
				active="/base-de-conhecimento/questionarios"
			/>
			<Body isLoading={isPageLoading} cardContext>
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
						endIcon={<AddIcon />}
						text="Cadastrar novo questionário"
						className="new-questionary-button"
						onClick={handleCreateNewQuestionaryButtonClick}
					/>
				</div>
				<div className="questionaries-list">
					{questionaries.length === 0 ? (
						<NotFound />
					) : (
						questionaries.map(questionary => (
							<QuestionaryCard>
								<h3
									onClick={() => handleOpenQuestionaryDetails(questionary._eq)}
									role="presentation"
								>
									{questionary.name === ''
										? '(Questionário sem nome)'
										: questionary.name}
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
						))
					)}
				</div>
			</Body>
		</Container>
	)
}
