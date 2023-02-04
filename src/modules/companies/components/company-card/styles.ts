/* eslint-disable indent */
import { Company } from 'interfaces/company.type'
import styled from 'styled-components'

type ContainerProps = {
	status: Company['status']
}

export const Container = styled.div<ContainerProps>`
	background: #ffffff;
	width: 386px;
	margin-bottom: 40px;
	border-radius: 16px;
	padding: 32px;

	.company-infos {
		display: flex;
		flex-direction: row;
		cursor: pointer;

		img {
			width: 66px;
			height: 66px;
			border-radius: 50%;
			object-fit: contain;
		}

		.details {
			margin-left: 8px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.company-name {
				font-family: 'Inter';
				font-weight: 700;
				font-size: 20px;
				color: #0f141e;
			}

			.manager-name {
				font-family: 'Inter';
				font-weight: 500;
				font-size: 16px;
			}
		}
	}

	.auditors {
		display: flex;
		align-items: center;
		margin-top: 24px;
		color: #1f4cd5;
		cursor: pointer;

		p {
			font-family: 'Inter';
			font-weight: 700;
			font-size: 16px;
		}

		.no-registered-auditor {
			cursor: text;
		}

		.auditors-photos {
			margin-left: 8px;

			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				object-fit: cover;
				border: 4px solid #ffffff;

				:first-child {
					transform: translateX(10px);
				}

				:last-child {
					transform: translateX(-50px);
				}
			}
		}

		svg {
			transform: translateX(-40px);
		}
	}

	.status-container {
		margin-top: 24px;

		.status-title {
			color: #323e57;
			font-size: 18px;
			font-family: 'Inter';
			font-weight: 600;
			margin-bottom: 20px;
		}

		.status {
			width: 100%;
			height: 60px;
			border-radius: 8px;
			display: flex;
			align-items: center;
			padding: 8px;

			svg {
				width: 38px;
				height: 38px;
			}

			p {
				font-family: 'Inter';
				font-weight: 600;
				font-size: 18px;
				margin-left: 8px;
			}

			${({ status }) => {
				if (status === 'late') {
					return `
								background: #FFE1EA;
								color: #FF2163;
							`
				}
				if (status === 'inprogress') {
					return `
								background: #FFF494;
								color: #FF991C;
							`
				}
				if (status === 'finished') {
					return `
								background: #C7FAAE;
								color: #69B345;
							`
				}
				return `
							background: #ADC8FF;
							color: #1F4CD4;
						`
			}}
		}
	}
`
