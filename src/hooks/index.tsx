import React from 'react'
import { AuthProvider } from './authentication.hook'

type AppProviderProps = {
	children: JSX.Element
	authenticateUser: () => void
}

const AppProvider: React.FC<AppProviderProps> = ({
	children,
	authenticateUser,
}) => (
	<AuthProvider authenticateUser={authenticateUser}>{children}</AuthProvider>
)

export default AppProvider
