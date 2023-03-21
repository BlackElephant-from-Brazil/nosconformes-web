import { CircularProgress } from 'components/circular-progress'
import React from 'react'
import { Container } from './styles'

type BodyProps = {
	children: React.ReactNode
	cardContext?: boolean
	isLoading?: boolean
}

export const Body: React.FC<BodyProps> = ({
	children,
	cardContext,
	isLoading,
}) => {
	return (
		<Container cardContext={cardContext} isLoading={isLoading}>
			{isLoading ? (
				<CircularProgress />
			) : (
				<div className="wrapper">{children}</div>
			)}
		</Container>
	)
}
