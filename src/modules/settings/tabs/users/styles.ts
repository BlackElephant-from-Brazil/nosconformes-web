import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;

	.users-list-utilities {
		display: flex;
		justify-content: space-between;

		.search-input {
			width: 440px;
		}

		.new-user-button {
			width: 220px;
		}
	}

	.user-avatar {
		width: 24px;
		height: 24px;
		object-fit: cover;
		border-radius: 50%;
		margin-right: 10px;
	}

	.table-users {
		margin-top: 24px;

		.user-table-row {
			cursor: pointer;
		}

		td {
			p {
				font-family: 'Arial';
				font-weight: 400;
				font-size: 16px;
				color: #6f7987;
				display: inline;
			}
		}
	}

	table tr td > * {
		vertical-align: middle;
	}

	@media (max-width: 1280px) {
		.users-list-utilities {
			.search-input {
				width: 360px;
			}
		}
	}
`

export const AddNewUserContainer = styled.div`
	width: 652px;
	margin-bottom: 48px;

	.close-drawer-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.drawer-body {
		display: flex;
		width: 480px;
		margin: 0 auto;
		align-items: center;
		flex-direction: column;

		h2 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 30px;
			color: #0f141e;
			margin-top: 124px;
		}
	}
`
