import React, { useEffect, useState } from 'react'
import { Header } from '../../../../components/Header'
import { Container, Body, CardContainer, AddNewCompanyContainerDrawer } from './styles'
import BusinessIcon from '@mui/icons-material/Business'
import { CompanyCard } from '../../components/company-card'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { RightDrawer } from '../../../../components/RightDrawer'
import CloseIcon from '@mui/icons-material/Close'
import { AddCompanyTabs } from '../../components/add-company-tabs'
import { Form } from '@unform/web'
import { SubmitHandler } from '@unform/core'
import { api } from '../../../../api'
import { Company } from '../../../../@types/company.type'
import { useNavigate } from 'react-router-dom'

type SearchForm = {
	search: string
}

export const Companies: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [companies, setCompanies] = useState<Company[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			try {
				const { data } = await api.get('/companies')
				if (data.length === 0) {
					navigate('/cadastre-sua-primeira-empresa')
					return
				}
				setCompanies(data)
			} catch (err) {
				console.log(err)
			}
		})()
	}, [])

	const toggleDrawer = () => setDrawerOpen(!drawerOpen)

	const handleAddNewCompany = () => {
		toggleDrawer()
	}

	const handleSearchSubmit: SubmitHandler<SearchForm> = (data) => {
		console.log(data)
		return
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body>
				<div className="companies-list-utilities">
					<Form onSubmit={handleSearchSubmit}>
						<Input name='searchCompany' placeholder='Pesquise pelo nome da empresa ou do gestor' endAdornmentIcon={<SearchRoundedIcon />} className='search-input' />
					</Form>
					<Button buttonStyle='primary' text='Criar nova empresa +' className='new-company-button' onClick={handleAddNewCompany} />
				</div>
				<CardContainer>
					{
						companies.map(company => (
							<CompanyCard
								key={company._eq}
								companyId={company._eq}
								companyLogo={company.logo}
								companyName={company.name}
								managerName={company.manager}
								status={company.status}
								auditors={company.auditors}
								testid="company-card"
							/>
						))
					}

				</CardContainer>
			</Body>
			<RightDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}>
				<AddNewCompanyContainerDrawer data-testid="create-company-drawer">
					<CloseIcon className='close-drawer-icon' onClick={toggleDrawer} data-testid="close-drawer-button" />
					<div className="drawer-body">
						<AddCompanyTabs
							finishRegisteringCallback={toggleDrawer}
						/>
					</div>
				</AddNewCompanyContainerDrawer>
			</RightDrawer>
		</Container>
	)
}