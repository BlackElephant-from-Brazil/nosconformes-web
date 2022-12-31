import styled from 'styled-components'

type CreateYourFirstCompanyScreenProps = {
	active: boolean
}
type AddCompanyDataProps = {
	active: boolean
}
type AddManagerDataProps = {
	active: boolean
}

export const Container = styled.div`
	background: #FFFFFF;
	display: flex;
	width: 100vw;
	min-height: 100vh;
	flex-direction: column;
`

export const Body = styled.ul`
	width: 724px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;


`

export const CreateYourFirstCompanyScreen = styled.li<CreateYourFirstCompanyScreenProps>`
	width: 100%;
	display: ${({ active }) => active ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;


	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0F141E;
		margin-top: 200px;
	}

	.form-steps {
		margin-top: 74px;
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
			color: #3366FF;
			align-items: center;

			span {
				width: 64px;
				height: 64px;
				background: #84A9FF;
				border-radius: 12px;
				color: #1F4CD5;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 26px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
			}
		}
	}

	.bt-add-first-company {
		margin-top: 76px;
		max-width: 292px;
	}
`

export const AddCompanyData = styled.li<AddCompanyDataProps>`
	width: 513px;
	display: ${({ active }) => active ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;

	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0F141E;
		margin-top: 48px;
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
			color: #3366FF;
			align-items: center;

			span {
				width: 64px;
				height: 64px;
				background: #84A9FF;
				border-radius: 12px;
				color: #1F4CD5;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 26px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
			}

			.active {
				color: #FFFFFF;
				background: #1F4CD5;
			}
		}
	}

	h2 {
		font-family: 'Inter';
		font-weight: 600;
		font-size: 24px;
		color: #323E57;
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
			color: #6D7C99;
		}

		p {
			font-family: 'Inter';
			font-size: 12px;
			color: #FFFFFF;
			font-weight: 700;
			text-align: center;
		}
	}

	form {
		width: 100%;
	}
`

export const AddManagerData = styled.li<AddManagerDataProps>`
	width: 513px;
	display: ${({ active }) => active ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;

	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0F141E;
		margin-top: 48px;
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
			color: #3366FF;
			align-items: center;

			span {
				width: 64px;
				height: 64px;
				background: #84A9FF;
				border-radius: 12px;
				color: #1F4CD5;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 26px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
			}

			.active {
				color: #FFFFFF;
				background: #1F4CD5;
			}
		}
	}

	.form-title {
		display: flex;
		width: 100%;

		.back-button {
			background: #1F4CD5;
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
				background: #1F4CD5;
			}

			svg {
				width: 24px;
				height: 24px;
				color: #FFFFFF;
			}
		}

		h2 {
			margin: 0 auto;
			font-family: 'Inter';
			font-weight: 600;
			font-size: 24px;
			color: #323E57;
			margin-bottom: 46px;
			vertical-align: middle;
		}
	}

	.form-manager-button-container {
		display: flex;

		.jump-buttom {
			max-width: 148px;
			margin-right: 20px;
		}
	}

`
