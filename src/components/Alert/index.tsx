import React from 'react'
import { Container } from './styles'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

export const ALERT_TYPE_ERROR = 'error'

export type AlertTypes = typeof ALERT_TYPE_ERROR

type AlertProps = {
	text: string,
	error: boolean,
	type: AlertTypes
}

const Alert: React.FC<AlertProps> = ({ text, error, type }) => {
	if(!error)
		return <></>

	const renderIcon = () => {
		if (type === ALERT_TYPE_ERROR) {
			return <ReportGmailerrorredIcon />
		}
	}

	return (
		<Container type={type}>
			{renderIcon()}
			<span>{text}</span>
		</Container>
	)
}

export { Alert }