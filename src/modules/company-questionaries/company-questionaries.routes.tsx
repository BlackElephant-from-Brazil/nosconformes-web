import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { CompanyQuestionaries } from '.'

const companyQuestionariesRoutes: RouteObject[] = [
	{
		path: '/questionarios-da-empresa',
		element: <CompanyQuestionaries />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedEmployee === 'null' && storagedUser !== 'null') {
		return redirect('/empresas')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedCompanyQuestionariesRoutes = companyQuestionariesRoutes.map(
	route => {
		return {
			...route,
			loader,
			element: route.element,
		}
	},
)

export { loaderedCompanyQuestionariesRoutes }
