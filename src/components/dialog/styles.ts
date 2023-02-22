/* eslint-disable prettier/prettier */
import { Dialog, styled } from '@mui/material'

type ContainerProps = {
	variant?: 'default' | 'bottom_right'
}

export const Container = styled(Dialog)<ContainerProps>`
	border-radius: 20px;

	.MuiPaper-root {
		border-radius: 20px;

		${({ variant }) => {
		if (variant === 'bottom_right') {
			return `
					position: absolute;
					bottom: 0px;
					right: 60px;
				`
		}
	}}
	}
`
