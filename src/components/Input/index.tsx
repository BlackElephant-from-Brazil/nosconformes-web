import { SvgIconComponent, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, SvgIcon } from '@mui/material'
import React from 'react'
import { PrimaryInput } from './styles'

type InputProps = {
	label: string,
	name: string,
	icon?: SvgIconComponent
	type?: string
}


const Input: React.FC<InputProps> = ({ icon, label, name, type }) => {
	const [showPassword, setShowPassword] = React.useState(false)
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	if (icon) {
		return (
			<PrimaryInput
				variant="outlined"
				label={label}
				name={name}
				id={name}
				type={type === 'password' && showPassword ? 'text' : type}
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
			/>
		)
	}
}

export { Input }