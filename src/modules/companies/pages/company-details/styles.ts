/* eslint-disable indent */
import styled from 'styled-components'
import { TAB_COMPANY_DATA, TAB_MANAGER_DATA } from '.'

type TabCompanyDetailsProps = {
	active: number
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background: #ffffff;
`

export const TabCompanyDetails = styled.ul<TabCompanyDetailsProps>`
	list-style: none;

	.tab-header {
		display: flex;
		flex-direction: row;

		.back-button {
			background: #1f4cd5;
			width: 38px;
			height: 38px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: background 200ms;
			margin-bottom: 20px;

			:hover {
				background: #072788;
			}

			:active {
				transition: none;
				background: #1f4cd5;
			}

			svg {
				width: 24px;
				height: 24px;
				color: #ffffff;
			}
		}

		.tab-titles {
			display: flex;
			margin: 0 auto;
			transform: translateX(-19px);

			div {
				cursor: pointer;
				width: 230px;
				margin: 0 24px;

				p {
					color: #6d7c99;
					font-family: 'Inter';
					font-weight: 500;
					font-size: 24px;
					text-align: center;
				}
			}

			${({ active }) => {
				if (active === TAB_COMPANY_DATA) {
					return `	.company-data-title {
											p {
												font-weight: 700;
												font-size: 24px;
												color: #0F141E;
											}
											border-bottom: 4px solid #1F4CD4;
										}
									`
				}
				if (active === TAB_MANAGER_DATA) {
					return `	.manager-data-title {
						p {
							font-weight: 700;
							font-size: 24px;
							color: #0F141E;
						}
						border-bottom: 4px solid #1F4CD4;
					}
				`
				}
			}}
		}
	}

	li {
		margin: 0 auto;
		margin-top: 66px;
		max-width: 482px;
	}

	.company-data {
		display: ${({ active }) => (active === TAB_COMPANY_DATA ? 'flex' : 'none')};
		flex-direction: column;
		align-items: center;

		.company-photo {
			background: #242424;
			width: 162px;
			height: 162px;
			border-radius: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			svg {
				width: 52px;
				height: 52px;
				color: #6d7c99;
			}

			p {
				font-family: 'Inter';
				font-size: 12px;
				color: #ffffff;
				font-weight: 700;
				text-align: center;
			}
		}
	}

	.manager-data {
		display: ${({ active }) => (active === TAB_MANAGER_DATA ? 'flex' : 'none')};
	}
`
