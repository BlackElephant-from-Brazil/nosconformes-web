import styled from 'styled-components'

export const Container = styled.div`
	background: #242424;
	width: 162px;
	height: 162px;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;

	.filled-image {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;

		img {
			width: 162px;
			height: 162px;
			object-fit: cover;
			border-radius: 50%;
			flex-shrink: 0;
		}

		.buttons {
			display: flex;

			button {
				margin-left: 8px;
			}
		}
	}

	.insert-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		cursor: pointer;

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
`
