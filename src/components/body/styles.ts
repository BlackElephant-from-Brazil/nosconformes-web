import styled from 'styled-components'

type ContainerProps = {
	cardContext?: boolean
	isLoading?: boolean
}

export const Container = styled.div<ContainerProps>`
	overflow-y: auto;
	width: 100vw;
	padding-left: 180px;
	padding-right: 180px;
	flex: 1;
	background: ${({ cardContext }) => (cardContext ? '#e9eff5' : '#fff')};

	${({ isLoading }) =>
		isLoading &&
		`
		display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
	`}

	.wrapper {
		width: 100%;
		max-width: 1440px;
		margin: 48px auto;
	}

	@media (max-width: 1280px) {
		padding-left: 140px;
		padding-right: 140px;
	}
`
