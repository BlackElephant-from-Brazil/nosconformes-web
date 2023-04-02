import React, { useEffect } from 'react'
import { FormHandles } from '@unform/core'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import FaceIcon from '@mui/icons-material/Face'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Select, SelectChangeEvent } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import { AccessLevelType } from 'interfaces/access-levels.type'
import { Container, MenuItem } from './styles'

type AccessLevelInputProps = {
	accessLevel: AccessLevelType
	name: string
	formRef: React.RefObject<FormHandles>
	isEmployee?: boolean
}

export const AccessLevelInput: React.FC<AccessLevelInputProps> = ({
	accessLevel,
	name,
	formRef,
	isEmployee = false,
}) => {
	const [selectedAccessLevel, setSelectedAccessLevel] =
		React.useState<AccessLevelType>(accessLevel)

	useEffect(() => {
		setSelectedAccessLevel(accessLevel)
	}, [accessLevel])

	const handleAccessLevelChange = (
		event: SelectChangeEvent<AccessLevelType>,
	) => {
		setSelectedAccessLevel(event.target.value as AccessLevelType)
		formRef.current?.setFieldValue('accessLevel', event.target.value)
	}

	return (
		<Container accessLevel={selectedAccessLevel}>
			<p>{name}</p>
			{selectedAccessLevel &&
				(isEmployee ? (
					<Select
						onChange={handleAccessLevelChange}
						className="select-access-level"
						value={selectedAccessLevel}
						MenuProps={{
							componentsProps: {
								root: {
									// this class "access-level-menu" is in globalStyles.ts file because of the MUI engeneering
									className: 'access-level-menu',
								},
							},
						}}
					>
						<MenuItem value="patrocinador" className="patrocinador">
							<GroupsIcon />
							Patrocinador
						</MenuItem>
						<MenuItem value="stackholder" className="stackholder">
							<FaceIcon />
							Stackholder
						</MenuItem>
					</Select>
				) : (
					<Select
						onChange={handleAccessLevelChange}
						className="select-access-level"
						value={selectedAccessLevel}
						MenuProps={{
							componentsProps: {
								root: {
									// this class "access-level-menu" is in globalStyles.ts file because of the MUI engeneering
									className: 'access-level-menu',
								},
							},
						}}
					>
						<MenuItem value="master" className="master">
							<ChromeReaderModeIcon />
							Master
						</MenuItem>
						<MenuItem value="consultor" className="consultor">
							<AnalyticsIcon />
							Consultor
						</MenuItem>
						<MenuItem value="gestor" className="gestor">
							<FaceIcon />
							Gestor
						</MenuItem>
						<MenuItem value="auditor" className="auditor">
							<AccountBoxIcon />
							Auditor
						</MenuItem>
					</Select>
				))}
		</Container>
	)
}
