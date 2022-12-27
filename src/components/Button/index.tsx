import React from 'react'
import { DangerButton, PrimaryButton } from './styles'

type ButtonProps = {
	text: string,
	variant: 'primary' | 'danger'
}


const Button: React.FC<ButtonProps> = ({ text, variant }) => {
	if (variant === 'primary') {
		return (
			<PrimaryButton
				variant="contained"
				disableElevation
			>
				{text}
			</PrimaryButton>
		)
	} else if (variant === 'danger') {
		return (
			<DangerButton
				variant="contained"
				disableElevation
			>
				{text}
			</DangerButton>
		)
	}
	return ( <a>{text}</a>  )
}

export { Button }