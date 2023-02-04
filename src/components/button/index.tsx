import React from 'react'
import { StyledButton } from './styles'

export const BT_PRIMARY = 'primary'
export const BT_SECONDARY = 'secondary'
export const BT_PRIMARY_ORANGE = 'primary-orange'

export type ButtonVariations =
	| typeof BT_PRIMARY
	| typeof BT_SECONDARY
	| typeof BT_PRIMARY_ORANGE

type ButtonProps = {
	text: string
	buttonStyle: ButtonVariations
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	icon?: JSX.Element
	type?: 'submit' | 'button' | 'reset'
	testid?: string
}

const Button: React.FC<ButtonProps> = ({
	text,
	buttonStyle,
	onClick,
	className,
	icon,
	type,
	testid,
}) => {
	return (
		<StyledButton
			data-testid={testid}
			type={type}
			variant="contained"
			disableElevation
			onClick={e => {
				onClick?.(e)
			}}
			className={className}
			buttonstyle={buttonStyle}
			endIcon={icon || null}
		>
			{text}
		</StyledButton>
	)
}

export { Button }
