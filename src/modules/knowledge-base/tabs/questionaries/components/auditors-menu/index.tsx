import React from 'react'
import { MenuItem } from '@mui/material'
import { handleUserImageError } from 'utils/handle-image-error'
import { Container, MenuItemContainer } from './styles'

export type MenuItem = {
	avatar: string
	label: string
	click: () => void
	isPrimary?: boolean
}

type MenuProps = {
	open: boolean
	closeMenu: () => void
	menuItems: MenuItem[]
	menuId: string
	anchorEl: null | HTMLElement
}

export const AuditorsMenu: React.FC<MenuProps> = ({
	menuItems,
	open,
	closeMenu,
	menuId,
	anchorEl,
}) => {
	return (
		<Container open={open} onClose={closeMenu} id={menuId} anchorEl={anchorEl}>
			{menuItems.map(menuItem => {
				const auditorImageMenuRef = React.createRef<HTMLImageElement>()
				return (
					<MenuItem
						key={menuItem.label}
						onClick={menuItem.click}
						className={menuItem.isPrimary ? 'primary' : ''}
					>
						<MenuItemContainer>
							<img
								src={menuItem.avatar}
								alt={`Avatar do auditor: ${menuItem.label}`}
								ref={auditorImageMenuRef}
								onError={() => handleUserImageError(auditorImageMenuRef)}
							/>
							{menuItem.label}
						</MenuItemContainer>
					</MenuItem>
				)
			})}
		</Container>
	)
}
