import { User } from 'interfaces/user.type'
import styled from 'styled-components'

type ContainerProps = {
	accessLevel: User['accessLevel']
}

export const Container = styled.div<ContainerProps>`
	display: inline-block;
	vertical-align: middle;
	border-radius: 12px;
	height: 24px;
	padding: 0 8px;
	flex-wrap: wrap;
	line-height: 24px !important;
	background: ${({ accessLevel }) => {
		switch (accessLevel) {
			case 'master':
				return '#1F4CD5'
			case 'consultant':
				return '#69B345'
			case 'manager':
				return '#FF2163'
			case 'auditor':
				return '#23067D'
			default:
				return '#23067D'
		}
	}};

	svg {
		color: #ffffff;
		width: 18px;
		height: 18px;
		margin-bottom: 2px;
	}

	p {
		margin-left: 2px !important;
		font-family: 'Inter' !important;
		font-weight: 500 !important;
		font-size: 12px !important;
		color: #ffffff !important;
	}

	> * {
		vertical-align: middle !important; // Align children to middle of line
	}
`
