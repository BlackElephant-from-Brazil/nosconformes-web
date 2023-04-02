import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	padding: 60px;

	form {
		width: 100%;

		.id {
			margin-top: 60px;
			color: #6690ff;
			display: flex;
			align-items: center;

			h2 {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 30px;
				padding-right: 10px;
				cursor: pointer;
			}

			svg {
				width: 24px;
				height: 24px;
				cursor: pointer;
			}
		}

		.question {
			margin-top: 20px;

			input {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 30px;
				color: #0f141e;
			}
		}

		.form-autocomplete {
			margin-top: 24px;
			h3 {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 16px;
				color: #6d7c99;
				margin-bottom: 16px;

				span {
					font-size: 14px;
					font-weight: 500;
				}
			}
		}

		.form-input {
			margin-top: 20px;
		}

		.button-group-form-question {
			margin-left: auto;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			margin-top: 40px;

			.button-submit-question {
				width: 280px;
			}
		}
	}
`

export const AnswerGroup = styled.div`
	margin-top: 40px;

	.answers-group-title {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 16px;
		color: #6d7c99;
		margin-bottom: 16px;
	}

	.answer-group-item {
		h3 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 18px;
			color: #0f141e;
			margin-top: 40px;
		}

		hr {
			margin-top: 20px;
			border: 1px solid #cfd7e8;
		}

		.switch-field {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			margin-top: 16px;

			p {
				font-family: 'Inter';
				font-weight: 500;
				font-size: 16px;
				color: #0f141e;
			}
		}

		.button-field {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			.bt-add-input-field {
				width: 300px;
				border: 1px solid #1f4cd5;
			}
		}

		.input-attachment-field {
			display: flex;
			align-items: center;

			svg {
				margin-left: 10px;
				width: 32px;
				height: 32px;
				color: #ff2163;
				cursor: pointer;
			}
		}
	}
`
