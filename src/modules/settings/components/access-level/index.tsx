import React from 'react'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import FaceIcon from '@mui/icons-material/Face'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import GroupsIcon from '@mui/icons-material/Groups'
import { Container } from './styles'

type AccessLevelProps = {
	accessLevel:
		| 'master'
		| 'patrocinador'
		| 'stackholder'
		| 'gestor'
		| 'consultor'
		| 'auditor'
}

export const AccessLevel: React.FC<AccessLevelProps> = ({ accessLevel }) => {
	const renderContent = () => {
		switch (accessLevel) {
			case 'master':
				return (
					<>
						<AccountBoxIcon />
						<p>Master</p>
					</>
				)
			case 'consultor':
				return (
					<>
						<AnalyticsIcon />
						<p>Consultor</p>
					</>
				)
			case 'gestor':
				return (
					<>
						<FaceIcon />
						<p>Gestor</p>
					</>
				)
			case 'auditor':
				return (
					<>
						<ChromeReaderModeIcon />
						<p>Auditor</p>
					</>
				)
			case 'stackholder':
				return (
					<>
						<FaceIcon />
						<p>Stackholder</p>
					</>
				)
			case 'patrocinador':
				return (
					<>
						<GroupsIcon />
						<p>Patrocinador</p>
					</>
				)
			default:
				return null
		}
	}
	return <Container accessLevel={accessLevel}>{renderContent()}</Container>
}
