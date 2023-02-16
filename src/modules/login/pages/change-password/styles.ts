import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	min-height: 100vh;
	width: 100vw;
	max-width: 1440px;
	margin: 0 auto;
`

export const Describer = styled.div`
	background: #0f141e;
	display: flex;
	flex-direction: column;
	padding: 40px;
	padding-right: 0;

	img.dm11-logo {
		width: 218px;
		margin-top: 40px;
	}

	h2 {
		color: #ffffff;
		font-weight: bold;
		font-family: 'Inter', sans-serif;
		font-size: 30px;
		max-width: 600px;
		margin-left: 26px;
		padding-right: 40px;
	}

	img.dashboard-login {
		margin-top: 90px;
		max-width: 100%;
		height: auto;
		object-fit: cover;
		object-position: right top;
	}
`

export const FormChangePassword = styled.div`
	background: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40px;
	min-width: 642px;

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		img.dm11-rounded-logo {
			width: 134px;
			height: 124px;
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

			p.pass-advise {
				font-family: 'Inter';
				font-style: normal;
				font-weight: 500;
				font-size: 20px;
				color: #323e57;
				margin-bottom: 20px;
			}
		}

		.pass-error {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 6px 12px 6px 11px;
			margin-bottom: 12px;
			gap: 10px;

			width: 481px;
			height: 69px;

			background: #ffadc6;
			border-radius: 8px;

			svg {
				color: #ff2163;
			}

			span {
				width: 383px;
				height: 34px;

				font-family: 'Inter';
				font-style: normal;
				font-weight: 600;
				font-size: 14px;
				line-height: 17px;

				color: #ff2163;
			}
		}
	}

	.footer {
		position: absolute;
		margin-bottom: 20px;
		justify-self: flex-end;
		bottom: 0;
		display: flex;
		flex-direction: column;

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

	@media (max-height: 760px) {
		.content {
			margin-top: 40px;
		}

		.footer {
			position: relative;
			margin-top: 40px;
			margin-bottom: 0;
		}
	}
`
