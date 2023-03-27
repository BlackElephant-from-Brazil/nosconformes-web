import React from 'react'
import { loaderedAuditorsAreaRoutes } from 'modules/auditors-area/auditors-area.routes'
import { loaderedKnowledgeBase } from 'modules/knowledge-base/knowledge-base.routes'
import { loaderedCompaniesRoutes } from '../modules/companies/companies.routes'
import { settingsRoutes } from '../modules/settings/configurations.routes'
import { SideBar } from '../components/side-bar'
import { RouteContainer } from './styles'
import { Support } from './pages/support'

const allPrivateRoutes = [
	...loaderedCompaniesRoutes,
	...settingsRoutes,
	...loaderedKnowledgeBase,
	...loaderedAuditorsAreaRoutes,
	{
		path: '/suporte',
		element: <Support />,
	},
]

const privateRoutes = allPrivateRoutes.map(route => {
	return {
		...route,
		element: (
			<>
				<SideBar />
				<RouteContainer>{route.element}</RouteContainer>
			</>
		),
	}
})

export { privateRoutes }
