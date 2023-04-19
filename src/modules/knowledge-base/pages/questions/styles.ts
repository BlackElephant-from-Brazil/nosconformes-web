import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;

	.wrapper {
		min-height: 100%;
	}

	.questions-list-utilities {
		display: flex;

		.search-input {
			width: 440px;
		}

		.excel-button {
			margin-left: auto;
			width: 200px;
		}

		.new-question-button {
			margin-left: 12px;
			width: 220px;
		}
	}

	.table-questions {
		margin-top: 24px;
		table-layout: fixed;

		tr {
			cursor: pointer;
		}

		p.table-text {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 14px;
			color: #0f141e;
		}

		th:nth-child(1) {
			width: 50px;
		}

		th:nth-child(3),
		th:nth-child(5),
		th:nth-child(6) {
			width: 25%;
		}

		.protect {
			background: #c7faae;
			p {
				color: #69b345;
			}
		}

		.active {
			background: #d6e4ff;
		}
		.unactive {
			background: #ffffff;
		}
	}

	li.delete-question {
		color: #ff2163;
	}
`

export const AddNewQuestionContainer = styled.div`
	width: 880px;
	margin-bottom: 48px;

	.close-drawer-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
`

export const DialogBody = styled.div`
	width: 500px;
	padding: 32px;

	.close-dialog-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 22px;
		height: 22px;
		cursor: pointer;
	}

	.dialog-confirmation-text {
		display: flex;
		flex-direction: row;
		margin-top: 40px;
		margin-bottom: 34px;
		align-items: center;

		h2 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;
		}
	}
`
