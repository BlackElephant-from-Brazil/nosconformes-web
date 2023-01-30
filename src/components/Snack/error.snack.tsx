import React, { forwardRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ReportIcon from '@mui/icons-material/Report'
import { closeSnackbar, CustomContentProps } from 'notistack'
import { Container } from './styles'

interface SnackProps extends CustomContentProps {
	message: string
}

export const ErrorSnack = forwardRef<HTMLDivElement, SnackProps>(
	({ message, id, ...props }, ref) => {
		const handleCloseSnack = () => {
			closeSnackbar(id)
		}

		return (
			<Container type="error" {...props} ref={ref}>
				<>
					<ReportIcon />
					<p>{message}</p>
					<CloseIcon onClick={handleCloseSnack} />
				</>
			</Container>
		)
	},
)

ErrorSnack.displayName = 'ErrorSnack'
