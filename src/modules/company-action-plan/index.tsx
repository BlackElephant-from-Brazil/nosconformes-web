import { Body } from 'components/body'
import { Header } from 'components/header'
import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { Container } from './styles'

export const CompanyActionPlan: React.FC = () => {
	return (
		<Container>
			<Header title="Plano de ação" icon={<PendingActionsIcon />} />
			<Body>
				<p>Olá, Plano de ação</p>
			</Body>
		</Container>
	)
}
