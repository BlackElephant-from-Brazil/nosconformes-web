import React, { useState } from 'react'
import { CircularProgress, TextField } from '@mui/material'
import { Container } from './styles'

type AutocompleteProps = {
	options: any[]
	selectedValues: any[] | any
	testid?: string
	handleChange: (event: any, values: unknown) => void
	optionLabel: (option: any) => string
	label?: string
	renderOption?: (props: any, option: any) => JSX.Element
	multiple?: boolean
	disableCloseOnSelect?: boolean
	error?: boolean
	renderTags?: (value: any[], getTagProps: any) => JSX.Element
	open?: boolean
	setOpen?: () => void
	setClose?: () => void
	loading?: boolean
	isOptionEqualToValue?: (option: any, value: any) => boolean
	filterOptions?: (options: any[], state: any) => any[]
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
	options,
	testid,
	selectedValues,
	handleChange,
	optionLabel,
	label,
	renderOption,
	multiple = true,
	disableCloseOnSelect = true,
	error,
	renderTags,
	open,
	setOpen,
	setClose,
	loading,
	isOptionEqualToValue,
	filterOptions,
}) => {
	const [placeholder, setPlaceholder] = useState(' ')
	const handleChangeAutocompleteChange = (event: any, values: unknown) => {
		if (JSON.stringify(values) === '[]') setPlaceholder(' ')
		else setPlaceholder('')
		handleChange(event, values)
	}

	return (
		<Container
			error={error}
			data-testid={testid}
			multiple={multiple}
			options={options}
			disableCloseOnSelect={disableCloseOnSelect}
			value={selectedValues}
			onChange={handleChangeAutocompleteChange}
			getOptionLabel={optionLabel}
			renderOption={renderOption}
			renderTags={renderTags}
			renderInput={params => (
				<TextField
					{...params}
					label={label}
					placeholder={placeholder}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress sx={{ color: '#1f4cd5' }} size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
			open={open}
			onOpen={setOpen}
			onClose={setClose}
			loading={loading}
			isOptionEqualToValue={isOptionEqualToValue}
			filterOptions={filterOptions}
		/>
	)
}
