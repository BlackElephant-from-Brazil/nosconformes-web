import React from 'react'
import { AuthProvider } from './authentication.hook'

type AppProviderProps = {
	children: JSX.Element
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
	<AuthProvider>
		{children}
	</AuthProvider>
)

export default AppProvider