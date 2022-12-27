import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './globalStyles'
import { router } from './routes'

const App: React.FC = () =>
	(
		<>
			<RouterProvider router={router} />
			<GlobalStyles />
		</>
	)


export { App }
