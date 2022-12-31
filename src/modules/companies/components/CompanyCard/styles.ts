import styled from 'styled-components'
import { StatusTypes, STATUS_FINISHED, STATUS_IN_PROGRESS, STATUS_LATE } from '.'

type ContainerProps = {
	status: StatusTypes
}

export const Container = styled.div<ContainerProps>`
	background: #FFFFFF;
	width: 386px;
	/* height: 480px; */
	margin-bottom: 40px;
	border-radius: 16px;
	padding: 32px;

	.company-infos {
		display: flex;
		flex-direction: row;


		img {
			width: 66px;
			height: 66px;
			border-radius: 50%;
			border: 2px solid #1F4CD4;
			object-fit: cover;
			padding: 8px
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
				color: #0F141E;
			}

			.manager-name {
				font-family: 'Inter';
				font-weight: 500;
				font-size: 16px;
			}
		}

	}

	.status-container {
		margin-top: 40px;

		.status-title {
			color: #323E57;
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
		if (status === STATUS_LATE) {
			return `
								background: #FFE1EA;
								color: #FF2163;
							`
		} else if (status === STATUS_IN_PROGRESS) {
			return `
								background: #FFF494;
								color: #FF991C;
							`
		} else if (status === STATUS_FINISHED) {
			return `
								background: #C7FAAE;
								color: #69B345;
							`
		}
	}}
		}
	}
`