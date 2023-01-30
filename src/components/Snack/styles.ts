import styled from 'styled-components'

type ContainerProps = {
	type: 'success' | 'warning' | 'error'
}

export const Container = styled.div<ContainerProps>`
	min-height: 64px;
	padding: 18px;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 480px;

	p {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 16px;
		color: #ffffff;
		margin-left: 12px;
		margin-right: 12px;
	}

	svg {
		width: 24px;
		height: 24px;
		color: #ffffff;

		:last-child {
			cursor: pointer;
		}
	}

	${({ type }) => {
		if (type === 'success') {
			return `
								background: #69B345;
							`
		}
		if (type === 'warning') {
			return `
								background: #FF991C;
							`
		}
		if (type === 'error') {
			return `
								background: #FF2163;
							`
		}
	}}
`
