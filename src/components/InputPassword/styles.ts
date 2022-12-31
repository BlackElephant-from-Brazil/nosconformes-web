import { styled, TextField } from '@mui/material'

export const PrimaryInput = styled(TextField)(props => ({
	marginTop: 10,
	marginBottom: 10,
	borderRadius: 8,
	borderColor: '#E9EFF5',
	height: 48,
	background: '#E9EFF5',
	backgroundColor: '#E9EFF5',
	width: '100%',

	'& .MuiOutlinedInput-root': {
		borderRadius: 8,
		height: 48,

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
		borderRadius: 8,
		fontFamily: 'Inter',
		fontWeight: 500,
	},

	'& label': {
		color: props.error ? '#FF2163' : '#323E57',
		fontWeight: 500
	},
	'& label.Mui-focused': {
		color: '#1F4CD5',
	},
}))
