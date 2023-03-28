import { Body } from 'components/body'
import { Header } from 'components/header'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Container } from './styles'

export const CompanyDashboard: React.FC = () => {
	return (
		<Container>
			<Header title="Dashboard" icon={<DashboardIcon />} />
			<Body>
				<p>Olá, Dashboard</p>
			</Body>
		</Container>
	)
}
