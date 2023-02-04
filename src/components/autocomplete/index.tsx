import React, { useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { Container } from './styles'

type AutocompleteProps = {
	options: any[]
	selectedValues: any[]
	testid?: string
	handleChange: (event: any, values: unknown) => void
	optionLabel: (option: any) => string
	label: string
	renderOption?: (props: any, option: any) => JSX.Element
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
	options,
	testid,
	selectedValues,
	handleChange,
	optionLabel,
	label,
	renderOption,
}) => {
	const [placeholder, setPlaceholder] = useState(' ')
	const handleChangeAutocompleteChange = (event: any, values: unknown) => {
		if (JSON.stringify(values) === '[]') setPlaceholder(' ')
		else setPlaceholder('')
		handleChange(event, values)
	}

	return (
		<Container
			data-testid={testid}
			multiple
			options={options}
			disableCloseOnSelect
			value={selectedValues}
			onChange={handleChangeAutocompleteChange}
			getOptionLabel={optionLabel}
			renderOption={renderOption}
			renderInput={params => (
				<TextField
					{...params}
					label={label}
					inputProps={{
						...params.inputProps,
					}}
					placeholder={placeholder}
				/>
			)}
		/>
	)
}
