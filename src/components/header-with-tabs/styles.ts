import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	background: #e9eff5;
	width: 100vw;
	height: auto;
	padding-left: 180px;
	padding-right: 180px;

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1440px;
		align-items: center;
		height: 100%;
		margin: 0 auto;

		.title {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 168px;

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

export const Tabs = styled.ul`
	display: flex;
	width: 100%;
	list-style: none;

	li {
		margin-right: 50px;
		cursor: pointer;

		p {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 24px;
			color: #6d7c99;
			margin-bottom: 18px;
		}
	}

	.active {
		border-bottom: 4px solid #1f4cd4;

		p {
			font-weight: 700;
			color: #0f141e;
		}
	}
`
