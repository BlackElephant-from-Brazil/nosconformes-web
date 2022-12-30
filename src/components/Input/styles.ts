import { styled, TextField } from '@mui/material'

export const PrimaryInput = styled(TextField)(props => ({
	marginTop: 12,
	marginBottom: 12,
	borderRadius: 8,
	height: 48,
	background: '#E9EFF5',
	backgroundColor: '#E9EFF5',

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
		// '& fieldset': {
		//   borderColor: 'red',
		// },
		// '&:hover fieldset': {
		//   borderColor: 'yellow',
		// },
		// '&.Mui-focused fieldset': {
		//   borderColor: 'green',
		// },
	},

	'& input': {
		borderRadius: 8,
		fontFamily: 'Inter',
		fontWeight: 500,
	},

	'& label': {
		color: props.error ? '#FF2163' : '#323E57',
		fontWeight: 700
	},


	// '& label.Mui-focused': {
	// 	border: '1px solid #1F4CD5',
	// },
	'& label.Mui-focused': {
		color: '#1F4CD5',
	},


}))
