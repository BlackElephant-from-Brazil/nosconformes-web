/* eslint-disable prettier/prettier */
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	height: 100vh;

	.company-info {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
	}
`

export const CompanyDetails = styled.div`
	background: #ffffff;
	width: 100%;
	border-radius: 16px;
	display: flex;
	flex-direction: row;
	padding: 26px;
	height: fit-content;
	flex-wrap: nowrap;
	align-items: center;

	.graph {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: calc(50% - 1px);

		span {
			font-weight: 500;
			font-size: 18px;
			color: #323e57;
			margin-top: 12px;

			.media {
				font-weight: 700;
				color: #ff991c;
			}
		}
	}

	.divider {
		width: 2px;
		height: 160px;
		background: #99a7c2;
	}

	.company {
		display: flex;
		align-items: center;
		width: calc(50% - 1px);

		img {
			margin-left: 40px;
			width: 92px;
			height: 92px;
			border-radius: 50%;
			object-fit: cover;
		}

		.details {
			margin-left: 30px;
			h2 {
				font-weight: 700;
				font-size: 28px;
				color: #0f141e;
			}

			p {
				font-weight: 500;
				font-size: 20px;
				color: #323e57;
				margin-top: 4px;
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
	}
`

type CompanyGroupingsProps = {
	isMenuOpen: boolean
}

export const CompanyGroupings = styled.div<CompanyGroupingsProps>`
	background: #ffffff;
	width: calc(50% - 10px);
	border-radius: 16px;
	padding: 32px;
	position: relative;
	min-height: 100%;

	h2 {
		font-weight: 700;
		font-size: 22px;
		color: #0f141e;
	}

	.questionaries {
		width: calc(100% - 64px);
		height: ${({ isMenuOpen }) => (isMenuOpen ? 350 : 60)}px;
		${({ isMenuOpen }) =>
		isMenuOpen && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'}
		display: flex;
		margin-top: 28px;
		position: absolute;
		transition: 0.2s ease-in-out;
		z-index: 99;
		position: absolute;
		background: #ffffff;
		border-radius: 8px;

		.selected-questionary {
			display: flex;
			width: 100%;
			height: 60px;
			justify-content: space-between;
			align-items: center;
			border-radius: 6px;
			border: 2px solid #99a7c2;
			padding: 20px;
			cursor: pointer;

			p {
				font-weight: 700;
				font-size: 20px;
				color: #0f141e;
			}

			svg {
				width: 34px;
				height: 34px;
				color: #6d7c99;
			}
		}
	}

	.space-questionaries {
		height: 100px;
	}

	.groupings {
		margin-top: 28px;
	}

	.ellipsis {
		margin-top: auto;
		font-weight: 700;
		font-size: 22px;
		color: #323E57;
		cursor: pointer;
		position: absolute;
		bottom: 32px;
	}
`

export const CompanySimpleActionPlan = styled.div`
	background: #ffffff;
	width: calc(50% - 10px);
	border-radius: 16px;
	padding: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		font-weight: 700;
		font-size: 22px;
		color: #0f141e;
		align-self: flex-start;
	}

	h3 {
		margin-top: 60px;
		font-weight: 700;
		font-size: 24px;
		color: #0f141e;
		text-align: center;
	}

	.improve-points {
		align-self: stretch;
		display: flex;
		margin-top: 60px;
		justify-content: space-between;
		align-items: center;

		.arrow {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			p {
				font-weight: 500;
				font-size: 18px;
				color: #323e57;
				transform: translateY(22px);
			}

			svg {
				width: 76px;
				height: 76px;
				color: #323e57;
			}
		}
	}

	.bt-generate-plan {
		margin-top: 60px;
		width: 220px;
	}
`

export const Grouping = styled.div`
	display: flex;
	width: 100%;

	:not(:last-child) {
		margin-bottom: 30px;
	}

	.points {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #ff991c;
		border-radius: 50%;
		font-weight: 700;
		font-size: 24px;
		color: #ff991c;
	}

	.grouping-info {
		margin-left: 14px;

		.questionary-name {
			font-weight: 700;
			font-size: 20px;
			color: #0f141e;
		}

		.progress {
			font-weight: 500;
			font-size: 16px;
			color: #ff991c;
		}
	}
`

type AllGroupingsProps = {
	isMenuOpen: boolean
}

export const AllGroupings = styled.div<AllGroupingsProps>`
	width: 650px;
	padding: 80px;

	.close-drawer-icon {
		position: absolute;
		left: 26px;
		top: 26px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.questionaries {
		width: calc(100% - 160px);
		height: ${({ isMenuOpen }) => (isMenuOpen ? 350 : 60)}px;
		${({ isMenuOpen }) =>
		isMenuOpen && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'}
		display: flex;
		margin-top: 28px;
		position: absolute;
		transition: 0.2s ease-in-out;
		z-index: 99;
		position: absolute;
		background: #ffffff;
		border-radius: 8px;

		.selected-questionary {
			display: flex;
			width: 100%;
			height: 60px;
			justify-content: space-between;
			align-items: center;
			border-radius: 6px;
			border: 2px solid #99a7c2;
			padding: 20px;
			cursor: pointer;

			p {
				font-weight: 700;
				font-size: 20px;
				color: #0f141e;
			}

			svg {
				width: 34px;
				height: 34px;
				color: #6d7c99;
			}
		}
	}

	.space-questionaries {
		height: 100px;
	}

	.groupings {
		margin-top: 28px;
	}

	.drawer-title {
		margin-top: 20px;
		font-weight: 700;
		font-size: 30px;
		color: #0F141E;
	}
`