import styled from 'styled-components'

export const Container = styled.div`
	background: #e9eff5;
	width: 100vw;
	min-height: 100vh;

	.content {
		display: flex;
		flex-direction: column;
		margin: 0 auto;

		.companies-list-utilities {
			display: flex;
			justify-content: space-between;

			.search-input {
				width: 440px;
				background: #ffffff;
			}

			.new-company-button {
				width: 220px;
			}
		}
	}
`

export const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 40px;
`

export const AddNewCompanyContainerDrawer = styled.div`
	display: flex;
	flex-direction: column;
	width: auto;

	.close-drawer-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.drawer-body {
		margin-top: 124px;
		margin-bottom: 48px;
	}
`
