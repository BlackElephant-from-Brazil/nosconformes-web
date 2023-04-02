import React from 'react'
import { Container } from './styles'

type ContextMenuProps = {
	children: React.ReactNode
	mousePosition: { x: number | null; y: number | null }
	handleClose: () => void
	anchorEl: any
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
	children,
	mousePosition,
	handleClose,
	anchorEl,
}) => {
	return (
		<Container
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={
				mousePosition.y !== null && mousePosition.x !== null
					? { top: mousePosition.y, left: mousePosition.x }
					: undefined
			}
		>
			{children}
		</Container>
	)
}
