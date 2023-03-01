import styled from 'styled-components'

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
