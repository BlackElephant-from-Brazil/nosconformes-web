import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { CompanyContactUs } from '.'

const companyContactUsRoutes: RouteObject[] = [
	{
		path: '/convide-nos',
		element: <CompanyContactUs />,
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

const loaderedCompanyContactUsRoutes = companyContactUsRoutes.map(route => {
	return {
		...route,
		loader,
		element: route.element,
	}
})

export { loaderedCompanyContactUsRoutes }
