import { styled, Autocomplete } from '@mui/material'

type ContainerProps = {
	error?: boolean
}

export const Container = styled(Autocomplete)<ContainerProps>(props => ({
	'& .MuiAutocomplete-inputRoot': {
		borderRadius: 8,
		backgroundColor: '#ffffff',
		borderColor: '#E9EFF5',

		'& fieldset': {
			borderColor: props.error ? '#d32f2f' : '#99A7C2',
		},

		'&:hover fieldset': {
			borderColor: '#1F4CD5',
		},

		'&.Mui-focused fieldset': {
			borderColor: '#1F4CD5',
		},

		'& input:not(:placeholder-shown) ~ fieldset': {
			border: '1px solid #99A7C2',
		},
	},

	'& input': {
		fontFamily: 'Inter',
		fontWeight: 500,
	},

	'& label': {
		color: props.error ? '#d32f2f' : '#323E57',
		fontWeight: 500,
	},
	'& label.Mui-focused': {
		color: '#1F4CD5',
	},
}))
