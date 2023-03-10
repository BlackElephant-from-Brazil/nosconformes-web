import React from 'react'
import { redirect } from 'react-router-dom'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { auditorsAreaRoutes } from 'modules/auditors-area/auditors-area.routes'
import { STORAGE_USER_KEY } from '../hooks/authentication.hook'
import { companiesRoutes } from '../modules/companies/companies.routes'
import { settingsRoutes } from '../modules/settings/configurations.routes'
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
	...settingsRoutes,
	...knowledgeBaseRoutes,
	...auditorsAreaRoutes,
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
