/* eslint-disable prettier/prettier */
import styled from 'styled-components'

type ContainerProps = {
	size: 'small' | 'medium' | 'large'
	graphWidth: number
}

export const Container = styled.div<ContainerProps>`
	height: ${({ graphWidth }) => graphWidth / 2}px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	padding: 4px;

	.points-container {
		display: flex;
		flex-direction: column;
		margin-top: -${({ graphWidth }) => (graphWidth / 4) * 3}px;
		${({ size }) => {
		switch (size) {
			case 'small':
				return `
				transform: translateY(0px);
			`
			case 'medium':
				return `
				transform: translateY(-10px);
			`
			case 'large':
				return `
				transform: translateY(-20px);
			`
			default:
				return `
				transform: translateY(0px);
			`
		}
	}}


		.points {
			font-family: 'Inter';
			color: #0f141e;
			margin: 0 auto;
			font-weight: 700;

			${({ size }) => {
		switch (size) {
			case 'small':
				return `
			font-size: 24px;
			`
			case 'medium':
				return `
			font-size: 42px;
			`
			case 'large':
				return `
			font-size: 60px;
			`
			default:
				return `
			font-size: 60px;
			`
		}
	}}
		}

		.points-label {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 16px;
			color: #6d7c99;
			margin: 0 auto;
		}
	}
`
