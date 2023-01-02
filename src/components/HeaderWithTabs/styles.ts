import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: #E9EFF5;
	width: 100vw;
	min-height: 168px;

	.header-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 66px;
		margin-bottom: 54px;
		margin-left: 176px;

		h1 {
			font-family: 'Inter';
			font-weight: bold;
			font-size: 40px;
			margin-left: 8px;
			color: #0F141E;
		}

		svg {
			font-size: 40px;
		}
	}


`

export const Tabs = styled.ul`
	display: flex;
	width: 100%;
	list-style: none;
	margin-left: 176px;

	li {
		margin-right: 50px;
		cursor: pointer;

		p {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 24px;
			color: #6D7C99;
			margin-bottom: 18px;
		}

	}

	.active {
		border-bottom: 4px solid #1F4CD4;

		p {
			font-weight: 700;
			color: #0F141E;
		}
	}
`