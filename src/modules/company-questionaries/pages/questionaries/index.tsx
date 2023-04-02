import { Body } from 'components/body'
import { Header } from 'components/header'
import React, { useEffect } from 'react'
import ArticleIcon from '@mui/icons-material/Article'
import { Button } from 'components/button'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { Questionary } from 'interfaces/questionary.type'
import { useAuth } from 'hooks/authentication.hook'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Company } from 'interfaces/company.type'
import { useNavigate } from 'react-router-dom'
import { Container, QuestionaryInfos } from './styles'

export const Questionaries: React.FC = () => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = React.useState<Questionary[]>([])
	const [company, setCompany] = React.useState<Company>()
	const { employee } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(
					`/questionaries/${employee.companyId}/company`,
				)
				setQuestionaries(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee])

	useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(`/companies/${employee.companyId}`)
				setCompany(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee])

	const handleSearchInputChange = async () => {
		if (!employee) return
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchUser')
		try {
			const { data: findQuestionaries } = await api.get(
				`/questionaries/${employee.companyId}/company?query=${searchInputValue}`,
			)
			setQuestionaries(findQuestionaries)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleOpenQuestionary = (questionaryId: string) => {
		navigate(`/questionarios-da-empresa/${questionaryId}`)
	}

	return (
		<Container>
			<Header title="Questionarios" icon={<ArticleIcon />} />
			<Body cardContext>
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchUser"
						placeholder="Pesquise pelo nome do questionário"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				{questionaries.map(questionary => (
					<QuestionaryInfos>
						<h2>Questionário</h2>
						<h3
							onClick={() => handleOpenQuestionary(questionary._eq)}
							role="presentation"
						>
							{questionary.name}
						</h3>
						<Button
							text="Adicionar usuários +"
							variant="secondary"
							className="bt-add-users-to-questionary"
						/>
						<span className="company-title">Empresa</span>
						<div className="company-details">
							<img src={company?.logo} alt={`Logo da ${company?.name}`} />
							<p>{company?.name}</p>
						</div>
					</QuestionaryInfos>
				))}
			</Body>
		</Container>
	)
}
