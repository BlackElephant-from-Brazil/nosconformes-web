import styled from 'styled-components'

export const TableContent = styled.table`
	border-collapse: collapse;
	width: 100%;

	tr {
		border-bottom: 1px solid #6f7987 !important;
	}

	th {
		text-align: start;
		font-family: 'Arial';
		font-weight: 700;
		font-size: 16px;
		color: #242424;
		padding-bottom: 8px;
	}

	td {
		padding-top: 18px;
		padding-bottom: 18px;
	}
`

export const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;

	.pagination {
		display: flex;
		flex-direction: row;
		margin-top: 32px;
		align-items: center;

		svg {
			width: 24px;
			height: 24px;
			color: #0f141e;
			cursor: pointer;
			/* margin-left: 14px;
			margin-right: 14px; */
		}

		.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		a {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 16px;
			color: #000000;
			width: 32px;
			height: 32px;
			text-decoration: none;
			text-align: center;
			margin: auto 0;
			display: inline-block;
			line-height: 32px;
		}

		a.active {
			color: #ffffff;
			background: #1f4cd4;
			border-radius: 8px;
			transition: background 0.2s;

			:hover {
				background: #072788;
			}
			:active {
				transition: none;
				background: #1f4cd5;
			}
		}
	}
`
