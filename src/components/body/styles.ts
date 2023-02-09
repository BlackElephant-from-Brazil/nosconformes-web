import styled from 'styled-components'

type ContainerProps = {
	cardContext?: boolean
}

export const Container = styled.div<ContainerProps>`
	overflow-y: scroll;
	width: 100vw;

	.content {
		max-width: 1300px;
		width: 100%;
		padding: 0 48px;
		margin: 0 auto;
		display: flex;
		margin-bottom: 48px;
	}
`
