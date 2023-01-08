import React from 'react'
import { STORAGE_USER_KEY } from '../hooks/authentication.hook'
import { companiesRoutes } from '../modules/companies/companies.routes'
import { configurationsRoutes } from '../modules/configurations/configurations.routes'
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes'
import { knowledgeBaseRoutes } from '../modules/knowledgeBase/knowledge-base.routes'
import { redirect } from 'react-router-dom'


const validateLogin = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	if(!storagedUser) {
		return redirect('/login')
	}
	return null
}

const allPrivateRoutes = [
	...companiesRoutes,
	...configurationsRoutes,
	...knowledgeBaseRoutes,
	...dashboardRoutes
]

const privateRoutes = allPrivateRoutes.map(route => {
	return {
		...route,
		loader: validateLogin
	}
})

export { privateRoutes }