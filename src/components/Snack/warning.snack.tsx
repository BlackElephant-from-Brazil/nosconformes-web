import React, { forwardRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import WarningIcon from '@mui/icons-material/Warning'
import { closeSnackbar, CustomContentProps } from 'notistack'
import { Container } from './styles'

interface SnackProps extends CustomContentProps {
	message: string
}

export const WarningSnack = forwardRef<HTMLDivElement, SnackProps>(
	({ message, id, ...props }, ref) => {
		const handleCloseSnack = () => {
			closeSnackbar(id)
		}

		return (
			<Container type="warning" {...props} ref={ref}>
				<>
					<WarningIcon />
					<p>{message}</p>
					<CloseIcon onClick={handleCloseSnack} />
				</>
			</Container>
		)
	},
)

WarningSnack.displayName = 'WarningSnack'
