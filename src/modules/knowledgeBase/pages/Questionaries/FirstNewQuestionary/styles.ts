import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	padding: 60px 48px;
`

export const AddFirstNewQuestionaryButton = styled.div`
	cursor: pointer;
	border: 1px solid #1F4CD4;
	width: 386px;
	height: 320px;
	border-radius: 16px;
	padding: 32px;
	display: flex;
	flex-direction: column;

	p {
		font-family: 'Inter';
		font-weight: 500;
		font-size: 24px;
		color: #1F4CD5;
	}

	svg {
		width: 78px;
		height: 78px;
		color: #1F4CD5;
		margin: auto;
	}
`