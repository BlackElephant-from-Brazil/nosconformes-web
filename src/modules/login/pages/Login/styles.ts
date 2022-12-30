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

	p.welcome {
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		font-size: 40px;
		margin-top: 22px;
		margin-bottom: 44px;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 481px;

		a {
			font-family: 'Inter', sans-serif;
			font-weight: 700;
			font-size: 16px;
			text-decoration: none;
			margin-top: 16px;
			margin-bottom: 20px;
			color: #1F4CD5;
		}
	}

	.login-error {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 6px 12px 6px 11px;
		margin-bottom: 12px;
		gap: 10px;

		width: 481px;
		height: 69px;

		background: #FFADC6;
		border-radius: 8px;

		svg {
			color: #FF2163;
		}

		span {
			width: 383px;
			height: 34px;

			font-family: 'Inter';
			font-style: normal;
			font-weight: 600;
			font-size: 14px;
			line-height: 17px;

			color: #FF2163;
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

