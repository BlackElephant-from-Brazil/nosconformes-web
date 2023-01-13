import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: #0F141E;
	border-radius: 16px;
	width: 72px;
	min-width: 72px;
	height: calc(100vh - 24px);
	margin-left: 12px;
	margin-top: 12px;
	z-index: 2;
	position: fixed;

	.toggle-menu-button {
		background: #323E57;
		color: #FFFFFF;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		cursor: pointer;
	}

	.logo-dm11-top {
		object-fit: fill;
		width: 46px;
		height: 34px;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.app-menu {

	}

	.bottom {
		margin-top: auto;

		.user-tag {
			width: 52px;
			height: 52px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			background: #323E57;
			border-radius: 8px;
			margin-bottom: 38px;
			cursor: pointer;

			img {
				width: 34px;
				height: 34px;
				border-radius: 50px;
				object-fit: fill;
			}
		}

		.bottom-menu {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-bottom: 28px;

			p {
				margin-top: 8px;
				font-size: 8px;
				color: #FFFFFF;
				opacity: 50%;
			}
		}
	}
`

type MenuItemProps = {
	open?: boolean
	active?: boolean
}

export const MenuItem = styled.div<MenuItemProps>`
	display: flex;
	height: 48px;
	color: ${({ active }) => active ? '#FFFFFF' : '#6D7C99' };
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-top: 12px;


	svg {
		height: 24px;
		width: 24px;
		${({ active }) => active && 'transform: translateX(-4px);' };
	}

	p {
		display: ${({ open }) => open ? 'block' : 'none' };
	}

	.side-border {
		height: 100%;
		width: 6px;
		border-radius: 0 6px 6px 0;
		background: #1F4CD4;
		display: ${({ active }) => active ? 'block' : 'none' };
		position: relative;
		left: -21px;
	}
`