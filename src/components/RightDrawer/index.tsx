import { Drawer } from '@mui/material'
import React from 'react'
import { Container } from './styles'

type RightDrawerProps = {
	drawerOpen: boolean
	toggleDrawer: () => void
	children: JSX.Element
}

export const RightDrawer: React.FC<RightDrawerProps> = ({
	drawerOpen,
	toggleDrawer,
	children,
}) => {
	return (
		<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
			<Container>{children}</Container>
		</Drawer>
	)
}
