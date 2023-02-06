import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AuditorArea } from './pages/auditor-area'

const auditorsAreaRoutes: RouteObject[] = [
	{
		path: '/area-do-auditor',
		element: <AuditorArea />,
	},
]

export { auditorsAreaRoutes }
