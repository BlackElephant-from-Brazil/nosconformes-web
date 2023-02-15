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
import { CompanyCard } from 'modules/companies/components/company-card'
import { AddCompanyTabs } from 'modules/companies/components/add-company-tabs'
import { handleApiError } from 'utils/enqueueApiError'
import {
	Container,
	Body,
	CardContainer,
	AddNewCompanyContainerDrawer,
} from './styles'

type SearchForm = {
	search: string
}

export const Companies: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [companies, setCompanies] = useState<Company[]>([])
	const navigate = useNavigate()
	const formSearchInputRef = useRef<FormHandles>(null)

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const { data } = await api.get('/companies')
				if (data.length === 0) {
					navigate('/cadastre-sua-primeira-empresa')
					return
				}
				setCompanies(data)
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

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body>
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
						buttonStyle="primary"
						text="Criar nova empresa +"
						className="new-company-button"
						onClick={handleAddNewCompany}
					/>
				</div>
				<CardContainer>
					{companies.map(company => (
						<CompanyCard
							key={company._eq}
							company={company}
							testid="company-card"
						/>
					))}
				</CardContainer>
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
