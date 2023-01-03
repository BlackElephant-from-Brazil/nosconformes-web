import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './globalStyles'
import { router } from './routes'

const App: React.FC = () =>
	(
		<div onContextMenu={e => e.preventDefault()}>
			<RouterProvider router={router} />
			<GlobalStyles />
		</div>
	)


export { App }
