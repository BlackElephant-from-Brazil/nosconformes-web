import React from 'react'
import excelIcon from 'assets/excel-icon.png'
import { CircularProgress } from '@mui/material'
import { StyledButton } from './styles'

export type ButtonProps = {
	text: string
	variant:
		| 'primary'
		| 'secondary'
		| 'secondary-danger'
		| 'primary-orange'
		| 'excel'
		| 'danger'
		| 'success'
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
	className?: string
	endIcon?: JSX.Element
	startIcon?: JSX.Element
	type?: 'submit' | 'button' | 'reset'
	testid?: string
	isLoading?: boolean
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
	text,
	variant,
	onClick,
	className,
	endIcon,
	startIcon,
	type,
	testid,
	isLoading,
	disabled,
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
			endIcon={endIcon || null}
			startIcon={startIcon || null}
			disabled={isLoading || disabled}
		>
			{text}
			{variant === 'excel' && <img src={excelIcon} alt="Ícone do excel" />}
			{isLoading && (
				<CircularProgress
					size={24}
					sx={{
						color: '#1F4CD5',
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-12px',
						marginLeft: '-12px',
					}}
				/>
			)}
		</StyledButton>
	)
}

export { Button }
