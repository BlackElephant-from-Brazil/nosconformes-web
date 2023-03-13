import styled from 'styled-components'

type ContainerProps = {
	pointsFontSize?: number
	pointsLabelFontSize?: number
	graphWidth: number
}

export const Container = styled.div<ContainerProps>`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 4px;

	.points-container {
		display: flex;
		flex-direction: column;
		margin-top: -${({ graphWidth }) => (graphWidth / 4) * 3}px;

		.points {
			font-family: 'Inter';
			font-weight: 700;
			font-size: ${({ pointsFontSize }) => pointsFontSize || 24}px;
			color: #0f141e;
			margin: 0 auto;
		}

		.points-label {
			font-family: 'Inter';
			font-weight: 500;
			font-size: ${({ pointsLabelFontSize }) => pointsLabelFontSize || 16}px;
			color: #6d7c99;
			margin: 0 auto;
		}
	}
`
