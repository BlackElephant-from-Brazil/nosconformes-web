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
			display: flex;
			flex-wrap: wrap;

			.employee-in-table {
				display: flex;
				align-items: center;
				margin-right: 10px;
				max-height: 28px;

				img {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					object-fit: cover;
				}

				p {
					margin-left: 10px;
					font-weight: 400;
					font-size: 16px;
					color: #6f7987;
				}
			}

			.add-employee {
				display: flex;
				align-items: center;
				justify-content: center;
				width: fit-content;
				border-radius: 40px;
				border: 1px solid #1f4cd5;
				padding-left: 4px;
				padding-right: 4px;
				cursor: pointer;

				:hover {
					background: #d6e4ff;
				}

				span {
					font-weight: 700;
					font-size: 12px;
					color: #1f4cd5;
				}

				svg {
					margin-left: 2px;
					color: #1f4cd5;
				}
			}
		}

		.active {
			background: #d6e4ff;
		}
		.unactive {
			background: #ffffff;
		}
	}
`
