import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useNavigate } from 'react-router-dom'
import { AuditorsMenu, MenuItem } from './auditors-menu'
import { Company } from 'interfaces/company.type'

export const STATUS_LATE = 'late'
export const STATUS_IN_PROGRESS = 'inprogress'
export const STATUS_FINISHED = 'finished'

export type StatusTypes = typeof STATUS_LATE | typeof STATUS_IN_PROGRESS | typeof STATUS_FINISHED

type CompanyCardProps = {
	testid: string
	company: Company
}


export const CompanyCard: React.FC<CompanyCardProps> = ({
	testid,
	company
}) => {
	const navigate = useNavigate()
	const [menuOpen, setMenuOpen] = useState(false)
	const [menuItems, setMenuItems] = useState<MenuItem[]>([])
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	useEffect(() => {
		const auditorToLoad: MenuItem[] = []
		company.auditors.forEach(auditor => {
			auditorToLoad.push({
				click: () => navigate(`/usuarios/${auditor._eq}`),
				label: auditor.name,
				avatar: auditor.photo
			})
		})
		setMenuItems(auditorToLoad)
	}, [company])

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
		navigate(`/detalhes-da-empresa/${company._eq}`)
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
		<Container status={company.status} data-testid={testid}>
			<div className="company-infos" onClick={handleOpenCompanyDetails}>
				<img src={company.logo} alt="Logo da empresa" />
				<div className="details">
					<p className='company-name'>{company.name}</p>
					{company.manager?.name && <p className="manager-name">Gestor: {company.manager.name}</p>}
				</div>
			</div>
			<div className="auditors" data-testid="auditors" onClick={(e) => toggleMenu(e)}>
				<p>Auditores</p>
				<div className='auditors-photos'>
					{
						company.auditors.map((auditor, i) => {
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