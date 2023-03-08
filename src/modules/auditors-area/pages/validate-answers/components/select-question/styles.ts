import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	background: #ffffff;
	width: 100%;
	height: 66px;
	border-radius: 10px;
	border: 1px solid #6d7c99;
	align-items: center;
	justify-content: space-between;
	padding-left: 20px;
	padding-right: 20px;
	margin-top: 32px;
	cursor: pointer;

	h3 {
		font-weight: 700;
		font-size: 20px;
		color: #0f141e;
	}

	svg {
		width: 42px;
		height: 42px;
		color: #6d7c99;
	}
`
