import React from 'react'
import { Container } from './styles'

type ChipProps = {
	info: string
	className?: string
}

export const Chip: React.FC<ChipProps> = ({ info, className }) => {
	return (
		<Container className={className}>
			<p>{info}</p>
		</Container>
	)
}
