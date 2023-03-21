import { Header } from 'components/header'
import React, { useEffect } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import { Body } from 'components/body'
import { CompanyGraph } from 'components/company-graph'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ProgressGraph } from 'components/progress-graph'
import { useNavigate } from 'react-router-dom'
import { Questionary } from 'interfaces/questionary.type'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Company } from 'interfaces/company.type'
import { handleCompanyImageError } from 'utils/handle-image-error'
import { Input } from 'components/input'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Container, SelectCompany, SelectQuestionary } from './styles'

export const AuditorArea: React.FC = () => {
	const [selectedCompany, setSelectedCompany] = React.useState<Company>()
	const [selectedQuestionary, setSelectedQuestionary] =
		React.useState<Questionary>()
	const [companies, setCompanies] = React.useState<Company[]>([])
	const [questionaries, setQuestionaries] = React.useState<Questionary[]>([])
	const [selectCompanyOpen, setSelectCompanyOpen] = React.useState(false)
	const [selectQuestionaryOpen, setSelectQuestionaryOpen] =
		React.useState(false)
	const selectedCompanyLogoRef = React.useRef<HTMLImageElement>(null)
	const navigate = useNavigate()
	const formSearchCompanyRef = React.useRef<FormHandles>(null)
	const [isLoading, setIsLoading] = React.useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/auditors-area/companies')
				setSelectedCompany(data[0] as Company)
				data.shift()
				setCompanies(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				if (selectedCompany) {
					const { data } = await api.get(
						`/auditors-area/questionaries/${selectedCompany._eq}`,
					)
					setSelectedQuestionary(data[0])
					data.shift()
					setQuestionaries(data)
					setIsLoading(false)
				}
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [selectedCompany])

	const toggleSelectCompanyOpen = () => {
		setSelectCompanyOpen(!selectCompanyOpen)
	}

	const toggleSelectQuestionaryOpen = () => {
		setSelectQuestionaryOpen(!selectQuestionaryOpen)
	}

	const handleOpenGrouping = (groupingId: string) => {
		navigate(`/validar-respostas/${selectedCompany?._eq}/${groupingId}`)
	}

	const handleSearchInputChange = async () => {
		const searchQuery =
			formSearchCompanyRef.current?.getFieldValue('searchCompany')

		try {
			const { data } = await api.get(
				`/auditors-area/companies?query=${searchQuery}`,
			)
			const companiesLessSelected = data.filter(
				(company: Company) => company._eq !== selectedCompany?._eq,
			)
			setCompanies(companiesLessSelected)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleSelectCompany = async (company: Company) => {
		setSelectedCompany(company)
		toggleSelectCompanyOpen()
		try {
			const { data } = await api.get('/auditors-area/companies')
			const companiesLessSelected = data.filter(
				(companyData: Company) => companyData._eq !== company._eq,
			)
			setCompanies(companiesLessSelected)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleSelectQuestionary = async (questionary: Questionary) => {
		setSelectedQuestionary(questionary)
		toggleSelectQuestionaryOpen()
		try {
			const { data } = await api.get(
				`/auditors-area/questionaries/${selectedCompany?._eq}`,
			)
			const questionariesLessSelected = data.filter(
				(questionaryData: Questionary) =>
					questionaryData._eq !== questionary._eq,
			)
			setQuestionaries(questionariesLessSelected)
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<Container>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
			<Body cardContext isLoading={isLoading}>
				<SelectCompany selectCompanyOpen={selectCompanyOpen}>
					<div
						className="selected-company"
						onClick={toggleSelectCompanyOpen}
						role="presentation"
					>
						{selectedCompany ? (
							<>
								<img
									src={selectedCompany.logo}
									alt={`Logo de ${selectedCompany.name}`}
									ref={selectedCompanyLogoRef}
									onError={() =>
										handleCompanyImageError(selectedCompanyLogoRef)
									}
								/>
								<h2>{selectedCompany.name}</h2>
								<CompanyGraph height={100} width={100} points={100} />
								<ExpandMoreIcon className="expand" />
							</>
						) : (
							<h2 className="no-company">
								Nenhuma empresa para ser exibida aqui...
							</h2>
						)}
					</div>

					<div className="selectable-companies-wrapper">
						<div className="selectable-companies">
							<Form
								ref={formSearchCompanyRef}
								onSubmit={e => e.preventDefault()}
							>
								<Input
									onChange={handleSearchInputChange}
									name="searchCompany"
									placeholder="Pesquise pelo nome da empresa"
									endAdornmentIcon={<SearchRoundedIcon />}
									className="search-input"
								/>
							</Form>
							<div className="companies-list">
								{companies.length === 0 ? (
									<p>Não há nenhuma outra empresa para ser listada</p>
								) : (
									companies.map(company => (
										<div
											className="company-details"
											onClick={() => handleSelectCompany(company)}
											role="presentation"
										>
											<img
												src={company.logo}
												alt={`Logo da empresa ${company.name}`}
											/>
											<h3>{company.name}</h3>
											<CompanyGraph height={100} width={100} points={100} />
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</SelectCompany>
				<div className="space-select-company" />
				<SelectQuestionary selectQuestionaryOpen={selectQuestionaryOpen}>
					<div
						className="selected-questionary"
						onClick={toggleSelectQuestionaryOpen}
						role="presentation"
					>
						{selectedQuestionary ? (
							<>
								<p>
									Questionário:{' '}
									<span>
										{selectedQuestionary.name
											? selectedQuestionary.name
											: '(Questionário sem nome)'}
									</span>
								</p>
								<ExpandMoreIcon className="expand" />
							</>
						) : (
							<h2 className="no-questionary">
								Nenhum questionário para ser exibido aqui...
							</h2>
						)}
					</div>
					<div className="selectable-questionaries-wrapper">
						<div className="selectable-questionaries">
							<div className="questionaries-list">
								{companies.length === 0 ? (
									<p>Não há nenhuma outra empresa para ser listada</p>
								) : (
									questionaries.map(questionary => (
										<div
											className="questionary-details"
											onClick={() => handleSelectQuestionary(questionary)}
											role="presentation"
										>
											<p>
												Questionário:{' '}
												<span>
													{questionary.name
														? questionary.name
														: '(Questionário sem nome)'}
												</span>
											</p>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</SelectQuestionary>
				<div className="space-select-questionary" />
				<div className="progress-container">
					<div className="questionaries-progress">
						<h3>Progresso do cliente</h3>
						<ProgressGraph
							defaut
							size={22}
							percentage={selectedCompany?.progress || 0}
						/>
						<div className="questionaries-container">
							{companies.length === 0 ? (
								<p>Não há nenhuma outra empresa para ser listada</p>
							) : (
								<>
									{selectedQuestionary && (
										<div className="questionary" key={selectedQuestionary._eq}>
											<p className="questionary-title">
												Questionário:{' '}
												{selectedQuestionary.name
													? selectedQuestionary.name
													: '(Questionário sem nome)'}
											</p>
											<ProgressGraph
												percentage={selectedQuestionary.percentage || 0}
												size={14}
											/>
										</div>
									)}
									{questionaries.map(questionary => (
										<div className="questionary" key={questionary._eq}>
											<p className="questionary-title">
												Questionário:{' '}
												{questionary.name
													? questionary.name
													: '(Questionário sem nome)'}
											</p>
											<ProgressGraph
												percentage={questionary.percentage || 0}
												size={14}
											/>
										</div>
									))}
								</>
							)}
						</div>
					</div>
					<div className="groupings-progress">
						<h3>Agrupamentos</h3>
						<div className="groupings-container">
							{companies.length === 0 ? (
								<p>Não há nenhuma outra empresa para ser listada</p>
							) : (
								selectedQuestionary?.groupings.map(grouping => (
									<div
										className="grouping"
										key={grouping._eq}
										onClick={() => handleOpenGrouping(grouping._eq)}
										role="presentation"
									>
										<p className="grouping-title">{grouping.name}</p>
										<div className="graph">
											<ProgressGraph
												percentage={grouping.percentage || 0}
												size={22}
											/>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</Body>
		</Container>
	)
}
