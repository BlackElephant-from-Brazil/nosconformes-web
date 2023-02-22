import React from 'react'
import { Container } from './styles'

type DialogProps = {
	open: boolean
	toggleOpen: () => void
	children: JSX.Element
	variant?: 'default' | 'bottom_right'
}

export const Dialog: React.FC<DialogProps> = ({
	open,
	toggleOpen,
	children,
	variant,
}) => {
	return (
		<Container open={open} onClose={toggleOpen} variant={variant}>
			{children}
		</Container>
	)
}
