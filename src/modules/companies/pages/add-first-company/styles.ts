import styled from 'styled-components'

type CreateYourFirstCompanyScreenProps = {
	isRegistering: boolean
}

export const Container = styled.div`
	background: #ffffff;
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
	display: ${({ isRegistering }) => (isRegistering ? 'none' : 'flex')};
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 30px;
		color: #0f141e;
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
		}
	}

	.bt-add-first-company {
		margin-top: 76px;
		max-width: 292px;
	}
`
