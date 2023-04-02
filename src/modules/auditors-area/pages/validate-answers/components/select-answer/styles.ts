/* eslint-disable prettier/prettier */
import styled from 'styled-components'

type ContainerProps = {
	isExpanded: boolean
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	background: #ffffff;
	width: 100%;
	height: 66px;
	border-radius: 10px;
	border: 1px solid #6d7c99;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	margin-top: 32px;
	transition: 0.2s ease-in-out;
	overflow: hidden;
	z-index: 99;
	position: absolute;

	${({ isExpanded }) =>
		isExpanded &&
		`
			height: 300px;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	`}

	.selected-question {
		display: flex;
		width: 100%;
		height: 66px;
		align-items: center;
		justify-content: space-between;
		padding-left: 20px;
		padding-right: 20px;
		flex-shrink: 0;
		cursor: pointer;

		h3 {
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;
		}

		svg {
			width: 42px;
			height: 42px;
			color: #6d7c99;
			transition: 0.2s ease-in-out;

			${({ isExpanded }) => isExpanded && `
					transform: rotate(180deg);
			`}
		}
	}

	.unclickable {
		cursor: inherit;
	}

	.question-list {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		overflow-y: auto;

		h3 {
			padding: 20px;
			width: 100%;
			cursor: pointer;
			margin-top: 20px;

			:hover {
				background: #F2F4F8;
			}

			:last-child {
				margin-bottom: 20px;
			}
		}
	}
`
