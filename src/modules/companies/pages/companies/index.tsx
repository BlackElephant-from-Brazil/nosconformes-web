import React, { useEffect, useRef, useState } from 'react'
import { Header } from 'components/header'
import BusinessIcon from '@mui/icons-material/Business'
import { Input } from 'components/input'
import { Button } from 'components/button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { RightDrawer } from 'components/right-drawer'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import { api } from 'api'
import { useNavigate } from 'react-router-dom'
import { Company } from 'interfaces/company.type'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { AddCompanyTabs } from 'modules/companies/components/add-company-tabs'
import { handleApiError } from 'utils/handle-api-error'
import { Body } from 'components/body'
import { handleCompanyImageError } from 'utils/handle-image-error'
import { CompanyGraph } from 'components/company-graph'
import { CompanyStatus } from 'components/company-status'
import { formatSite } from 'utils/format-site'
import {
	Container,
	AddNewCompanyContainerDrawer,
	CompaniesList,
	CompanyItem,
} from './styles'

type SearchForm = {
	search: string
}

export const Companies: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [companies, setCompanies] = useState<Company[]>([])
	const navigate = useNavigate()
	const formSearchInputRef = useRef<FormHandles>(null)
	const [activeCompanyId, setActiveCompanyId] = useState('')
	const graphDivRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/companies')
				if (data.length === 0) {
					navigate('/cadastre-sua-primeira-empresa')
					return
				}
				setCompanies(data)
				setActiveCompanyId(data[0]._eq)
				setIsLoading(false)
			} catch (err: any) {
				if (err.response.status !== 401) {
					handleApiError(err)
				}
			}
		})()
	}, [navigate])

	const toggleDrawer = () => setDrawerOpen(!drawerOpen)

	const handleUpdateCompanies = async () => {
		try {
			const { data } = await api.get('/companies')
			setCompanies(data)
			toggleDrawer()
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleAddNewCompany = () => {
		toggleDrawer()
	}

	const handleSearchSubmit: SubmitHandler<SearchForm> = () => {
		return null
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchCompany')
		const { data: findCompanies } = await api.get(
			`/companies?query=${searchInputValue}`,
		)
		setCompanies(findCompanies)
	}

	const handleCompanyItemClicked = (companyId: string) => {
		setActiveCompanyId(companyId)
	}

	const handleEditCompany = () => {
		navigate(`/detalhes-da-empresa/${activeCompanyId}`)
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body cardContext isLoading={isLoading}>
				<div className="content">
					<div className="companies-list-utilities">
						<Form onSubmit={handleSearchSubmit} ref={formSearchInputRef}>
							<Input
								onChange={handleSearchInputChange}
								name="searchCompany"
								placeholder="Pesquise pelo nome da empresa ou do gestor"
								endAdornmentIcon={<SearchRoundedIcon />}
								className="search-input"
							/>
						</Form>
						<Button
							variant="primary"
							text="Criar nova empresa +"
							className="new-company-button"
							onClick={handleAddNewCompany}
						/>
					</div>
					<CompaniesList>
						<h2>Empresas ativas</h2>
						<div className="companies-container">
							<div className="companies-list">
								{companies.map(company => {
									const companyLogoRef = React.createRef<HTMLImageElement>()
									return (
										<CompanyItem
											isActive={activeCompanyId === company._eq}
											onClick={() => handleCompanyItemClicked(company._eq)}
										>
											<img
												src={company.logo}
												alt={`Logo da empresa ${company.name}`}
												ref={companyLogoRef}
												onError={() => handleCompanyImageError(companyLogoRef)}
											/>
											<div className="company-info">
												<h3>{company.name}</h3>
												<p>{company.sector || 'Varejo'}</p>
												<a href={company.site} target="_blank" rel="noreferrer">
													{formatSite(company.site)}
												</a>
											</div>
											<div className="company-graph" ref={graphDivRef}>
												<CompanyGraph points={400} size="small" />
											</div>
											<CompanyStatus status={company.status} reduced />
										</CompanyItem>
									)
								})}
							</div>
							<div className="company-profile">
								{activeCompanyId === '' ? (
									<h3>Selecione uma empresa para visualizar as informações</h3>
								) : (
									<>
										<a
											href="#"
											className="edit-company-profile"
											onClick={handleEditCompany}
										>
											Editar perfil <ModeEditIcon />
										</a>
										<h3>Esta empresa não possui pontuação</h3>
									</>
								)}
							</div>
						</div>
					</CompaniesList>
				</div>
			</Body>
			<RightDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}>
				<AddNewCompanyContainerDrawer data-testid="create-company-drawer">
					<CloseIcon
						className="close-drawer-icon"
						onClick={toggleDrawer}
						data-testid="close-drawer-button"
					/>
					<div className="drawer-body">
						<AddCompanyTabs finishRegisteringCallback={handleUpdateCompanies} />
					</div>
				</AddNewCompanyContainerDrawer>
			</RightDrawer>
		</Container>
	)
}
