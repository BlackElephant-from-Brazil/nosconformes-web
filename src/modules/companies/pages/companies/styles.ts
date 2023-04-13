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

export const CompaniesList = styled.div`
	margin-top: 22px;
	min-height: 550px;
	display: flex;
	width: 100%;
	max-width: 100%;
	flex-direction: column;
	background: #ffffff;
	border-radius: 16px;
	padding: 32px;

	h2 {
		font-family: 'Inter';
		font-weight: 700;
		font-size: 24px;
		color: #0f141e;
	}

	.companies-container {
		display: flex;
		flex-direction: row;
		margin-top: 20px;

		.companies-list {
			display: flex;
			flex-direction: column;
			width: 50%;
		}

		.company-profile {
			width: 50%;

			.edit-company-profile {
				display: flex;
				justify-content: flex-end;
				font-family: 'Inter';
				font-weight: 500;
				font-size: 20px;
				color: #1f4cd4;
				text-decoration: none;

				svg {
					margin-left: 8px;
				}
			}

			h3 {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 24px;
				color: #0f141e;
				text-align: center;
				margin-top: 80px;
			}
		}
	}
`

type CompanyItemProps = {
	isActive: boolean
}

export const CompanyItem = styled.div<CompanyItemProps>`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 14px;
	margin-bottom: 2px;
	border-radius: 16px;
	cursor: pointer;
	${({ isActive }) => (isActive ? 'border: 2px solid #1F4CD5;' : '')}

	img {
		height: 42px;
		width: 42px;
		object-fit: cover;
		border-radius: 50%;
	}

	.company-info {
		margin-left: 12px;
		width: 40%;

		h3 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		p {
			font-family: 'Inter';
			font-weight: 500;
			font-size: 16px;
			color: #323e57;
			margin-top: 4px;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		a {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 18px;
			color: #1f4cd5;
			text-decoration: none;
			margin-top: 4px;
			display: block;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.company-graph {
		display: flex;
		justify-content: center;
		margin: 0 auto;
		width: 30%;
	}
`
