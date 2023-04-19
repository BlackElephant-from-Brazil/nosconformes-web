import styled from 'styled-components'

export const Container = styled.div`
	.questionaries-list-utilities {
		display: flex;

		.search-input {
			width: 440px;

			background: #fff;
		}

		.new-questionary-button {
			margin-left: auto;
			width: 300px;
		}
	}

	.questionaries-list {
		display: flex;
		justify-content: space-between;
		margin-top: 26px;
		flex-wrap: wrap;
	}
`

export const QuestionaryCard = styled.div`
	margin-bottom: 24px;
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 32px;
	border-radius: 16px;
	width: 290px;

	h3 {
		font-weight: 700;
		font-size: 20px;
		color: #0f141e;
		cursor: pointer;
	}

	.auditors {
		display: flex;
		align-items: center;
		margin-top: 32px;
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
			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				object-fit: cover;
				border: 4px solid #ffffff;
			}
		}

		&.multiple {
			margin-left: 8px;
			.auditors-photos {
				img {
					:nth-child(1) {
						transform: translateX(10px);
					}

					:nth-child(2) {
						transform: translateX(-50px);
					}
				}
			}
			svg {
				transform: translateX(-40px);
			}
		}
	}

	.clients-list {
		margin-top: 32px;

		.clients {
			font-weight: 600;
			font-size: 18px;
			color: #323e57;
		}

		.client {
			margin-top: 16px;
			display: flex;
			align-items: center;

			img {
				width: 42px;
				height: 42px;
				object-fit: cover;
				border-radius: 50%;
			}

			p {
				margin-left: 8px;
				font-weight: 600;
				font-size: 18px;
				color: #000000;
			}
		}
	}
`
