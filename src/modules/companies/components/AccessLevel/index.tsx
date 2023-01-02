import React from 'react'
import { Container } from './styles'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export const ACCESS_LEVEL_MASTER = 'master'
export const ACCESS_LEVEL_MANAGER = 'manager'
export const ACCESS_LEVEL_CONSULTANT = 'consultant'
export const ACCESS_LEVEL_AUDITOR = 'auditor'

export type AccessLevels = typeof ACCESS_LEVEL_MASTER | typeof ACCESS_LEVEL_MANAGER | typeof ACCESS_LEVEL_CONSULTANT | typeof ACCESS_LEVEL_AUDITOR

type AccessLevelProps = {
	level: AccessLevels
	className?: string
}

export const AccessLevel: React.FC<AccessLevelProps> = ({ level, className }) => {
	const renderComponent = () => {
		if(level === ACCESS_LEVEL_MASTER) {
			return (
				<>
					<AccountBoxIcon />
					<p>Master</p>
				</>
			)
		}
	}
	return (
		<Container level={level} className={className}>
			{renderComponent()}
		</Container>
	)
}