import styled from 'styled-components'

export const Container = styled.ul`
	width: 724px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;
`

export const AddCompanyData = styled.li`
	width: 513px;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0f141e;
	}

	.form-steps {
		margin-top: 54px;
		margin-bottom: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		p {
			display: flex;
			font-family: 'Inter';
			font-weight: 700;
			font-size: 18px;
			color: #3366ff;
			align-items: center;

			span {
				width: 64px;
				height: 64px;
				background: #84a9ff;
				border-radius: 12px;
				color: #1f4cd5;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 26px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
			}

			.active {
				color: #ffffff;
				background: #1f4cd5;
			}
		}
	}

	h2 {
		font-family: 'Inter';
		font-weight: 600;
		font-size: 24px;
		color: #323e57;
		margin-bottom: 46px;
	}

	.company-photo {
		background: #242424;
		width: 162px;
		height: 162px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;

		svg {
			width: 52px;
			height: 52px;
			color: #6d7c99;
		}

		p {
			font-family: 'Inter';
			font-size: 12px;
			color: #ffffff;
			font-weight: 700;
			text-align: center;
		}
	}

	form {
		width: 100%;
	}
`

export const AddManagerData = styled.li`
	width: 513px;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0f141e;
	}

	.form-steps {
		margin-top: 54px;
		margin-bottom: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		p {
			display: flex;
			font-family: 'Inter';
			font-weight: 700;
			font-size: 18px;
			color: #3366ff;
			align-items: center;

			span {
				width: 64px;
				height: 64px;
				background: #84a9ff;
				border-radius: 12px;
				color: #1f4cd5;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 26px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
			}

			.active {
				color: #ffffff;
				background: #1f4cd5;
			}
		}
	}

	.form-title {
		display: flex;
		width: 100%;

		.back-button {
			background: #1f4cd5;
			width: 38px;
			height: 38px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: background 200ms;
			margin-bottom: 20px;

			:hover {
				background: #072788;
			}

			:active {
				transition: none;
				background: #1f4cd5;
			}

			svg {
				width: 24px;
				height: 24px;
				color: #ffffff;
			}
		}

		h2 {
			margin: 0 auto;
			font-family: 'Inter';
			font-weight: 600;
			font-size: 24px;
			color: #323e57;
			margin-bottom: 46px;
			vertical-align: middle;
		}
	}

	.form-manager-button-container {
		display: flex;
		width: 100%;

		.jump-buttom {
			max-width: 148px;
			margin-right: 20px;
		}
	}
`
