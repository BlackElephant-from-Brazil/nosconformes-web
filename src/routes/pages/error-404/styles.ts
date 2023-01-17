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
			color: #D6E4FF;
			text-shadow: 7px 0 #1F4CD5, -7px 0 #1F4CD5, 0 7px #1F4CD5, 0 -7px #1F4CD5,
             7px 7px #1F4CD5, -7px -7px #1F4CD5, 7px -7px #1F4CD5, -7px 7px #1F4CD5;

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
			color: #0F141E;
			margin-bottom: 24px;
		}

		h3 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 30px;
			color: #0F141E;
			margin-bottom: 18px;
		}

		p {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 30px;
			color: #6D7C99;
		}
	}
`