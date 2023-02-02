import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	padding: 60px 48px;

	.questionaries-header-components {
		display: flex;
		justify-content: space-between;

		.search-input {
			width: 440px;
			background: #ffffff;
		}

		.new-questionary-button {
			width: 260px;
		}
	}

	.all-questionaries {
		padding-top: 16px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
`
