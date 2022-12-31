import React from 'react'
import { StyledButton } from './styles'

export type ButtonVariations = 'primary' | 'secondary'

type ButtonProps = {
	text: string,
	buttonStyle: ButtonVariations,
	onClick?: () => void,
	className?: string
}

const Button: React.FC<ButtonProps> = ({ text, buttonStyle, onClick, className }) => {
	const onClickButton = (): void => {
		onClick?.()
	}

	return (
		<StyledButton
			variant="contained"
			disableElevation
			onClick={() => { onClickButton() }}
			className={className}
			buttonStyle={buttonStyle}
		>
			{text}
		</StyledButton>
	)
}

export { Button }