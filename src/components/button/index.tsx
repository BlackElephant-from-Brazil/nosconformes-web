import React from 'react'
import excelIcon from 'assets/excel-icon.png'
import { StyledButton } from './styles'

export type ButtonProps = {
	text: string
	variant: 'primary' | 'secondary' | 'primary-orange' | 'excel' | 'danger'
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	icon?: JSX.Element
	type?: 'submit' | 'button' | 'reset'
	testid?: string
}

const Button: React.FC<ButtonProps> = ({
	text,
	variant,
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
			buttonstyle={variant}
			endIcon={icon || null}
		>
			{text}
			{variant === 'excel' && <img src={excelIcon} alt="Ícone do excel" />}
		</StyledButton>
	)
}

export { Button }
