/* eslint-disable indent */
import styled from 'styled-components'

type ContainerProps = {
	open: boolean
	textShow: boolean
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	background: #0f141e;
	border-radius: 16px;
	width: ${({ open }) => (open ? '246px' : '72px')};
	min-width: 72px;
	height: calc(100vh - 24px);
	margin-left: 12px;
	margin-top: 12px;
	z-index: 2;
	position: fixed;
	transition: width 0.3s ease-in-out;
	align-items: flex-start;

	.toggle-menu-button {
		background: #323e57;
		color: #ffffff;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		cursor: pointer;
		margin-left: 17px;
	}

	.nosconformes-logo-container {
		display: flex;
		flex-direction: row;
		margin-top: 40px;
		margin-bottom: 16px;
		align-items: center;

		.logo-nc-top {
			object-fit: fill;
			width: 38px;
			height: 18px;
			margin-left: 17px;
		}

		.nc-white-text {
			object-fit: fill;
			width: 155px;
			height: 18px;
			margin-left: 2px;
		}
	}

	.app-menu {
		width: 100%;
	}

	.bottom {
		margin-top: auto;
		width: 100%;

		.bottom-item {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: row;
			cursor: pointer;

			svg {
				display: flex;
				margin-bottom: 36px;
				color: #6d7c99;
				width: 24px;
				height: 24px;
				margin-left: 22px;
			}

			p {
				font-family: 'Inter';
				font-weight: 400;
				font-size: 14px;
				color: #6d7c99;
				width: 100%;
				margin-left: 16px;
				display: ${({ textShow }) => {
					if (textShow) {
						return 'block'
					}
					return 'none'
				}};
			}
		}

		.bottom-infos {
			margin-bottom: 28px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			p {
				margin-top: 8px;
				font-family: 'Inter';
				font-weight: 400;
				font-size: 8px;
				color: rgba(255, 255, 255, 0.5);

				span {
					margin-right: 4px;
				}
			}
		}
	}
`

type MenuItemProps = {
	open: boolean
	active: boolean
	textShow: boolean
}

export const MenuItem = styled.div<MenuItemProps>`
	display: flex;
	justify-content: flex-start;
	margin-left: 22px;
	align-items: center;
	height: 48px;
	width: 100%;
	color: ${({ active }) => (active ? '#FFFFFF' : '#6D7C99')};
	cursor: pointer;
	margin-top: 12px;
	transition: margin-left 0.3s ease-in-out;

	svg {
		height: 24px;
		width: 24px;
		${({ active }) => active && 'transform: translateX(-4px);'};
		margin-right: 16px;
	}

	p {
		display: ${({ textShow }) => {
			if (textShow) {
				return 'block'
			}
			return 'none'
		}};
		font-weight: ${({ active }) => (active ? 700 : 400)};
		color: ${({ active }) => (active ? '#FFFFFF' : '#6D7C99')};
		font-family: 'Inter';
		font-size: 14px;
	}

	.side-border {
		height: 100%;
		width: 6px;
		border-radius: 0 6px 6px 0;
		background: #1f4cd4;
		display: ${({ active }) => (active ? 'block' : 'none')};
		position: relative;
		left: -21px;
	}
`

type UserTagProps = {
	displayOpen: boolean
	menuOpen: boolean
}

export const UserTag = styled.div<UserTagProps>`
	width: ${({ menuOpen }) =>
		menuOpen ? 'calc(100% - 36px)' : 'calc(100% - 14px)'};
	height: 52px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 0 auto;
	background: #323e57;
	border-radius: 8px;
	margin-bottom: 38px;
	cursor: pointer;
	transition: width 0.3s ease-in-out;

	img {
		width: 34px;
		height: 34px;
		border-radius: 50px;
		object-fit: cover;
		margin-left: 12px;
	}

	.user-infos {
		margin-left: 8px;
		display: ${({ displayOpen }) => (displayOpen ? 'block' : 'none')};

		p {
			font-family: 'Inter';

			&.user-name {
				font-weight: 700;
				font-size: 14px;
				color: #ffffff;
			}

			&.user-office {
				font-weight: 400;
				font-size: 12px;
				color: #99a7c2;
			}
		}
	}
`
