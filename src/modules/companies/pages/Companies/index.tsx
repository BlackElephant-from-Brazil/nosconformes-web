import React, { useState } from 'react'
import { Header } from '../../../../components/Header'
import { Container, Body, CardContainer, AddNewCompanyContainerDrawer } from './styles'
import BusinessIcon from '@mui/icons-material/Business'
import { CompanyCard, STATUS_FINISHED, STATUS_IN_PROGRESS, STATUS_LATE } from '../../components/CompanyCard'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { RightDrawer } from '../../../../components/RightDrawer'
import CloseIcon from '@mui/icons-material/Close'
import { AddCompanyTabs } from '../../components/AddCompanyTabs'

export const Companies:React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)

	const toggleDrawer = () => setDrawerOpen(!drawerOpen)

	const handleAddNewCompany = () => {
		toggleDrawer()
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas"/>
			<Body>
				<div className="companies-list-utilities">
					<Input name='searchCompany' placeholder='Pesquise pelo nome da empresa ou do gestor' endAdornmentIcon={<SearchRoundedIcon />} className='search-input' />
					<Button buttonStyle='primary' text='Criar nova empresa +' className='new-company-button' onClick={handleAddNewCompany} />
				</div>
				<CardContainer>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_LATE}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_LATE}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_LATE}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_IN_PROGRESS}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_IN_PROGRESS}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_IN_PROGRESS}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_FINISHED}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_FINISHED}
					/>
					<CompanyCard companyLogo='https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a'
						companyName='Casas Bahia'
						managerName='Daniel'
						status={STATUS_FINISHED}
					/>
				</CardContainer>
			</Body>
			<RightDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}>
				<AddNewCompanyContainerDrawer>
					<CloseIcon className='close-drawer-icon' onClick={toggleDrawer} />
					<div className="drawer-body">
						<AddCompanyTabs />
					</div>
				</AddNewCompanyContainerDrawer>
			</RightDrawer>
		</Container>
	)
}