/* eslint-disable indent */
import styled from 'styled-components'
import { styled as muiStyled, MenuItem as MuiMenuItem } from '@mui/material'
import { AccessLevelType } from 'interfaces/access-levels.type'

type ContainerProps = {
	accessLevel: AccessLevelType
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	width: 100%;
	background: #e9eff5;
	border-radius: 8px;
	height: 48px;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 10px;

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
				case 'patrocinador':
					return '#1F4CD5'
				case 'consultor':
					return '#69B345'
				case 'gestor':
					return '#FF2163'
				case 'stackholder':
					return '#FF2163'
				case 'auditor':
					return '#23067D'
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

export const MenuItem = muiStyled(MuiMenuItem)(() => ({
	svg: {
		marginRight: 6,
	},

	'&.master': {
		color: '#1F4CD5',
	},
	'&.consultor': {
		color: '#69B345',
	},
	'&.gestor': {
		color: '#FF2163',
	},
	'&.patrocinador': {
		color: '#1F4CD5',
	},
	'&.stackholder': {
		color: '#FF2163',
	},
	'&.auditor': {
		color: '#23067D',
	},
}))
