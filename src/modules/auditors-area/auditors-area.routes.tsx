import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { AuditorArea } from './pages/auditor-area'
import { ValidateAnswers } from './pages/validate-answers'

const auditorsAreaRoutes: RouteObject[] = [
	{
		path: '/area-do-auditor',
		element: <AuditorArea />,
	},
	{
		path: '/validar-respostas/:companyId/:groupingId',
		element: <ValidateAnswers />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedUser === 'null' && storagedEmployee !== 'null') {
		return redirect('/dashboard-da-empresa')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedAuditorsAreaRoutes = auditorsAreaRoutes.map(route => {
	return {
		...route,
		loader,
		element: route.element,
	}
})

export { loaderedAuditorsAreaRoutes }
