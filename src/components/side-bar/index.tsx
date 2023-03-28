import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import BusinessIcon from '@mui/icons-material/Business'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import PeopleIcon from '@mui/icons-material/People'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from 'hooks/authentication.hook'
import { getAccessLevelName } from 'utils/get-access-level-name'
import { getFirstWord } from 'utils/get-first-word'
import { handleUserImageError } from 'utils/handle-image-error'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import ncMenuOpen from '../../assets/nc-menu-open.png'
import ncMenuClose from '../../assets/nc-menu-close.png'
import ncShortLogo from '../../assets/nc-short-logo.png'
import ncWhiteText from '../../assets/nc-white-text.png'
import { Container, MenuItem, UserTag } from './styles'

export const SideBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [active, setActive] = useState('/empresas')
	const navigate = useNavigate()
	const location = useLocation()
	const { enqueueSnackbar } = useSnackbar()
	const { signOut } = useAuth()
	const [displayMenuOpen, setDisplayMenuOpen] = useState(false)
	const { user, employee } = useAuth()
	const avatarRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				setDisplayMenuOpen(true)
			}, 200)
			return () => clearTimeout(timer)
		}
		setDisplayMenuOpen(false)
	}, [isOpen])

	useEffect(() => {
		const path = location.pathname
		setActive(path)
	}, [location.pathname])

	const handleOpenMenu = (menu: string) => {
		setActive(menu)
		navigate(menu)
	}

	const handleClickLogout = () => {
		signOut()
		enqueueSnackbar('Você foi desconectado com sucesso!', {
			variant: 'success',
		})
		navigate('/login')
	}

	const handleToggleMenuOpen = () => {
		setIsOpen(!isOpen)
	}

	const handleClickUserTag = () => {
		navigate('/configuracoes')
	}

	return (
		<Container open={isOpen} textShow={displayMenuOpen}>
			<span
				className="toggle-menu-button"
				onClick={handleToggleMenuOpen}
				role="presentation"
			>
				{isOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
			</span>
			<div className="nosconformes-logo-container">
				<img className="logo-nc-top" src={ncShortLogo} alt="Logo DM11" />
				{displayMenuOpen && (
					<img
						className="nc-white-text"
						src={ncWhiteText}
						alt="Texto NOSCONFORMES"
					/>
				)}
			</div>
			<div className="app-menu">
				{user && (
					<>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/empresas'}
							onClick={() => handleOpenMenu('/empresas')}
						>
							<div className="side-border" />
							<BusinessIcon />
							<p className="item-name">Empresas</p>
						</MenuItem>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/base-de-conhecimento'}
							onClick={() => handleOpenMenu('/base-de-conhecimento')}
						>
							<div className="side-border" />
							<CommentBankIcon />
							<p className="item-name">Base de conhecimento</p>
						</MenuItem>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/area-do-auditor'}
							onClick={() => handleOpenMenu('/area-do-auditor')}
						>
							<div className="side-border" />
							<PeopleIcon />
							<p className="item-name">Área do auditor</p>
						</MenuItem>
					</>
				)}
				{employee && (
					<>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/dashboard-da-empresa'}
							onClick={() => handleOpenMenu('/dashboard-da-empresa')}
						>
							<div className="side-border" />
							<DashboardIcon />
							<p className="item-name">Dashboard</p>
						</MenuItem>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/questionarios-da-empresa'}
							onClick={() => handleOpenMenu('/questionarios-da-empresa')}
						>
							<div className="side-border" />
							<CommentBankIcon />
							<p className="item-name">Questionários</p>
						</MenuItem>
						<MenuItem
							textShow={displayMenuOpen}
							open={isOpen}
							active={active === '/plano-de-acao'}
							onClick={() => handleOpenMenu('/plano-de-acao')}
						>
							<div className="side-border" />
							<PendingActionsIcon />
							<p className="item-name">Plano de ação</p>
						</MenuItem>
					</>
				)}
			</div>
			<div className="bottom">
				<div
					className="bottom-item"
					onClick={handleClickLogout}
					role="presentation"
				>
					<LogoutIcon />
					<p>Sair</p>
				</div>
				<UserTag
					displayOpen={displayMenuOpen}
					menuOpen={isOpen}
					onClick={handleClickUserTag}
				>
					<img
						src={user?.profilePicture || employee?.profilePicture}
						alt="Avatar do usuário"
						className="avatar"
						ref={avatarRef}
						onError={() => handleUserImageError(avatarRef)}
					/>
					<div className="user-infos">
						<p className="user-name">
							{getFirstWord(user?.name || employee?.name)}
						</p>
						<p className="user-office">
							{getAccessLevelName(user?.accessLevel || employee?.accessLevel)}
						</p>
					</div>
				</UserTag>
				<div className="bottom-infos">
					{!displayMenuOpen ? (
						<>
							<img src={ncMenuClose} alt="Logo NOSCONFORMES" />
							<p>©</p>
						</>
					) : (
						<>
							<img src={ncMenuOpen} alt="Logo NOSCONFORMES" />
							<p>
								<span>Todos direitos reservados</span>©
							</p>
						</>
					)}
				</div>
			</div>
		</Container>
	)
}
