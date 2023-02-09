import { User } from 'interfaces/user.type'
import styled from 'styled-components'

type ContainerProps = {
	level: User['accessLevel']
}

export const Container = styled.div<ContainerProps>`
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 8px;
	border-radius: 8px;
	height: 32px;

	${({ level }) => {
		if (level === 'master') {
			return `
				background: #1F4CD4;
			`
		}

		return null
	}}

	p {
		color: #ffffff !important;
		font-weight: 500 !important;
		font-size: 14px !important;
		font-family: 'Inter' !important;
		margin-left: 6px !important;
	}
`
