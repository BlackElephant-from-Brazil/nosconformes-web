import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useNavigate } from 'react-router-dom'
import { AuditorsMenu, MenuItem } from './auditors-menu'

export const STATUS_LATE = 'late'
export const STATUS_IN_PROGRESS = 'inprogress'
export const STATUS_FINISHED = 'finished'

export type StatusTypes = typeof STATUS_LATE | typeof STATUS_IN_PROGRESS | typeof STATUS_FINISHED

type CompanyCardProps = {
	companyId: string
	companyLogo: string
	companyName: string
	managerName?: string
	status: StatusTypes
	testid: string
	auditors: {
		_eq: string
		name: string
		photo: string
	}[]
}


export const CompanyCard: React.FC<CompanyCardProps> = ({
	companyId,
	companyLogo,
	companyName,
	managerName,
	status,
	testid,
	auditors
}) => {
	const navigate = useNavigate()
	const [menuOpen, setMenuOpen] = useState(false)
	const [menuItems, setMenuItems] = useState<MenuItem[]>([])
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	useEffect(() => {
		const auditorToLoad: MenuItem[] = []
		auditors.forEach(auditor => {
			auditorToLoad.push({
				// TODO: RESOLVE THIS CONSOLE LOG
				click: () => console.log('clicando'),
				label: auditor.name,
				avatar: auditor.photo
			})
		})
		setMenuItems(auditorToLoad)
	}, [auditors])

	const renderStatusComponent = () => {
		if (status === STATUS_LATE) {
			return (
				<>
					<AssignmentLateRoundedIcon />
					<p>
						Atrasado
					</p>
				</>
			)
		} else if (status === STATUS_IN_PROGRESS) {
			{
				return (
					<>
						<WatchLaterRoundedIcon />
						<p>
							Em progresso
						</p>
					</>
				)
			}
		} else if (status === STATUS_FINISHED) {
			return (
				<>
					<CheckCircleRoundedIcon />
					<p>
						Concluído
					</p>
				</>
			)
		} else {
			return (
				<>
					<WatchLaterRoundedIcon />
					<p>
						Em progresso
					</p>
				</>
			)
		}
	}

	const handleOpenCompanyDetails = () => {
		navigate(`/detalhes-da-empresa/${companyId}`)
	}

	const toggleMenu = (event?: React.MouseEvent<HTMLDivElement>) => {
		if (menuOpen)
			setAnchorEl(null)
		else
			setAnchorEl(event?.currentTarget || null)

		setMenuOpen(!menuOpen)
	}

	// TODO: TO PREVENT INPROGRESS MOCK STATUS SET

	return (
		<Container status={status ? status : 'inprogress'} data-testid={testid}>
			<div className="company-infos" onClick={handleOpenCompanyDetails}>
				<img src={companyLogo} alt="Logo da empresa" />
				<div className="details">
					<p className='company-name'>{companyName}</p>
					{managerName && <p className="manager-name">Gestor: {managerName}</p>}
				</div>
			</div>
			<div className="auditors" data-testid="auditors" onClick={(e) => toggleMenu(e)}>
				<p>Auditores</p>
				<div className='auditors-photos'>
					{
						auditors.map((auditor, i) => {
							if (i > 1) return
							return (
								<img key={i} src={auditor.photo} alt={`Foto do auditor: ${auditor.name}`} />
							)
						})
					}
					<AuditorsMenu
						anchorEl={anchorEl}
						closeMenu={toggleMenu}
						open={menuOpen}
						menuItems={menuItems}
						menuId='addNewGroupingButtonMenu'
					/>
				</div>
				<KeyboardArrowDownRoundedIcon />
			</div>
			<div className="status-container">
				<p className='status-title'>Status</p>
				<div className="status">
					{renderStatusComponent()}
				</div>
			</div>
		</Container>
	)
}