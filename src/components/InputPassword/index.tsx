import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
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
	onChange?: (value: string) => void
}

const PasswordInput: React.FC<InputProps> = ({ startAdornmentIcon, endAdornmentIcon, label, name, type, error, value, onChange, placeholder }) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value)
	}

	if (startAdornmentIcon) {
		return (
			<PrimaryInput
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
					) : <></>,
					endAdornment: type === 'password' ? (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					) : (endAdornmentIcon ? (<InputAdornment position='start'>
						{endAdornmentIcon}
					</InputAdornment>) : (<></>))
				}}


			/>
		)
	} else {
		return (
			<PrimaryInput
				variant="outlined"
				label={label}
				name={name}
				id={name}
				value={value}
				error={error}
				onChange={onChangeInput}
			/>
		)
	}
}

export { PasswordInput }