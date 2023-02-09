import { Header } from 'components/header'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People'
import { Container } from './styles'

export const AuditorArea: React.FC = () => {
	return (
		<Container>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
		</Container>
	)
}
