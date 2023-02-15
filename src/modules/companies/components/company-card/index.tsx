import React, { useEffect, useRef, useState } from 'react'
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useNavigate } from 'react-router-dom'
import { Company } from 'interfaces/company.type'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import {
	handleCompanyImageError,
	handleUserImageError,
} from 'utils/handle-image-error'
import { AuditorsMenu, MenuItem } from './auditors-menu'
import { Container } from './styles'

type CompanyCardProps = {
	testid: string
	company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
	testid,
	company,
}) => {
	const navigate = useNavigate()
	const [menuOpen, setMenuOpen] = useState(false)
	const [menuItems, setMenuItems] = useState<MenuItem[]>([])
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const companyImageRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const auditorToLoad: MenuItem[] = []
		company.auditors.forEach(auditor => {
			auditorToLoad.push({
				click: () => navigate(`/usuarios/${auditor._eq}`),
				label: auditor.name,
				avatar: auditor.profilePicture,
			})
		})
		setMenuItems(auditorToLoad)
	}, [company, navigate])

	const renderStatusComponent = () => {
		if (company.status === 'late') {
			return (
				<>
					<AssignmentLateRoundedIcon />
					<p>Atrasado</p>
				</>
			)
		}
		if (company.status === 'inprogress') {
			return (
				<>
					<WatchLaterRoundedIcon />
					<p>Em progresso</p>
				</>
			)
		}
		if (company.status === 'finished') {
			return (
				<>
					<CheckCircleRoundedIcon />
					<p>Concluído</p>
				</>
			)
		}
		return (
			<>
				<PlayCircleFilledWhiteIcon />
				<p>Iniciando</p>
			</>
		)
	}

	const handleOpenCompanyDetails = () => {
		navigate(`/detalhes-da-empresa/${company._eq}`)
	}

	const toggleMenu = (event?: React.MouseEvent<HTMLDivElement>) => {
		if (menuOpen) setAnchorEl(null)
		else setAnchorEl(event?.currentTarget || null)

		setMenuOpen(!menuOpen)
	}

	return (
		<Container status={company.status} data-testid={testid}>
			<div
				className="company-infos"
				onClick={handleOpenCompanyDetails}
				role="presentation"
			>
				<img
					src={company.logo}
					alt="Logo da empresa"
					ref={companyImageRef}
					onError={() => handleCompanyImageError(companyImageRef)}
				/>
				<div className="details">
					<p className="company-name">{company.name}</p>
					{company.manager?.name && (
						<p className="manager-name">Gestor: {company.manager.name}</p>
					)}
				</div>
			</div>

			<div
				className="auditors"
				data-testid="auditors"
				onClick={e => toggleMenu(e)}
				role="presentation"
			>
				{company.auditors.length === 0 ? (
					<p className="no-registered-auditor">Nenhum auditor cadastrado</p>
				) : (
					<>
						<p>Auditores</p>
						<div className="auditors-photos">
							{company.auditors.map((auditor, i) => {
								const imageRef = React.createRef<HTMLImageElement>()
								if (i > 1) return
								return (
									<img
										key={auditor._eq}
										src={auditor.profilePicture}
										alt={`Foto do auditor: ${auditor.name}`}
										ref={imageRef}
										onError={() => handleUserImageError(imageRef)}
									/>
								)
							})}
							<AuditorsMenu
								anchorEl={anchorEl}
								closeMenu={toggleMenu}
								open={menuOpen}
								menuItems={menuItems}
								menuId="addNewGroupingButtonMenu"
							/>
						</div>
						<KeyboardArrowDownRoundedIcon />
					</>
				)}
			</div>
			<div className="status-container">
				<p className="status-title">Status</p>
				<div className="status">{renderStatusComponent()}</div>
			</div>
		</Container>
	)
}
