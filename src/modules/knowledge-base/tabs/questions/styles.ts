import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	.users-list-utilities {
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
