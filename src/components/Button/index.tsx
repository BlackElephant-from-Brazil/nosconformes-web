import React from 'react'
import { StyledButton } from './styles'

export const BT_PRIMARY = 'primary'
export const BT_SECONDARY = 'secondary'
export const BT_PRIMARY_ORANGE = 'primary-orange'

export type ButtonVariations = typeof BT_PRIMARY | typeof BT_SECONDARY | typeof BT_PRIMARY_ORANGE

type ButtonProps = {
	text: string
	buttonStyle: ButtonVariations
	onClick?: () => void
	className?: string
	icon?: JSX.Element
}

const Button: React.FC<ButtonProps> = ({ text, buttonStyle, onClick, className, icon }) => {
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
			endIcon={
				icon ? icon : null
			}
		>
			{text}
		</StyledButton>
	)
}

export { Button }