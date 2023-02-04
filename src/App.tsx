import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ReportIcon from '@mui/icons-material/Report'
import { SnackbarProvider } from 'notistack'
import { GlobalStyles } from './globalStyles'
import AppProvider from './hooks'
import { STORAGE_USER_KEY } from './hooks/authentication.hook'
import { router } from './routes'
import { AppContainer } from './styles'
import { ErrorSnack, SuccessSnack, WarningSnack } from './components/snack'

const App: React.FC = () => {
	const [authenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const user = localStorage.getItem(STORAGE_USER_KEY)
		if (user) {
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}, [authenticated])

	const authenticateUser = () => {
		setAuthenticated(true)
	}

	return (
		<div onContextMenu={e => e.preventDefault()}>
			<SnackbarProvider
				autoHideDuration={2500}
				maxSnack={6}
				iconVariant={{
					success: <CheckCircleIcon />,
					warning: <WarningIcon />,
					error: <ReportIcon />,
				}}
				Components={{
					success: SuccessSnack,
					warning: WarningSnack,
					error: ErrorSnack,
				}}
				style={{
					marginLeft: 120,
				}}
			>
				<AppProvider authenticateUser={authenticateUser}>
					<AppContainer authenticated={authenticated}>
						<RouterProvider router={router} />
					</AppContainer>
				</AppProvider>
			</SnackbarProvider>
			<GlobalStyles />
		</div>
	)
}

export { App }
