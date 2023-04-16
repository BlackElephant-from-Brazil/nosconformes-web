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
	min-width: fit-content;

	svg {
		width: 24px;
		height: 24px;
	}

	:hover {
		background: #183caa;
	}

	:active {
		background: #1f4cd5;
	}

	${({ buttonstyle: buttonStyle }) => {
		if (buttonStyle === 'secondary') {
			return `
						background: transparent;
						color: #1F4CD5;

						:hover {
							background: #D6E4FF;
						}

						:active {
							background: #FFFFFF;
						}
					`
		}
		if (buttonStyle === 'secondary-danger') {
			return `
						background: transparent;
						color: #FF2163;

						:hover {
							background: #FFE1EA;
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

		if (buttonStyle === 'success') {
			return `
				background: #69B345;
				color: #FFFFFF;

				:hover {
					background: #538f37;
				}

				:active {
					background: #69B345;
				}

				img {
					margin-left: 6px;
				}
			`
		}
	}}
`
