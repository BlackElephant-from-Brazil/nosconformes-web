import React from 'react'
import { Container } from './styles'
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useNavigate } from 'react-router-dom'

export const STATUS_LATE = 'late'
export const STATUS_IN_PROGRESS = 'inprogress'
export const STATUS_FINISHED = 'finished'

export type StatusTypes = typeof STATUS_LATE | typeof  STATUS_IN_PROGRESS | typeof STATUS_FINISHED

type CompanyCardProps = {
	companyLogo: string
	companyName: string
	managerName: string
	status: StatusTypes
}

export const CompanyCard:React.FC<CompanyCardProps> = ({
	companyLogo,
	companyName,
	managerName,
	status
}) => {
	const navigate = useNavigate()

	const renderStatusComponent = () => {
		if(status === STATUS_LATE) {
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
			return null
		}
	}

	const handleOpenCompanyDetails = () => {
		navigate('/detalhes-da-empresa')
	}

	return (
		<Container status={status}>
			<div className="company-infos" onClick={handleOpenCompanyDetails}>
				<img src={companyLogo} alt="Logo da empresa" />
				<div className="details">
					<p className='company-name'>{companyName}</p>
					<p className="manager-name">Gestor: {managerName}</p>
				</div>
			</div>
			<div className="auditors">
				<p>Auditores</p>
				<div className='auditors-photos'>
					<img src='https://images.squarespace-cdn.com/content/v1/60f5b1e3e382636224667fb4/1626896647720-ZK45YCRNWNCQLB7WMK8Q/Amanda+Pessoa+oraculos+e+professora+de+portugues' alt="Foto de um auditor" />
					<img src='https://cdn.vnda.com.br/cobogo/2021/10/29/19_10_3_309_site_autor_PatrickPessoa.jpg?v=1638557521' alt="Foto de um auditor" />
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