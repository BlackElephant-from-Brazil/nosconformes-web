import { Company } from 'interfaces/company.type'
import React from 'react'
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import { Container } from './styles'

type CompanyStatusProps = {
	status: Company['status']
	reduced: boolean
}

export const CompanyStatus: React.FC<CompanyStatusProps> = ({
	status,
	reduced,
}) => {
	const renderIcon = (companyStatus: Company['status']) => {
		switch (companyStatus) {
			case 'late':
				return <AssignmentLateIcon />
			case 'inprogress':
				return <WatchLaterIcon />
			case 'finished':
				return <CheckCircleIcon />
			case 'notstarted':
				return <PlayCircleFilledWhiteIcon />
			default:
				return <PlayCircleFilledWhiteIcon />
		}
	}

	return (
		<Container reduced={reduced} status={status}>
			<>
				{renderIcon(status)}
				{!reduced && { status }}
			</>
		</Container>
	)
}
