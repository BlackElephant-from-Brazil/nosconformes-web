import styled from 'styled-components'

export const SelectQuestionHeader = styled.div`
	display: flex;
	align-items: center;

	h3 {
		margin-left: 14px;
		color: #0f141e;
		font-size: 20px;
	}
`

export const Search = styled.div`
	width: 560px;
	margin-top: 24px;
`

export const TableQuestions = styled.div`
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
`

export const SaveQuestionsButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;

	.save-questions-button {
		background: #d6e4ff;
		border: 1px solid #1f4cd5;
		color: #1f4cd5;
		margin-top: 24px;
		width: fit-content;

		:hover {
			background: #1f4cd5;
			color: #ffffff;
		}
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
