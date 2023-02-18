import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	background: #ffffff;
	height: 100%;

	.content {
		width: 100%;
		max-width: 1300px;
		margin: 0 auto;
		padding: 60px 48px;

		.add-new-questionary-header {
			display: flex;
			justify-content: space-between;

			.questionary-name-input {
				max-width: 660px;
			}

			.button-group {
				display: flex;
				width: auto;

				button {
					width: auto;

					:last-child {
						margin-left: 16px;
					}
				}
			}
		}
	}
`

export const Body = styled.div`
	.add-new-grouping-button {
		width: auto;
		margin-top: 16px;
	}
`
