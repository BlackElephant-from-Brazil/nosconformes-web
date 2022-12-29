import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;
	justify-content: center;
`

export const LeftSide = styled.div`
	background: #0F141E;
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 40px;

	img.dm11-logo {
		width: 218px;
		height: 98px;
		margin-top: 40px;
	}

	p {
		color: #FFFFFF;
		font-weight: bold;
		font-family: 'Inter', sans-serif;
		font-size: 30px;
		max-width: 600px;
		margin-left: 26px;
	}

	img.dashboard-login {
		position: relative;
		left: 250px;
		top: 100px;

	}
`


export const RightSide = styled.div`
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	width: 642px;
	align-items: center;
	padding: 40px;
	z-index: 9;

	img.dm11-logo {
		width: 134px;
		height: 124px;
		margin-top: 124px;
	}

	.back {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;
		gap: 12px;

		position: relative;

		width: 97px;
		height: 37px;
		right: 180px;

		margin-top: 240px;
		margin-bottom: 60px;

		&:hover {
			cursor: pointer;
		}

		svg {
			width: 37px;
			height: 37px;
			color: blue;
		}

		p {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 700;
			font-size: 16px;
			line-height: 170.4%;

			color: #1F4CD5;
		}
	}

	.message-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0px;

		width: 481px;
		height: 215px;

		.title {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 700;
			font-size: 40px;
			line-height: 48px;
			text-align: center;

			color: #0F141E;

			margin-bottom: 30px;
		}

		.message {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;

			color: #323E57;
			margin-bottom: 60px;
		}

		.mail {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 700;
			font-size: 24px;
			line-height: 29px;

			color: #323E57;
		}
	}

	div.footer {
		display: flex;
		flex-direction: column;
		margin-top: auto;

		img {
			width: 276px;
			height: 25px;
			margin-bottom: 22px;
		}

		p {
			text-align: center;
			font-family: 'Inter', sans-serif;
			font-size: 12px;
			color: #666666;
			font-weight: 400;
		}
	}
`

