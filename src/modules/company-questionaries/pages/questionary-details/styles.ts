import styled from 'styled-components'

export const Container = styled.div`
	.wrapper {
		position: relative;
		min-height: 500px;
	}

	.tabs {
		display: flex;
		flex-direction: column;

		.tabs-title {
			margin-top: 52px;
			width: 450px;
		}
	}

	.no-groupings {
		font-weight: 700;
		font-size: 22px;
		color: #0f141e;
		margin-top: 24px;
	}

	.space-select-questionary {
		height: 78px;
	}
`

type SelectQuestionaryProps = {
	isOpen: boolean
}
export const SelectQuestionary = styled.div<SelectQuestionaryProps>`
	position: absolute;
	width: 100%;
	height: ${({ isOpen }) => (isOpen ? '420' : '78')}px;
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: 16px;
	border: 2px dashed #1f4cd5;
	transition: 0.3s ease-in-out;
	z-index: 99;
	cursor: pointer;
	${({ isOpen }) =>
		isOpen &&
		`
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		`}

	.selected-questionary {
		display: flex;
		align-items: center;
		height: 78px;
		padding: 26px;
		justify-content: space-between;
	}

	.questionaries {
		display: flex;
		flex-direction: column;
		overflow: ${({ isOpen }) => (isOpen ? 'auto' : 'hidden')};
		padding: 26px;

		.no-questionaries {
			font-weight: 700;
			font-size: 22px;
			color: #0f141e;
		}

		p {
			padding: 26px;
			border-radius: 8px;

			:not(.no-questionaries):hover {
				cursor: pointer;
				background: #e8e8e8;
			}
		}
	}

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
