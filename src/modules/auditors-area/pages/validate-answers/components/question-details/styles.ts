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

		span {
			font-weight: 500;
			font-size: 18px;
			border-radius: 4px;
			padding: 4px 12px;

			&:not(:first-child) {
				margin-left: 10px;
			}

			&.protect {
				background: #69b345;
				color: #fff;
			}

			&.extreme {
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
	}
`
