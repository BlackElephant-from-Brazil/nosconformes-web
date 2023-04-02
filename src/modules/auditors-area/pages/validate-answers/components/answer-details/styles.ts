import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px;
	border-radius: 16px;
	width: 100%;
	background: #fff;
	margin-top: 20px;

	h3.question-question {
		font-weight: 700;
		font-size: 24px;
		color: #0f141e;
	}

	.tags {
		display: flex;
		margin-top: 44px;
		max-width: 100%;
		flex-wrap: wrap;

		span {
			font-weight: 500;
			font-size: 18px;
			border-radius: 4px;
			padding: 4px 12px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			justify-content: center;

			&:not(:last-child) {
				margin-right: 10px;
			}

			&.protect {
				background: #69b345;
				color: #fff;
			}

			&.identify {
				background: #ff2163;
				color: #fff;
			}

			&.detect {
				background: #1f4cd5;
				color: #fff;
			}

			&.respond {
				background: #ff991c;
				color: #fff;
			}

			&.recover {
				background: #582be7;
				color: #fff;
			}

			&.five {
				background: #ff2163;
				color: #fff;
			}

			&.default {
				border: 1px solid #0f141e;
			}
		}
	}

	.description {
		margin-top: 44px;

		h4 {
			font-weight: 700;
			font-size: 16px;
			color: #6d7c99;
		}

		p {
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;
			margin-top: 12px;
		}
	}

	.answers {
		margin-top: 44px;

		h4 {
			font-weight: 700;
			font-size: 16px;
			color: #6d7c99;
		}

		p {
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;
			margin-top: 12px;
		}
	}
`
