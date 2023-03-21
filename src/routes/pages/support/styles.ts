import styled from 'styled-components'

export const Container = styled.div`
	min-height: 100vh;
	background: #ffffff;
	display: flex;
	flex-direction: column;

	> div:nth-child(2) {
		display: flex;
		flex: 1;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		width: 480px;
		margin: 0 auto;

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: #323e57;
			margin: 0 auto;
			margin-bottom: 38px;
		}
	}
`
