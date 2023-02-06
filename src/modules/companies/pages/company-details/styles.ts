/* eslint-disable indent */
import styled from 'styled-components'
import { TAB_COMPANY_DATA, TAB_MANAGER_DATA } from '.'

type TabCompanyDetailsProps = {
	active: number
}

export const Container = styled.div`
	background: #ffffff;
	width: 100vw;
	min-height: 100vh;
`

export const Body = styled.div`
	width: 724px;
	min-height: 100%;
	margin: 0 auto;

	.auditors-button {
		top: 168px;
		margin-top: 52px;
		max-width: 136px;
		position: absolute;
		right: 0;
		margin-right: 142px;
	}
`

export const TabCompanyDetails = styled.ul<TabCompanyDetailsProps>`
	list-style: none;
	margin-top: 116px;

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

		div {
			cursor: pointer;
			width: 230px;
			margin: 0 auto;

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

export const AuditorsDialogContent = styled.div`
	width: 573px;
	padding: 68px;

	.close-dialog-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.dialog-header {
		display: flex;
		flex-direction: row;
		margin-top: 40px;
		margin-bottom: 34px;
		align-items: center;

		svg {
			width: 48px;
			height: 48px;
			color: #0f141e;
		}

		h2 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 30px;
			color: #0f141e;
			margin-left: 16px;
		}
	}

	.dialog-body {
		display: flex;
		flex-direction: column;

		.input-auditors {
			margin-top: 32px;
			margin-bottom: 28px;
		}

		h3 {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 16px;
			color: #6d7c99;
			margin-top: 28px;
		}

		.auditor {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 24px;

			img {
				width: 34px;
				height: 34px;
				border: 1px solid #ffffff;
				border-radius: 50%;
				object-fit: cover;
			}

			p {
				font-family: 'Inter';
				color: #0f141e;
				font-weight: 500;
				font-size: 16px;
				margin-left: 10px;
				margin-right: auto;

				&.auditor-name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 120px;
				}
			}

			.auditor-access-level {
				margin-left: auto;
				margin-right: 0;
			}

			.remove {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: auto;
				cursor: pointer;

				p {
					font-family: 'Inter';
					font-weight: 600;
					font-size: 16px;
					color: #1f4cd5;
				}

				svg {
					width: 32px;
					height: 32px;
					color: #1f4cd5;
					margin-left: 4px;
				}
			}
		}

		.bt-auditors-finished {
			max-width: 118px;
			margin-left: auto;
			margin-top: 60px;
			margin-bottom: 0;
			transform: translateX(30px) translateY(30px);
		}
	}
`
