import { Accordion, styled } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'

export const Container = styled(Accordion)`
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

export const AccordionSummary = styled(MuiAccordionSummary)`
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
