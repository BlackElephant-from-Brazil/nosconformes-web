import { styled as muiStyled, Menu } from '@mui/material'
import styled from 'styled-components'

export const Container = muiStyled(Menu)(() => ({
	'.MuiPaper-root': {
		borderRadius: 8,
		paddingTop: 8,
		paddingBottom: 8,
	},

	'.MuiMenuItem-root': {
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
		fontFamily: 'Inter',
		fontWeight: 600,
		fontSize: 16,
		color: '#0F141E',
	},

	'.primary': {
		color: '#1F4CD4',
	},
}))

export const MenuItemContainer = styled.div`
	display: flex;
	align-items: center;

	img {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		margin-right: 16px;
		object-fit: cover;
	}
`
