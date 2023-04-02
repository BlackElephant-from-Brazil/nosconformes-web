import styled from 'styled-components'

export const Container = styled.div`
	height: 100vh;

	.wrapper {
		height: calc(100vh - 232px);
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		.bottom-buttons-group {
			display: flex;
			justify-content: space-between;
			align-items: center;

			button:first-child {
				background: transparent;
				border: 1px solid #1f4cd5;
				width: 200px;
			}

			button:last-child {
				width: 200px;
			}

			.button-chat {
				background: #6d7c99;
				height: 80px;
				border-radius: 40px;
				font-weight: 500;
				font-size: 24px;
				width: 300px;

				:hover {
					background: #56627b;
				}

				svg {
					width: 38px;
					height: 38px;
				}
			}

			.has-message {
				display: flex;
				align-items: center;
				justify-content: center;

				&.unread {
					position: relative;
					.dot {
						width: 14px;
						height: 14px;
						border-radius: 50%;
						background: #ff2163;
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}
		}
	}
`

export const GroupingProgress = styled.div`
	.grouping-name {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
		margin-top: 40px;

		p {
			font-weight: 500;
			font-size: 30px;
			color: #6d7c99;

			span {
				font-weight: 700;
				font-size: 30px;
				color: #6d7c99;
			}
		}
	}
`

export const QuestionDetails = styled.div`
	.question-title {
		.progress {
			font-weight: 500;
			font-size: 24px;
			color: #323e57;
			text-align: center;
		}

		h2 {
			font-weight: 700;
			font-size: 34px;
			color: #0f141e;
			max-width: 600px;
			margin: 0 auto;
			margin-top: 10px;
			text-align: center;
		}
	}

	.description {
		display: flex;
		background: #d6e4ff;
		border: 2px solid #1f4cd5;
		border-radius: 8px;
		padding: 20px;
		max-width: 800px;
		margin: 0 auto;
		margin-top: 40px;

		p {
			font-weight: 500;
			font-size: 20px;
			color: #0f141e;
		}
	}

	.conformity-button-group {
		display: flex;
		justify-content: space-between;
		max-width: 800px;
		margin: 0 auto;
		margin-top: 40px;

		.radio-button {
			display: flex;
			align-items: center;

			.MuiSvgIcon-root {
				height: 40px;
				width: 40px;
				color: #323e57;
			}

			.Mui-checked {
				.MuiSvgIcon-root {
					color: #1f4cd5;
				}
			}

			p {
				font-weight: 500;
				font-size: 24px;
				color: #323e57;
				margin-left: 8px;
			}
		}
	}
`
