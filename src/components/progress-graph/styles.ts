import styled from 'styled-components'

type ContainerProps = {
	color: string
	size: number
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	p {
		font-weight: 700;
		font-size: ${({ size }) => size}px;
		color: ${({ color }) => color};
	}
`
