import React from 'react'
import excelIcon from 'assets/excel-icon.png'
import { StyledButton } from './styles'

export type ButtonProps = {
	text: string
	buttonStyle: 'primary' | 'secondary' | 'primary-orange' | 'excel'
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
			{buttonStyle === 'excel' && <img src={excelIcon} alt="Ícone do excel" />}
		</StyledButton>
	)
}

export { Button }
