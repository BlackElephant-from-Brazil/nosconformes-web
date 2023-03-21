import React from 'react'
import { Container } from './styles'

type CircularProgressProps = {
	isButton?: boolean
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
	isButton,
}) => {
	return <Container isButton={isButton} />
}
