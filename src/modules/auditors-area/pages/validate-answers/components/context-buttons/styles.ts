import styled from 'styled-components'

export const Container = styled.div`
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

	.has-message {
		display: flex;
		align-items: center;
		justify-content: center;

		&.unread {
			position: relative;
			.dot {
				width: 14px;
				height: 14px;
				border-radius: 50%;
				background: #ff2163;
				position: absolute;
				top: 0;
				right: 0;
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
			max-height: calc(100vh - 470px);
			overflow: auto;
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

	:not(:first-child) {
		margin-top: 40px;
	}

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
