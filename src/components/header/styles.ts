import styled from 'styled-components'

export const Container = styled.div`
	background: #e9eff5;
	width: 100vw;
	height: 168px;

	.content {
		display: flex;
		flex-direction: row;
		max-width: 1300px;
		width: 100%;
		margin: 0 auto;
		padding: 0 48px;
		align-items: center;
		height: 100%;

		h1 {
			font-family: 'Inter';
			font-weight: bold;
			font-size: 40px;
			margin-left: 8px;
			color: #0f141e;
		}

		svg {
			font-size: 40px;
		}
	}
`
