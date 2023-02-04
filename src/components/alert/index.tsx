import React from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { Container } from './styles'

export type AlertProps = {
	text: string
	type: 'error' | 'warning' | 'success'
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
			{!!text && (
				<Container type={type}>
					{renderIcon()}
					<span data-testid={testid}>{text}</span>
				</Container>
			)}
			{null}
		</>
	)
}

export { Alert }
