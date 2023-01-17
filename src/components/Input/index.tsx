import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useField } from '@unform/core'

import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { PrimaryInput } from './styles'

type InputProps = {
	label?: string,
	placeholder?: string,
	name: string,
	startAdornmentIcon?: JSX.Element,
	endAdornmentIcon?: JSX.Element,
	type?: string,
	className?: string
	autoFocus?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const Input: React.FC<InputProps> = ({ startAdornmentIcon, endAdornmentIcon, label, name, type, placeholder, className, autoFocus, onChange }) => {
	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef()
	const { fieldName, defaultValue, registerField, clearError, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef,
			getValue: ref => {
				return ref.current.value
			},
			setValue: (ref, value) => {
				ref.current.value = value
			},
			clearValue: ref => {
				ref.current.value = ''
			},
		})
	}, [fieldName, registerField])

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<PrimaryInput
			inputRef={inputRef}
			defaultValue={defaultValue}
			autoFocus={autoFocus}
			className={className}
			variant="outlined"
			label={label}
			placeholder={placeholder ? placeholder : ' '}
			name={name}
			id={name}
			type={type === 'password' && showPassword ? 'text' : type}
			error={!!error}
			onChange={onChange}
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