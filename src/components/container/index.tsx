import React from 'react'

import { Container as StyledContainer } from './styles'

type ContainerProps = {
	children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
	return <StyledContainer>{children}</StyledContainer>
}
