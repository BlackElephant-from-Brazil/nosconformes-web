import styled from 'styled-components'

export const Container = styled.div`
	.tabs {
		display: flex;
		flex-direction: column;

		.tabs-title {
			margin-top: 52px;
			width: 450px;
		}
	}
`

type SelectQuestionaryProps = {
	isOpen: boolean
}
export const SelectQuestionary = styled.div<SelectQuestionaryProps>`
	width: 100%;
	height: 78px;
	padding: 26px;
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 16px;
	border: 2px dashed #1f4cd5;
	justify-content: space-between;
	cursor: pointer;

	.questionary-title {
		font-weight: 500;
		font-size: 18px;
		color: #6d7c99;

		.questionary-title-name {
			font-weight: 700;
			font-size: 22px;
			color: #0f141e;
			margin-left: 14px;
		}
	}

	svg {
		transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
		transition: transform 0.3s ease-in-out;
		width: 42px;
		height: 42px;
		color: #1f4cd5;
	}
`

export const GroupingItem = styled.div`
	width: 100%;
	height: 78px;
	padding: 26px;
	background: #fff;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 64px;
	padding-right: 64px;

	:first-child {
		margin-top: 46px;
	}

	:not(:first-child) {
		margin-top: 20px;
	}

	:hover {
		cursor: pointer;
		border: 1px solid #1f4cd5;
	}

	.grouping-name {
		font-weight: 700;
		font-size: 22px;
		color: #0f141e;
	}

	.graph {
		width: 450px;
	}
`
