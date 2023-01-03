import styled from 'styled-components'

type ContainerProps = {
	backgroundType?: string
}

export const Container = styled.div<ContainerProps>`
	max-width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #E9EFF5;
`

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	margin-top: 52px;
`