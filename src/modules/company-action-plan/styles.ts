import styled from 'styled-components'

export const ProgressIndicator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 80px;

	.arrow-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		span {
			font-weight: 500;
			font-size: 18px;
			color: #323e57;
		}

		svg {
			width: 76px;
			height: 76px;
			color: #323e57;
			margin-top: -20px;
		}
	}
`
