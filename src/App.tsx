import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './globalStyles'
import AppProvider from './hooks'
import { STORAGE_USER_KEY } from './hooks/authentication.hook'
import { router } from './routes'
import { AppContainer } from './styles'



const App: React.FC = () =>{
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
			<AppProvider authenticateUser={authenticateUser}>
				<AppContainer authenticated={authenticated}>
					<RouterProvider router={router} />
				</AppContainer>
			</AppProvider>
			<GlobalStyles />
		</div>
	)
}

export { App }
