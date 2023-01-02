import React from 'react'
import { Container } from './styles'

type DialogProps = {
	open: boolean,
	toggleOpen: () => void
	children: JSX.Element
}

export const Dialog: React.FC<DialogProps> = ({ open, toggleOpen, children }) => {
	return (
		<Container open={open} onClose={toggleOpen}>
			{children}
		</Container>
	)
}