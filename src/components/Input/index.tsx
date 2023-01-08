import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
	autoFocus?: boolean
}

const Input: React.FC<InputProps> = ({ startAdornmentIcon, endAdornmentIcon, label, name, type, error, value, onChange, placeholder, className, autoFocus }) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value)
	}

	return (
		<PrimaryInput
			autoComplete={''}
			autoFocus={autoFocus}
			className={className}
			variant="outlined"
			label={label}
			placeholder={placeholder}
			name={name}
			id={name}
			type={type === 'password' && showPassword ? 'text' : type}
			value={value}
			onChange={onChangeInput}
			error={error}
			InputProps={{
				startAdornment: startAdornmentIcon ? (
					<InputAdornment position='start'>
						{startAdornmentIcon}
					</InputAdornment>
				) : null,
				endAdornment: type === 'password' ? (
					<InputAdornment position="end">
						<IconButton
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				) : (endAdornmentIcon ? (
					<InputAdornment position='end'>
						{endAdornmentIcon}
					</InputAdornment>
				) : null)
			}}
		/>
	)
}

export { Input }