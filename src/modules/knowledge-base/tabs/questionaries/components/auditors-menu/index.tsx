import React from 'react'
import { MenuItem } from '@mui/material'
import { handleUserImageError } from 'utils/handle-image-error'
import { Auditor } from 'interfaces/auditor.type'
import { useNavigate } from 'react-router-dom'
import { Container, MenuItemContainer } from './styles'

type MenuProps = {
	open: boolean
	closeMenu: () => void
	auditors: Auditor[]
	menuId: string
	anchorEl: null | HTMLElement
}

export const AuditorsMenu: React.FC<MenuProps> = ({
	auditors,
	open,
	closeMenu,
	menuId,
	anchorEl,
}) => {
	const navigate = useNavigate()
	const handleOpenAuditorProfile = (auditorId: string) => {
		navigate(`/perfil/${auditorId}`)
	}
	return (
		<Container open={open} onClose={closeMenu} id={menuId} anchorEl={anchorEl}>
			{auditors.map(auditor => {
				const auditorImageMenuRef = React.createRef<HTMLImageElement>()
				return (
					<MenuItem
						key={auditor.name}
						onClick={e => handleOpenAuditorProfile(auditor._eq)}
						// className={menuItem.isPrimary ? 'primary' : ''}
					>
						<MenuItemContainer>
							<img
								src={auditor.profilePicture}
								alt={`Avatar do auditor: ${auditor.name}`}
								ref={auditorImageMenuRef}
								onError={() => handleUserImageError(auditorImageMenuRef)}
							/>
							{auditor.name}
						</MenuItemContainer>
					</MenuItem>
				)
			})}
		</Container>
	)
}
