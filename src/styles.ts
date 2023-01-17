import styled from 'styled-components'

type AppContainerProps = {
	authenticated: boolean
}

export const AppContainer = styled.div<AppContainerProps>`
display: flex;
`