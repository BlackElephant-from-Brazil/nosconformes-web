import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	padding: 60px 48px;

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

	table {
		margin-top: 24px;

		td {

			p {
				font-family: 'Arial';
				font-weight: 400;
				font-size: 16px;
				color: #6F7987;
				display: inline;
			}
		}
	}

	table tr td > * {
		vertical-align:middle
	}


`