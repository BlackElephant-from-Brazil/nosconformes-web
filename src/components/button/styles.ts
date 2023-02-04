import { Button, styled } from '@mui/material'
import { BT_PRIMARY_ORANGE, BT_SECONDARY, ButtonVariations } from '.'

type PrimaryButtonProps = {
	buttonstyle: ButtonVariations
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
		background: #072788;
	}

	:active {
		background: #1f4cd5;
	}

	${({ buttonstyle: buttonStyle }) => {
		if (buttonStyle === BT_SECONDARY) {
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
		if (buttonStyle === BT_PRIMARY_ORANGE) {
			return `
				background: #FF991C;
				color: #FFFFFF;

				:hover {
					background: #FF991C;
				}

				:active {
					background: #FF991C;
				}
			`
		}
	}}
`
