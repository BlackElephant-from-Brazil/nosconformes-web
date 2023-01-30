import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { User } from 'interfaces/user.type'
import { Container } from './styles'

type AccessLevelProps = {
	level: User['accessLevel']
	className?: string
}

export const AccessLevel: React.FC<AccessLevelProps> = ({
	level,
	className,
}) => {
	const renderComponent = () => {
		if (level === 'master') {
			return (
				<>
					<AccountBoxIcon />
					<p>Master</p>
				</>
			)
		}
		return null
	}
	return (
		<Container level={level} className={className}>
			{renderComponent()}
		</Container>
	)
}
