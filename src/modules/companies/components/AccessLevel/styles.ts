import styled from 'styled-components'
import { AccessLevels, ACCESS_LEVEL_MASTER } from '.'

type ContainerProps = {
	level: AccessLevels
}

export const Container = styled.div<ContainerProps>`
	color: #FFFFFF;
	display: flex;
	align-items: center;
	padding: 8px;
	border-radius: 8px;

	${({ level }) => {
		if (level === ACCESS_LEVEL_MASTER) {
			return `
				background: #1F4CD4;
			`
		}
	}}

	p {
		color: #FFFFFF !important;
		font-weight: 500 !important;
		font-size: 14px !important;
		font-family: 'Inter' !important;
		margin-left: 6px !important;
	}
`