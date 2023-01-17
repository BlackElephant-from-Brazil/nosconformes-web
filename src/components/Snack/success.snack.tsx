import React, { forwardRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Container } from './styles'
import { closeSnackbar, CustomContentProps } from 'notistack'


interface SnackProps extends CustomContentProps {
	message: string
}

export const SuccessSnack = forwardRef<HTMLDivElement, SnackProps>(
	({ message, id, ...props }, ref) => {

		const handleCloseSnack = () => {
			closeSnackbar(id)
		}

		return (
			<Container type='success' {...props} ref={ref}>
				<>
					<CheckCircleIcon />
					<p>
						{message}
					</p>
					<CloseIcon onClick={handleCloseSnack} />
				</>
			</Container>
		)
	})

SuccessSnack.displayName = 'SuccessSnack'