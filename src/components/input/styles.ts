import { styled, TextField } from '@mui/material'

export const OutlinedInput = styled(TextField)(props => ({
	display: props.type === 'hidden' ? 'none' : 'inline-flex',
	marginTop: 10,
	marginBottom: 10,
	borderRadius: 8,
	borderColor: '#E9EFF5',
	background: props.variant === 'standard' ? '#ffffff' : '#E9EFF5',
	backgroundColor: props.variant === 'standard' ? '#ffffff' : '#E9EFF5',
	width: '100%',

	'& .MuiOutlinedInput-root': {
		borderRadius: 8,

		'& fieldset': {
			borderColor: props.error ? '#FF2163' : '#FFFFFF',
		},

		'&:hover fieldset': {
			borderColor: '#1F4CD5',
		},

		'&.Mui-focused fieldset': {
			borderColor: '#1F4CD5',
		},
	},

	'& input': {
		fontFamily: 'Inter',
		fontWeight: 500,
	},

	'& input:not(:placeholder-shown) ~ fieldset': {
		border: '1px solid #99A7C2',
	},

	'& label': {
		color: props.error ? '#FF2163' : '#323E57',
		fontWeight: 500,
	},
	'& label.Mui-focused': {
		color: '#1F4CD5',
	},
}))
