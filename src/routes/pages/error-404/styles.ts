import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding-top: 80px;

	.top {
		display: flex;
		justify-content: space-between;

		h1 {
			margin-top: auto;
			font-family: 'Inter';
			font-weight: 900;
			font-size: 200px;
			color: #d6e4ff;
			text-shadow: 7px 0 #1f4cd5, -7px 0 #1f4cd5, 0 7px #1f4cd5, 0 -7px #1f4cd5,
				7px 7px #1f4cd5, -7px -7px #1f4cd5, 7px -7px #1f4cd5, -7px 7px #1f4cd5;
		}
		img {
			margin-top: auto;
			max-width: 700px;
		}
	}

	.bottom {
		display: flex;
		flex-direction: column;
		margin-top: 24px;

		h2 {
			font-family: 'Inter';
			font-weight: 900;
			font-size: 50px;
			color: #0f141e;
			margin-bottom: 24px;
		}

		h3 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 30px;
			color: #0f141e;
			margin-bottom: 18px;
		}

		p {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 30px;
			color: #6d7c99;
		}
	}
`
