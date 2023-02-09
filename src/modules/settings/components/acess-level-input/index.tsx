import React, { useEffect } from 'react'
import { FormHandles } from '@unform/core'
import { User } from 'interfaces/user.type'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import FaceIcon from '@mui/icons-material/Face'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Select, SelectChangeEvent } from '@mui/material'
import { Container, MenuItem } from './styles'

type AccessLevelInputProps = {
	accessLevel: User['accessLevel']
	name: string
	formRef: React.RefObject<FormHandles>
}

export const AccessLevelInput: React.FC<AccessLevelInputProps> = ({
	accessLevel,
	name,
	formRef,
}) => {
	const [selectedAccessLevel, setSelectedAccessLevel] =
		React.useState(accessLevel)

	useEffect(() => {
		setSelectedAccessLevel(accessLevel)
	}, [accessLevel])

	const handleAccessLevelChange = (
		event: SelectChangeEvent<'master' | 'manager' | 'consultant' | 'auditor'>,
	) => {
		setSelectedAccessLevel(event.target.value as User['accessLevel'])
		formRef.current?.setFieldValue('accessLevel', event.target.value)
	}

	return (
		<Container accessLevel={selectedAccessLevel}>
			<p>{name}</p>
			{selectedAccessLevel && (
				<Select
					onChange={handleAccessLevelChange}
					className="select-access-level"
					value={selectedAccessLevel}
					MenuProps={{
						componentsProps: {
							root: {
								// this class is in globalStyles.ts file because of the MUI engeneering
								className: 'access-level-menu',
							},
						},
					}}
				>
					<MenuItem value="master" className="master">
						<ChromeReaderModeIcon />
						Master
					</MenuItem>
					<MenuItem value="consultant" className="consultant">
						<AnalyticsIcon />
						Consultor
					</MenuItem>
					<MenuItem value="manager" className="manager">
						<FaceIcon />
						Gestor
					</MenuItem>
					<MenuItem value="auditor" className="auditor">
						<AccountBoxIcon />
						Auditor
					</MenuItem>
				</Select>
			)}
		</Container>
	)
}
