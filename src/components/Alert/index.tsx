import React from 'react'
import { Container } from './styles'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

export type AlertTypes = 'error' | 'warning' | 'success'

type AlertProps = {
	text: string,
	type: AlertTypes,
	testid?: string
}

const Alert: React.FC<AlertProps> = ({ text, type, testid }) => {

	const renderIcon = () => {
		if (type === 'error') {
			return <ReportGmailerrorredIcon />
		}
	}

	return (
		<>
			{
				!!text && (
					<Container type={type}>
						{renderIcon()}
						<span data-testid={testid}>{text}</span>
					</Container>
				)
			}
		</>
	)
}

export { Alert }