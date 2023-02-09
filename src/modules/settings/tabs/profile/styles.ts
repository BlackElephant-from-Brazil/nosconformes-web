import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	.save-button {
		width: 186px;
		margin-left: auto;
		margin-top: 66px;
	}

	.form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 482px;
		align-items: center;
		margin: 0 auto;
		margin-top: 32px;

		.password-info {
			font-family: 'Inter';
			font-weight: 600;
			font-size: 14px;
			color: #6d7c99;
			margin-bottom: 16px;
			padding-left: 6px;
			padding-right: 6px;
		}
	}
`
