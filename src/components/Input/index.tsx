import { InputAdornment } from '@mui/material'
import React from 'react'
import { PrimaryInput } from './styles'

type InputProps = {
	label?: string,
	placeholder?: string,
	name: string,
	startAdornmentIcon?: JSX.Element,
	endAdornmentIcon?: JSX.Element,
	type?: string,
	error?: boolean,
	value?: string,
	onChange?: (value: string) => void,
	className?: string
}

const Input: React.FC<InputProps> = ({ startAdornmentIcon, endAdornmentIcon, label, name, type, error, value, onChange, placeholder, className }) => {


	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value)
	}

	return (
		<PrimaryInput
			className={className}
			variant="outlined"
			label={label}
			placeholder={placeholder}
			name={name}
			id={name}
			type={type}
			value={value}
			onChange={onChangeInput}
			error={error}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						{startAdornmentIcon}
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position='end'>
						{endAdornmentIcon}
					</InputAdornment>
				)
			}}
		/>
	)
}

export { Input }