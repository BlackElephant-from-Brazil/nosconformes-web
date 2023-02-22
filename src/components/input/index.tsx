import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useField } from '@unform/core'

import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { OutlinedInput } from './styles'

type InputProps = {
	label?: string
	placeholder?: string
	name: string
	startAdornmentIcon?: JSX.Element
	endAdornmentIcon?: JSX.Element
	type?: string
	className?: string
	autoFocus?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	disabled?: boolean
	variant?: 'standard' | 'outlined'
	initialValue?: string
}

const Input: React.FC<InputProps> = ({
	startAdornmentIcon,
	endAdornmentIcon,
	label,
	name,
	type,
	placeholder,
	className,
	autoFocus,
	onChange,
	disabled,
	variant,
	initialValue,
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const { fieldName, defaultValue, registerField, clearError, error } =
		useField(name)

	useEffect(() => {
		if (initialValue != null) {
			if (inputRef.current) {
				inputRef.current.value = initialValue
			}
		}
	}, [initialValue, inputRef])

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

	const handleClickShowPassword = () => setShowPassword(show => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}

	const renderEndAdornment = () => {
		if (type === 'password') {
			return (
				<InputAdornment position="end">
					<IconButton
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						edge="end"
					>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			)
		}
		return endAdornmentIcon ? (
			<InputAdornment position="end">{endAdornmentIcon}</InputAdornment>
		) : null
	}

	return (
		<OutlinedInput
			inputRef={inputRef}
			defaultValue={defaultValue}
			autoFocus={autoFocus}
			className={className}
			variant={variant || 'outlined'}
			label={label}
			placeholder={placeholder || ' '}
			name={name}
			id={name}
			type={type === 'password' && showPassword ? 'text' : type}
			error={!!error}
			onChange={onChange}
			InputProps={{
				startAdornment: startAdornmentIcon ? (
					<InputAdornment position="start">{startAdornmentIcon}</InputAdornment>
				) : null,
				endAdornment: renderEndAdornment(),
			}}
			disabled={disabled}
		/>
	)
}

export { Input }
