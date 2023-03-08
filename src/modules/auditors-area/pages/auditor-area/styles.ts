/* eslint-disable prettier/prettier */

import styled from 'styled-components'

type ContainerProps = {
	selectCompanyOpen: boolean
	selectQuestionaryOpen: boolean
}

export const Container = styled.div<ContainerProps>`
	width: 100%;
	height: 100%;
	min-height: 100vh;

	.wrapper {
		position: relative;
	}

	.select-company {
		display: flex;
		flex-direction: column;
		background: #ffffff;
		height: 100px;
		border-radius: 16px;
		width: 100%;
		cursor: pointer;
		transition: 0.2s ease-in-out;
		overflow: hidden;
		flex-wrap: wrap;
		z-index: 99;
		position: absolute;

		${({ selectCompanyOpen }) =>
		selectCompanyOpen &&
			`
				height: 445px;
				box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			`}

		.selected-company {
			display: flex;
			height: 100px;
			align-items: center;
			width: 100%;

			img {
				width: 50px;
				height: 50px;
				margin-left: 32px;
				object-fit: contain;
			}

			h2 {
				font-weight: 700;
				font-size: 24px;
				color: #0f141e;
				margin-left: 16px;
				margin-right: 24px;
				white-space: nowrap;
			}

			svg.expand {
				width: 42px;
				height: 42px;
				color: #1f4cd5;
				margin-left: auto;
				margin-right: 28px;
			}
		}
	}

	.space-select-company {
		height: 100px;
	}

	.select-questionary {
		flex-direction: column;
		overflow: hidden;
		flex-wrap: wrap;
		z-index: 98;
		margin-top: 28px;
		display: flex;
		background: #ffffff;
		height: 78px;
		align-items: center;
		border-radius: 16px;
		width: 100%;
		cursor: pointer;
		transition: 0.2s ease-in-out;
		position: absolute;

		${({ selectQuestionaryOpen }) =>
		selectQuestionaryOpen &&
			`
				height: 445px;
				box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			`}

		.selected-questionary {
			display: flex;
			height: 78px;
			align-items: center;
			width: 100%;

			p {
				font-weight: 500;
				font-size: 18px;
				color: #6d7c99;
				margin-left: 28px;

				span {
					margin-left: 14px;
					font-weight: 700;
					font-size: 22px;
					color: #0f141e;
				}
			}

			svg.expand {
				width: 42px;
				height: 42px;
				color: #1f4cd5;
				margin-left: auto;
				margin-right: 28px;
			}
		}
	}

	.space-select-questionary {
		margin-top: 28px;
		height: 78px;
	}

	.progress-container {
		margin-top: 36px;
		display: flex;
		justify-content: space-between;
		transition: 0.2s ease-in-out;

		.questionaries-progress {
			width: 37%;
			h3 {
				font-weight: 700;
				font-size: 22px;
				color: #0f141e;
				margin-bottom: 40px;
			}

			.questionaries-container {
				display: flex;
				flex-direction: column;
				margin-top: 10px;

				.questionary {
					margin-top: 42px;

					p.questionary-title {
						font-weight: 500;
						font-size: 18px;
						color: #0f141e;
						margin-bottom: 16px;
						white-space: nowrap;
						text-overflow: ellipsis;
						max-width: calc(100% - 60px);
						overflow: hidden;
					}
				}
			}
		}

		.groupings-progress {
			width: 58%;
			h3 {
				font-weight: 700;
				font-size: 22px;
				color: #0f141e;
			}

			.groupings-container {
				margin-top: 10px;
				display: flex;
				flex-direction: column;

				.grouping {
					margin-top: 20px;
					background: #ffffff;
					display: flex;
					align-items: center;
					height: 80px;
					border-radius: 16px;
					justify-content: space-between;
					padding: 0 32px;
					cursor: pointer;

					p.grouping-title {
						font-weight: 700;
						font-size: 22px;
						color: #0f141e;
						white-space: nowrap;
						text-overflow: ellipsis;
						max-width: 35%;
						overflow: hidden;
					}

					.graph {
						width: 50%;
					}
				}
			}
		}
	}
`
