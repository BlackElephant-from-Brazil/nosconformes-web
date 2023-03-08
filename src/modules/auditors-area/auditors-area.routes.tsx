import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AuditorArea } from './pages/auditor-area'
import { ValidateAnswers } from './pages/validate-answers'

const auditorsAreaRoutes: RouteObject[] = [
	{
		path: '/area-do-auditor',
		element: <AuditorArea />,
	},
	{
		path: '/validar-respostas/:groupingId',
		element: <ValidateAnswers />,
	},
]

export { auditorsAreaRoutes }
