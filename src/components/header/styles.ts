import styled from 'styled-components'

export const Container = styled.div`
	background: #e9eff5;
	width: 100vw;
	height: auto;
	padding-left: 180px;
	padding-right: 180px;

	.header-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1440px;
		align-items: center;
		padding-top: 48px;
		padding-bottom: 48px;

		.title {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;

			h1 {
				font-family: 'Inter';
				font-weight: bold;
				font-size: 32px;
				margin-left: 8px;
				color: #0f141e;
			}

			svg {
				font-size: 32px;
			}
		}
	}

	@media (max-width: 1280px) {
		padding-left: 140px;
		padding-right: 140px;
	}
`
