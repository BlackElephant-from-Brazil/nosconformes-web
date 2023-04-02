import React from 'react'
import { Checkbox as MuiCheckbox } from '@mui/material'

type CheckboxProps = {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	checked?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
	return (
		<MuiCheckbox
			checked={checked}
			onChange={onChange}
			sx={{
				'&.Mui-checked': {
					color: '#1F4CD5',
				},
			}}
		/>
	)
}
