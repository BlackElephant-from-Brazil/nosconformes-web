import styled from 'styled-components'

export const FormContactUsContainer = styled.div`
	width: 480px;
	margin: 0 auto;

	.company-info {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 72px;

		img {
			width: 96px;
			height: 96px;
			border-radius: 50%;
		}

		h2 {
			font-weight: 700;
			font-size: 28px;
			color: #0f141e;
			margin-left: 16px;
		}
	}

	> span {
		font-weight: 600;
		font-size: 24px;
		color: #323e57;
		text-align: center;
		display: block;
		margin-top: 56px;
	}
`
