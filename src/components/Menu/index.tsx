import { MenuItem } from '@mui/material'
import React from 'react'
import { Container } from './styles'

export type MenuItem = {
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
	className?: string
}

export const Menu: React.FC<MenuProps> = ({ menuItems, open, closeMenu, menuId, anchorEl, className }) => {
	return (
		<Container open={open} onClose={closeMenu} id={menuId} anchorEl={anchorEl} className={className}>
			{
				menuItems.map((menuItem, i) => {
					return (
						<MenuItem key={i} onClick={menuItem.click} className={menuItem.isPrimary ? 'primary' : ''}>{menuItem.label}</MenuItem>
					)
				})
			}
		</Container>
	)
}