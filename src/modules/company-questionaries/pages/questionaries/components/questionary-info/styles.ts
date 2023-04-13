import { styled as muiStyled, Menu } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 32px;
	background: #fff;
	border-radius: 16px;
	width: 320px;
	margin-top: 26px;

	:not(:last-child) {
		margin-right: 16px;
	}

	h2 {
		font-weight: 500;
		font-size: 16px;
		color: #6d7c99;
	}

	h3 {
		font-weight: 700;
		font-size: 20px;
		color: #0f141e;
		margin-top: 8px;
		cursor: pointer;
	}

	.employees {
		display: flex;
		margin-top: 32px;
		align-items: center;
		cursor: pointer;

		span {
			color: #1f4cd5;
			font-weight: 700;
			font-size: 16px;
		}

		img {
			width: 46px;
			height: 46px;
			object-fit: cover;
			border-radius: 50%;
			margin-left: 12px;
			border: 4px solid white;
		}

		svg {
			color: #1f4cd5;
			width: 24px;
			height: 24px;
			margin-left: 4px;
		}
	}

	span.company-title {
		font-weight: 600;
		font-size: 18px;
		color: #323e57;
		margin-top: 32px;
	}

	.bt-add-users-to-questionary {
		margin-top: 32px;
		width: 220px;
		border: 1px solid #1f4cd5;
	}

	.company-details {
		display: flex;
		align-items: center;
		margin-top: 16px;

		img {
			width: 42px;
			height: 42px;
			border-radius: 50%;
			object-fit: cover;
		}

		p {
			font-weight: 600;
			font-size: 18px;
			color: #0f141e;
			margin-left: 8px;
		}
	}
`

export const EmployeesMenu = muiStyled(Menu)`
	.MuiPaper-root {
		border-radius: 8px;
	}

	.employees-menu-item {
		img {
			width: 46px;
			height: 46px;
			object-fit: cover;
			border-radius: 50%;
		}

		span {
			font-weight: 600;
			font-size: 18px;
			color: #0f141e;
			margin-left: 8px;
		}
	}
`
