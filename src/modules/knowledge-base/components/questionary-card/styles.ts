import styled from 'styled-components'

export const Container = styled.div`
	max-width: 290px;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	padding: 32px;

	h2 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 20px;
		color: #0f141e;
		margin-bottom: 40px;
	}

	h3 {
		font-family: 'Inter';
		font-weight: 600;
		font-size: 18px;
		color: #323e57;
	}

	.clients-list {
		div {
			margin-top: 16px;
			display: flex;
			flex-direction: row;
			align-items: center;

			img {
				width: 42px;
				height: 42px;
				border-radius: 50%;
				object-fit: cover;
			}

			p {
				margin-left: 8px;
				font-family: 'Inter';
				font-weight: 600;
				font-size: 18px;
				color: #0f141e;
			}
		}
	}
`
