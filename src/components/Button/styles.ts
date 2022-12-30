import { Button, styled } from '@mui/material'

export const PrimaryButton = styled(Button)`
	background: #1F4CD5;
	font-family: 'Inter';
	border-radius: 8px;
	font-size: 16px;
	height: 48px;
	font-weight: bold;

	:hover {
		background-color: #072788;
	}

	:active {
		background-color: #1F4CD5;
	}
`

export const DangerButton = styled(Button)`
	background: #FF2163;
	font-family: 'Inter';
	border-radius: 8;
	font-size: 16px;
	height: 48px;
	font-weight: bold;

	:hover {
		background-color: #072788;
	}

	:active {
		background-color: #1F4CD5;
	}
`