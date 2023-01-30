import { styled, Menu } from '@mui/material'

export const Container = styled(Menu)(() => ({
	'.MuiPaper-root': {
		minWidth: 700,
		borderRadius: 8,
		marginTop: 20,
		marginLeft: '-28px',
	},

	'.MuiMenuItem-root': {
		paddingTop: 16,
		paddingBottom: 16,
		paddingLeft: 32,
		fontFamily: 'Inter',
		fontWeight: 400,
		fontSize: 20,
		color: '#0F141E',
	},

	'.primary': {
		color: '#1F4CD4',
	},
}))
