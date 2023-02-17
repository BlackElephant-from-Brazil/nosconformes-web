import { Company } from 'interfaces/company.type'
import styled from 'styled-components'

type ContainerProps = {
	status: Company['status']
	reduced: boolean
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 54px;
	height: 54px;
	border-radius: 8px;
	margin-left: auto;
	background: ${({ status }) => {
		switch (status) {
			case 'late':
				return '#FFE1EA'
			case 'inprogress':
				return '#FFF494'
			case 'finished':
				return '#C7FAAE'
			case 'notstarted':
				return '#ADC8FF'
			default:
				return '#ADC8FF'
		}
	}};
	color: ${({ status }) => {
		switch (status) {
			case 'late':
				return '#FF2163'
			case 'inprogress':
				return '#FF991C'
			case 'finished':
				return '#69B345'
			case 'notstarted':
				return '#1F4CD5'
			default:
				return '#1F4CD5'
		}
	}};

	svg {
		width: 32px;
		height: 32px;
	}
`
