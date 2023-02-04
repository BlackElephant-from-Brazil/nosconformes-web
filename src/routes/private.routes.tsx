import React from 'react'
import { redirect } from 'react-router-dom'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { STORAGE_USER_KEY } from '../hooks/authentication.hook'
import { companiesRoutes } from '../modules/companies/companies.routes'
import { configurationsRoutes } from '../modules/configurations/configurations.routes'
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes'
import { knowledgeBaseRoutes } from '../modules/knowledge-base/knowledge-base.routes'
import { SideBar } from '../components/side-bar'
import { RouteContainer } from './styles'

// TODO: FINISH LOGIN VALIDATION
const validateLogin = () => {
	// api.get('/auth/validate').catch(() => {
	// 	enqueueSnackbar('Não autorizado, faça login para continuar.', { variant: 'error' })
	// 	localStorage.clear()
	// 	redirect('/login')
	// })

	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	if (!storagedUser) {
		return redirect('/login')
	}
	return null
}

const allPrivateRoutes = [
	...companiesRoutes,
	...configurationsRoutes,
	...knowledgeBaseRoutes,
	...dashboardRoutes,
]

const privateRoutes = allPrivateRoutes.map(route => {
	return {
		...route,
		loader: validateLogin,
		element: (
			<>
				<SideBar />
				<RouteContainer>{route.element}</RouteContainer>
			</>
		),
	}
})

export { privateRoutes }
