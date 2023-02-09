import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BusinessIcon from '@mui/icons-material/Business'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import PeopleIcon from '@mui/icons-material/People'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from 'hooks/authentication.hook'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ncMenuOpen from '../../assets/nc-menu-open.png'
import ncMenuClose from '../../assets/nc-menu-close.png'
import avatarExample from '../../assets/avatar-example.png'
import ncShortLogo from '../../assets/nc-short-logo.png'
import ncWhiteText from '../../assets/nc-white-text.png'
import { Container, MenuItem, UserTag } from './styles'

const DASHBOARD = 'dashboard'
const COMPANIES = 'companies'
const KNOWLEDGE_BASE = 'knowledge_base'
const AUDITOR_AREA = 'auditor_area'

export const SideBar: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(DASHBOARD)
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const { signOut } = useAuth()
	const [displayMenuOpen, setDisplayMenuOpen] = useState(false)

	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => {
				setDisplayMenuOpen(true)
			}, 200)
			return () => clearTimeout(timer)
		}
		setDisplayMenuOpen(false)
	}, [open])

	useEffect(() => {
		const path = window.location.pathname
		switch (path) {
			case '/dashboard':
				setActive(DASHBOARD)
				break
			case '/empresas':
				setActive(COMPANIES)
				break
			case '/base-de-conhecimento':
				setActive(KNOWLEDGE_BASE)
				break
			case '/area-do-auditor':
				setActive(AUDITOR_AREA)
				break
			default:
				setActive('')
				break
		}
	}, [])

	const handleOpenMenu = (menu: string) => {
		setActive(menu)
		switch (menu) {
			case DASHBOARD:
				navigate('/dashboard')
				break
			case COMPANIES:
				navigate('/empresas')
				break
			case KNOWLEDGE_BASE:
				navigate('/base-de-conhecimento')
				break
			case AUDITOR_AREA:
				navigate('/area-do-auditor')
				break
			default:
				break
		}
	}

	const handleClickLogout = () => {
		signOut()
		enqueueSnackbar('Você foi desconectado com sucesso!', {
			variant: 'success',
		})
		setTimeout(() => {
			navigate('/login')
		}, 2800)
	}

	const handleToggleMenuOpen = () => {
		setOpen(!open)
	}

	const handleClickNotifications = () => {
		console.log('click')
	}

	const handleClickUserTag = () => {
		navigate('/configuracoes')
	}

	return (
		<Container open={open} textShow={displayMenuOpen}>
			<span
				className="toggle-menu-button"
				onClick={handleToggleMenuOpen}
				role="presentation"
			>
				{open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
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
				<MenuItem
					textShow={displayMenuOpen}
					open={open}
					active={active === DASHBOARD}
					onClick={() => handleOpenMenu(DASHBOARD)}
				>
					<div className="side-border" />
					<DashboardIcon />
					<p className="item-name">Dashboard</p>
				</MenuItem>
				<MenuItem
					textShow={displayMenuOpen}
					open={open}
					active={active === COMPANIES}
					onClick={() => handleOpenMenu(COMPANIES)}
				>
					<div className="side-border" />
					<BusinessIcon />
					<p className="item-name">Empresas</p>
				</MenuItem>
				<MenuItem
					textShow={displayMenuOpen}
					open={open}
					active={active === KNOWLEDGE_BASE}
					onClick={() => handleOpenMenu(KNOWLEDGE_BASE)}
				>
					<div className="side-border" />
					<CommentBankIcon />
					<p className="item-name">Base de conhecimento</p>
				</MenuItem>
				<MenuItem
					textShow={displayMenuOpen}
					open={open}
					active={active === AUDITOR_AREA}
					onClick={() => handleOpenMenu(AUDITOR_AREA)}
				>
					<div className="side-border" />
					<PeopleIcon />
					<p className="item-name">Área do auditor</p>
				</MenuItem>
			</div>
			<div className="bottom">
				<div
					className="bottom-item"
					onClick={handleClickNotifications}
					role="presentation"
				>
					<NotificationsIcon />
					<p>Notificações</p>
				</div>
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
					menuOpen={open}
					onClick={handleClickUserTag}
				>
					<img src={avatarExample} alt="Avatar do usuário" />
					<div className="user-infos">
						<p className="user-name">Douglas</p>
						<p className="user-office">Master</p>
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
