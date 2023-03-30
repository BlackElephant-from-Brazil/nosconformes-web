import styled from 'styled-components'

export const Container = styled.div`
	height: 100vh;

	.wrapper {
		height: 100vh;
	}

	.top-components {
		display: flex;
		justify-content: space-between;

		.search-input {
			width: 450px;
		}

		.button-group {
			display: flex;

			& > button {
				width: 240px;

				&:not(:first-child) {
					margin-left: 10px;
				}

				&:first-child {
					border: 1px solid #1f4cd5;
				}
			}
		}
	}

	.table-questions {
		margin-top: 24px;
		table-layout: fixed;

		p.table-text {
			font-weight: 700;
			font-size: 14px;
			color: #0f141e;
		}

		th:nth-child(1) {
			width: 50px;
		}

		th:last-child {
			padding-left: 42px;
		}

		.users-cell {
			padding-left: 42px;
		}

		.active {
			background: #d6e4ff;
		}
		.unactive {
			background: #ffffff;
		}
	}
`
