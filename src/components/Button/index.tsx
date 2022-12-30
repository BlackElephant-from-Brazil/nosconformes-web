import React from 'react'
import { DangerButton, PrimaryButton } from './styles'

type ButtonProps = {
	text: string,
	variant: 'primary' | 'danger',
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => {
	const onClickButton = (): void => {
		onClick?.()
	}

	if (variant === 'primary') {
		return (
			<PrimaryButton
				variant="contained"
				disableElevation
				onClick={() => { onClickButton() }}
			>
				{text}
			</PrimaryButton>
		)
	} else if (variant === 'danger') {
		return (
			<DangerButton
				variant="contained"
				disableElevation
				onClick={() => { onClickButton() }}
			>
				{text}
			</DangerButton>
		)
	}
	return (
		<a
			onClick={() => { onClickButton() }}
		>
			{text}
		</a>
	)
}

export { Button }