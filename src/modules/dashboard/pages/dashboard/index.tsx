import { Header } from 'components/header'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Container } from './styles'

export const Dashboard: React.FC = () => {
	return (
		<Container>
			<Header icon={<DashboardIcon />} title="Dashboard" />
		</Container>
	)
}
