import React from 'react'
import { Container } from './styles'
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

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

	return (
		<Container status={status}>
			<div className="company-infos">
				<img src={companyLogo} alt="Logo da empresa" />
				<div className="details">
					<p className='company-name'>{companyName}</p>
					<p className="manager-name">Gestor: {managerName}</p>
				</div>
			</div>
			<div className="auditors"></div>
			<div className="status-container">
				<p className='status-title'>Status</p>
				<div className="status">
					{renderStatusComponent()}
				</div>
			</div>
		</Container>
	)
}