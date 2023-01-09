import React, { useState } from 'react'
import { Container, MenuItem } from './styles'
import dm11ReducedLogo from '../../assets/dm11-reduced-logo.png'
import avatarExample from '../../assets/avatar-example.png'
import ncMenuClose from '../../assets/nc-menu-close.png'
import ncMenuOpen from '../../assets/nc-menu-open.png'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BusinessIcon from '@mui/icons-material/Business'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import PeopleIcon from '@mui/icons-material/People'
import { redirect, useNavigate } from 'react-router-dom'

const DASHBOARD = 'dashboard'
const COMPANIES = 'companies'
const KNOWLEDGE_BASE = 'knowledge_base'
const AUDITOR_AREA = 'auditor_area'

export const SideBar: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(DASHBOARD)
	const navigate = useNavigate()

	const renderBottomFixedContent = () => {
		if(open) {
			return (
				<>
					<div className="user-tag">
						<img src={avatarExample} alt="Avatar do usuário" />
						<div className="user-infos">
							<p className='user-name'>
							Douglas
							</p>
							<p className="user-office">
							Master
							</p>
						</div>
					</div>
					<div className='bottom-menu'>
						<img src={ncMenuOpen} alt="Logotipo nosconformes inteiro" />
						<p>
						Todos direitos reservados ©
						</p>
					</div>
				</>
			)
		} else {
			return (
				<>
					<div className="user-tag">
						<img src={avatarExample} alt="Avatar do usuário" />
					</div>
					<div className='bottom-menu'>
						<img src={ncMenuClose} alt="Logotipo nosconformes reduzido" />
						<p>
						©
						</p>
					</div>
				</>
			)
		}
	}

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
		}
	}

	return (
		<Container>
			<span className='toggle-menu-button'>
				{ open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon /> }
			</span>
			<img className='logo-dm11-top' src={dm11ReducedLogo} alt="Logo DM11" />
			<div className="app-menu">
				<MenuItem open={open} active={active === DASHBOARD} onClick={() => handleOpenMenu(DASHBOARD)}>
					<div className='side-border'></div>
					<DashboardIcon />
					<p className="item-name">
						Dashboard
					</p>
				</MenuItem>
				<MenuItem open={open} active={active === COMPANIES} onClick={() => handleOpenMenu(COMPANIES)}>
					<div className='side-border'></div>
					<BusinessIcon />
					<p className="item-name">
						Empresas
					</p>
				</MenuItem>
				<MenuItem open={open} active={active === KNOWLEDGE_BASE} onClick={() => handleOpenMenu(KNOWLEDGE_BASE)}>
					<div className='side-border'></div>
					<CommentBankIcon />
					<p className="item-name">
						Base de conhecimento
					</p>
				</MenuItem>
				<MenuItem open={open} active={active === AUDITOR_AREA} onClick={() => handleOpenMenu(AUDITOR_AREA)}>
					<div className='side-border'></div>
					<PeopleIcon />
					<p className="item-name">
						Área do auditor
					</p>
				</MenuItem>
			</div>
			<div className="bottom">
				{
					renderBottomFixedContent()
				}
			</div>
		</Container>
	)
}