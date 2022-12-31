import { Button, styled } from '@mui/material'
import { ButtonVariations } from '.'

type PrimaryButtonProps = {
	buttonStyle: ButtonVariations,
}

export const StyledButton = styled(Button)<PrimaryButtonProps>`
	background: #1F4CD5;
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
		background: #1F4CD5;
	}

	${(props) => {
		if (props.buttonStyle === 'secondary') {
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
	}
}


`
