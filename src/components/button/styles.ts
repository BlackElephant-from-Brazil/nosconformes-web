import { Button, styled } from '@mui/material'
import { ButtonProps } from '.'

type PrimaryButtonProps = {
	buttonstyle: ButtonProps['variant']
}

export const StyledButton = styled(Button)<PrimaryButtonProps>`
	background: #1f4cd5;
	font-family: 'Inter';
	border-radius: 8px;
	font-size: 16px;
	height: 48px;
	font-weight: bold;
	text-transform: initial;
	width: 100%;
	margin-bottom: 10px;
	margin-top: 10px;

	:hover {
		background: #183caa;
	}

	:active {
		background: #1f4cd5;
	}

	${({ buttonstyle: buttonStyle }) => {
		if (buttonStyle === 'secondary') {
			return `
						background: #FFFFFF;
						color: #1F4CD5;

						:hover {
							background: #D6E4FF;
						}

						:active {
							background: #FFFFFF;
						}
					`
		}
		if (buttonStyle === 'primary-orange') {
			return `
				background: #FF991C;
				color: #FFFFFF;

				:hover {
					background: #e27c00;
				}

				:active {
					background: #FF991C;
				}
			`
		}
		if (buttonStyle === 'excel') {
			return `
				background: #1D7044;
				color: #FFFFFF;

				:hover {
					background: #175936;
				}

				:active {
					background: #1D7044;
				}

				img {
					margin-left: 6px;
				}
			`
		}

		if (buttonStyle === 'danger') {
			return `
				background: #FF2163;
				color: #FFFFFF;

				:hover {
					background: #e60044;
				}

				:active {
					background: #FF2163;
				}

				img {
					margin-left: 6px;
				}
			`
		}
	}}
`
