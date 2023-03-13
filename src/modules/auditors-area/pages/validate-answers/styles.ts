import styled from 'styled-components'

export const Container = styled.div`
	.page-wrapper {
		max-width: 700px;

		.page-header {
			display: flex;

			.grouping-info {
				flex-grow: 1;
				margin-left: 16px;

				h2 {
					margin-bottom: 16px;
				}
			}
		}

		.tab-container {
			margin-top: 60px;

			.select-question-space {
				height: 98px;
				width: 100%;
			}
		}
	}

	.action-buttons {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 40px;
		right: 40px;

		.approval-buttons {
			display: flex;

			button {
				width: 118px;

				:last-child {
					margin-left: 10px;
				}
			}
		}

		.button-chat {
			background: #6d7c99;
			height: 80px;
			border-radius: 40px;
			font-weight: 500;
			font-size: 24px;
			width: 300px;

			:hover {
				background: #56627b;
			}

			svg {
				width: 38px;
				height: 38px;
			}
		}
	}
`

export const ChatDrawerContainer = styled.div`
	width: 652px;

	.close-drawer-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.chat-drawer-content {
		padding: 40px;
		margin-top: 48px;
		width: 100%;
		height: 100%;

		.chat-drawer-header {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;

			svg {
				height: 38px;
				width: 38px;
			}

			h2 {
				font-weight: 700;
				font-size: 30px;
				color: #0f141e;
				margin-left: 16px;
			}
		}

		.messages {
			margin-top: 64px;
		}

		.send-message {
			margin-top: auto;
			margin-top: 40px;
			position: absolute;
			width: calc(100% - 80px);
			bottom: 40px;

			.send-message-button {
				width: 155px;
				margin-left: auto;
				display: block;
			}
		}
	}
`

export const Message = styled.div`
	display: flex;
	flex-direction: column;

	.message-header {
		display: flex;
		align-items: center;

		img {
			width: 34px;
			height: 34px;
			object-fit: cover;
			border-radius: 50%;
		}

		h4 {
			font-weight: 700;
			font-size: 16px;
			color: #0f141e;
			margin-left: 10px;

			span {
				font-weight: 600;
				font-size: 16px;
				color: #6d7c99;
				margin-left: 10px;
			}
		}
	}

	.message-body {
		margin-top: 10px;

		p {
			font-weight: 500;
			font-size: 16px;
			color: #0f141e;
		}
	}
`
