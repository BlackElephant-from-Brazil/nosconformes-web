/* eslint-disable indent */
import styled from 'styled-components'

type ContainerProps = {
	isExpanded: boolean
}

export const Container = styled.div<ContainerProps>`
	background: #fff;
	padding: 24px;
	border-radius: 16px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	transition: height 0.4s ease-in-out;
	height: ${({ isExpanded }) => (isExpanded ? 'fit-content' : '160px')};
	overflow: hidden;

	.animate-height {
		height: 160px;
	}

	.accordion-content {
		display: flex;
		align-items: flex-start;
		height: 150px;
		width: 100%;
		cursor: pointer;
		flex-shrink: 0;

		.base-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.question-title {
				h3 {
					font-weight: 700;
					font-size: 24px;
					color: #6d7c99;
					max-width: 800px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

					span {
						font-weight: 500;
						font-size: 20px;
					}
				}
			}

			.question-informations {
				display: flex;
				margin-top: 24px;
				align-items: center;

				.points {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50px;
					height: 50px;
					border: 2px solid #ff2163;
					border-radius: 50%;

					span {
						font-weight: 700;
						font-size: 24px;
						color: #ff2163;
					}
				}

				.grouping-name {
					display: flex;
					flex-direction: column;
					margin-left: 16px;

					h3 {
						font-weight: 700;
						font-size: 20px;
						color: #0f141e;
						max-width: 400px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					span {
						font-weight: 500;
						font-size: 16px;
						color: #ff2163;
					}
				}

				.points-on-conclued {
					margin-left: 20px;
					p {
						font-weight: 700;
						font-size: 20px;
						color: #69b345;

						span {
							font-weight: 500;
							font-size: 16px;
							color: #6d7c99;
						}
					}
				}
			}
		}

		svg {
			width: 58px;
			height: 58px;
			color: #6d7c99;
			margin-top: 30px;
			margin-left: auto;
			transition: 0.2s ease-in-out;
			transform: ${({ isExpanded }) =>
				isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
		}
	}
`

export const QuestionContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	.contact {
		margin: 0 auto;
		font-weight: 500;
		font-size: 20px;
		color: #323e57;
		margin-top: 60px;

		a {
			color: #1f4cd5;
			font-weight: 700;
			text-decoration: underline;
			cursor: pointer;
		}
	}

	.question-details {
		margin: 0 auto;
		margin-top: 60px;
		max-width: 80%;

		h2 {
			font-weight: 700;
			font-size: 30px;
			color: #0f141e;
			text-align: center;
		}

		span {
			font-weight: 500;
			font-size: 20px;
			color: #323e57;
			margin-top: 48px;
			display: block;
			text-align: center;
		}
	}
`

export const AccordingAttachmentFields = styled.div`
	display: flex;
	width: 80%;
	margin: 0 auto;

	.according-button {
		display: flex;
		flex-direction: column;
		margin-top: 80px;
		width: 100%;

		.button-info {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.button-name {
				display: block;
				flex: 0.8;
				background: #f5f8fa;
				border: 1px solid #6d7c99;
				color: #6d7c99;
				border-radius: 8px;
				padding: 12px;
				font-weight: 500;
				font-size: 20px;
			}

			.bt-add-task {
				width: fit-content;
				border: 1px solid #1f4cd4;
			}
		}

		.attachment {
			display: flex;
			position: relative;
			background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%231F4CD5FF' stroke-width='8' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
			padding: 32px;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			margin-top: 32px;
			transition: 200ms ease-in-out;

			input {
				all: unset;
				opacity: 0;
				inset: 0;
				position: absolute;
			}

			svg {
				width: 42px;
				height: 42px;
				color: #1f4cd5;
			}

			p {
				font-weight: 700;
				font-size: 20px;
				color: #1f4cd5;
				margin-left: 32px;
			}

			&.dragging {
				background-color: #d6e4ff;
			}
		}

		.current-files {
			display: flex;
			margin-top: 40px;
			flex-direction: column;

			h3 {
				color: #0f141e;
				margin-bottom: 20px;
			}

			.file {
				display: flex;
				padding-top: 12px;
				padding-bottom: 12px;

				:not(:last-child) {
					border-bottom: 1px solid #6d7c99;
				}

				span {
					font-weight: 500;
					color: #323e57;
				}
			}
		}
	}
`
