import { SvgIconComponent, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, SvgIcon } from '@mui/material'
import React from 'react'
import { PrimaryInput } from './styles'

type InputProps = {
	label: string,
	name: string,
	icon?: SvgIconComponent,
	type?: string,
	error?: boolean,
	value?: string,
	onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({ icon, label, name, type, error, value, onChange }) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value)
	}

	if (icon) {
		return (
			<PrimaryInput
				variant="outlined"
				label={label}
				name={name}
				id={name}
				type={type === 'password' && showPassword ? 'text' : type}
				value={value}
				onChange={onChangeInput}
				error={error}
				InputProps={{
					startAdornment: icon ? (
						<InputAdornment position='start'>
							<SvgIcon component={icon} sx={{ color: '#323E57' }}  />
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
					) : <></>
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

export { Input }