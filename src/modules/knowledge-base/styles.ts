import styled from 'styled-components'

type ContainerProps = {
	backgroundType?: string
}

export const Container = styled.div<ContainerProps>`
	max-width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #ffffff;
`
