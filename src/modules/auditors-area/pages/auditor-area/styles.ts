/* eslint-disable prettier/prettier */

import styled from 'styled-components'


export const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;

	.wrapper {
		position: relative;
    min-height: 550px;
	}



	.space-select-company {
		height: 100px;
	}

	.select-questionary {

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

					:hover {
						border: 1px solid #1f4cd5;
					}
				}
			}
		}
	}
`

type SelectCompanyProps = {
	selectCompanyOpen?: boolean
}

export const SelectCompany = styled.div<SelectCompanyProps>`
	display: flex;
	flex-direction: row;
	background: #ffffff;
	height: 100px;
	border-radius: 16px;
	width: 100%;
	transition: 0.2s ease-in-out;
	overflow: hidden;
	flex-wrap: wrap;
	z-index: 99;
	position: absolute;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	flex-wrap: nowrap;

	${({ selectCompanyOpen }) =>
		selectCompanyOpen &&
		`
			height: 445px;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		`}

	h2.select-company {
		margin: auto 28px;
	}

	.selected-company {
		display: flex;
		height: 100px;
		align-items: center;
		width: 100%;
		flex-shrink: 0;
		cursor: pointer;

		img {
			width: 50px;
			height: 50px;
			margin-left: 32px;
			object-fit: cover;
			border-radius: 50%;
		}

		h2 {
			font-weight: 700;
			font-size: 24px;
			color: #0f141e;
			margin-left: 16px;
			margin-right: 24px;
			white-space: nowrap;

			&.no-company {
				margin-left: 28px;
			}
		}

		svg.expand {
			width: 42px;
			height: 42px;
			color: #1f4cd5;
			margin-left: auto;
			margin-right: 28px;
			transition: 0.2s ease-in-out;

			${({ selectCompanyOpen }) =>
		selectCompanyOpen &&
				`
					transform: rotate(180deg);
				`
}
		}
	}

	.selectable-companies-wrapper {
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
		min-height: calc(100% - 100px);
	}

	.selectable-companies {
		width: 450px;
		padding-left: 24px;
		margin-top: 10px;
		${({ selectCompanyOpen }) =>
		!selectCompanyOpen &&
			`
				display: none;
			`}


		.companies-list {
			display: flex;
			flex-direction: column;
			margin-top: 40px;


			.company-details {
				display: flex;
				align-items: center;
				padding-left: 16px;
				cursor: pointer;

				:hover {
					background: #F2F4F8;
				}

				:not(:first-child) {
					margin-top: 50px;
				}

				img {
					width: 50px;
					height: 50px;
					object-fit: cover;
					border-radius: 50%;
				}

				h3 {
					font-weight: 700;
					font-size: 20px;
					color: #0F141E;
					margin-left: 16px;
					white-space: nowrap;
					margin-right: auto;
				}
			}
		}
	}
`

type SelectQuestionary = {
	selectQuestionaryOpen?: boolean
}

export const SelectQuestionary = styled.div<SelectQuestionary>`
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
		flex-shrink: 0;

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
			transition: 0.2s ease-in-out;

			${({ selectQuestionaryOpen }) =>
		selectQuestionaryOpen &&
				`
					transform: rotate(180deg);
				`
}
		}

		h2.no-questionary {
			margin-left: 28px;
		}
	}

	.selectable-questionaries-wrapper {
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
		min-height: calc(100% - 100px);
	}

	.selectable-questionaries {
		width: 450px;
		padding-left: 24px;
		margin-top: 10px;
		${({ selectQuestionaryOpen }) =>
		!selectQuestionaryOpen &&
			`
				display: none;
		`}


		.questionaries-list {
			display: flex;
			flex-direction: column;
			margin-top: 10px;


			.questionary-details {
				display: flex;
				align-items: center;
				cursor: pointer;

				:hover {
					background: #F2F4F8;
				}

				p {
					padding-top: 12px;
					padding-bottom: 12px;
					font-weight: 500;
					font-size: 18px;
					color: #6D7C99;

					span {
						font-weight: 700;
						font-size: 22px;
						color: #0F141E;
					}
				}

			}
		}
	}
`