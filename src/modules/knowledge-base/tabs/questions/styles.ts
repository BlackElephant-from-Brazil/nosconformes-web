import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

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

		p.table-text {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 14px;
			color: #0f141e;
		}

		th:nth-child(2),
		th:nth-child(4),
		th:nth-child(5) {
			width: 25%;
		}

		.protect {
			background: #c7faae;
			p {
				color: #69b345;
			}
		}
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
