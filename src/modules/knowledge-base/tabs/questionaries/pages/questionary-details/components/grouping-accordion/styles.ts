import { Accordion, styled as MUIStyled } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import styled from 'styled-components'

export const Container = MUIStyled(Accordion)`
	background: #cfd7e8;
	border-radius: 10px !important;
	box-shadow: none;

	::before {
		display: none;
	}

	.empty-space {
		flex-grow: 1;
		height: 66px;
		cursor: pointer;
	}

	.table-questionary-grouping {
		th {
			color: #6d7c99;

			:nth-child(1) {
				width: 120px;
			}
			:nth-child(2) {
				width: 30%;
			}
		}

		.question-table-row {
			background: #ffffff;

			td {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 14px;
				color: #0f141e;
			}
		}
	}
`

export const AccordionSummary = MUIStyled(MuiAccordionSummary)`
	flex-direction: row-reverse;
	cursor: default !important;

	/* & .MuiAccordionSummary-root {
		cursor: default !important;
	} */

	& .MuiAccordionSummary-expandIconWrapper {
		color: #323e57;
		stroke: #323e57;
		stroke-width: 2;
		cursor: pointer;
	}

	& .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
		transform: rotate(90deg);
		margin-right: 0px;
		cursor: pointer;
	}

	& .MuiAccordionSummary-content {
		margin-left: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.accordion-grouping-name {
			display: flex;
			align-items: center;

			.title {
				font-family: 'Inter';
				font-weight: 600;
				font-size: 20px;
				color: #323e57;
				margin-right: 12px;
			}

			svg {
				color: #323e57;
			}
		}

		.accordion-buttons {
			display: flex;

			.button-add {
				background: #cfd7e8;
				width: 220px;
			}

			.button-delete {
				background: #cfd7e8;
				width: 220px;
				color: #323e57;
			}
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
