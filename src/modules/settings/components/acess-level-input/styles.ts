/* eslint-disable indent */
import { User } from 'interfaces/user.type'
import styled from 'styled-components'
import { styled as muiStyled, MenuItem as MuiMenuItem } from '@mui/material'

type ContainerProps = {
	accessLevel: User['accessLevel']
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	width: 100%;
	background: #e9eff5;
	border-radius: 8px;
	height: 48px;
	align-items: center;
	justify-content: space-between;

	p {
		font-family: 'Inter';
		font-weight: 500;
		font-size: 16px;
		color: #323e57;
		margin-left: 16px;
	}

	.select-access-level {
		background: ${({ accessLevel }) => {
			switch (accessLevel) {
				case 'master':
					return '#1F4CD5'
					break
				case 'consultant':
					return '#69B345'
					break
				case 'manager':
					return '#FF2163'
					break
				case 'auditor':
					return '#23067D'
					break
				default:
					return '#23067D'
			}
		}};

		height: 34px;
		border-radius: 8px;
		color: #fff;
		font-family: 'Inter';
		font-weight: 500;
		font-size: 14px;
		margin-right: 7px;
		display: flex;
		align-items: center;
		border: none;

		svg {
			color: #fff;
			&:first-child {
				margin-right: 6px;
			}
		}
	}

	.MuiSelect-select {
		display: flex;
		align-items: center;
	}

	.menu {
		border-radius: 24px;
	}
`

export const MenuItem = muiStyled(MuiMenuItem)(props => ({
	svg: {
		marginRight: 6,
	},

	'&.master': {
		color: '#1F4CD5',
	},
	'&.consultant': {
		color: '#69B345',
	},
	'&.manager': {
		color: '#FF2163',
	},
	'&.auditor': {
		color: '#23067D',
	},
}))
