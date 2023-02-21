import styled from 'styled-components'

export const Container = styled.div`
	.new-questionary-header {
		display: flex;
		align-items: center;

		.questionary-name {
			display: flex;
			align-items: center;
			p {
				margin-left: 20px;
				font-family: 'Inter';
				font-weight: 500;
				font-size: 24px;
				color: #6d7c99;
			}

			span {
				margin-left: 10px;
				font-family: 'Inter';
				font-weight: 700;
				font-size: 30px;
				color: #0f141e;
			}
		}

		.questionary-buttons {
			margin-left: auto;

			.auditors-button {
				width: 140px;
			}

			.share-button {
				width: 160px;
				margin-left: 18px;
			}
		}
	}

	.new-questionary-interactors {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 40px;

		.search-input {
			width: 40%;
		}

		.new-grouping-button {
			border: 1px solid #1f4cd5;
			width: 260px;
		}
	}
`
