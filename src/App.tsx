import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './globalStyles'
import AppProvider from './hooks'
import { router } from './routes'

const App: React.FC = () =>
	(
		<div onContextMenu={e => e.preventDefault()}>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
			<GlobalStyles />
		</div>
	)


export { App }
