import styled from 'styled-components'
import { AlertTypes } from '.'

type ContainerProps = {
	type: AlertTypes
}

export const Container = styled.div<ContainerProps>`
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-radius: 8px;
		padding-left: 12px;
		padding-top: 18px;
		padding-bottom: 18px;
		margin-bottom: 8px;
		margin-top: 8px;
		width: 100%;

		svg {
			width: 24px;
			height: 24px;
		}

		span {
			font-family: 'Inter';
			font-weight: 600;
			font-size: 14px;
			margin-left: 12px;
			max-width: 80%;
		}

		${({ type }) => {
		if (type === 'error') {
			return `
					background: #FFADC6;

					svg {
						color: #FF2163;
					}

					span {
						color: #FF2163;
					}
				`
		}
	}}
`