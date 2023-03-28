import styled from 'styled-components'

type ContainerProps = {
	accessLevel:
		| 'master'
		| 'patrocinador'
		| 'stackholder'
		| 'gestor'
		| 'consultor'
		| 'auditor'
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	border-radius: 12px;
	height: 24px;
	padding: 0 8px;
	line-height: 24px !important;
	width: fit-content;
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

	svg {
		color: #ffffff;
		width: 18px;
		height: 18px;
		vertical-align: middle !important;
	}

	p {
		margin-left: 2px !important;
		font-family: 'Inter' !important;
		font-weight: 500 !important;
		font-size: 12px !important;
		color: #ffffff !important;
	}
`
