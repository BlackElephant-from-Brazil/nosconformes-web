import React from 'react'
import { loaderedAuditorsAreaRoutes } from 'modules/auditors-area/auditors-area.routes'
import { loaderedKnowledgeBase } from 'modules/knowledge-base/knowledge-base.routes'
import { loaderedCompanyActionPlanRoutes } from 'modules/company-action-plan/company-action-plan.routes'
import { loaderedCompanyDashboardRoutes } from 'modules/company-dashboard/company-dashboard.routes'
import { loaderedCompanyQuestionariesRoutes } from 'modules/company-questionaries/company-questionaries.routes'
import { loaderedCompanyContactUsRoutes } from 'modules/company-contact-us/company-contact-us.routes'
import { loaderedCompaniesRoutes } from '../modules/companies/companies.routes'
import { loaderedSettingsRoutes } from '../modules/settings/configurations.routes'
import { SideBar } from '../components/side-bar'
import { RouteContainer } from './styles'
import { Support } from './pages/support'

const allPrivateRoutes = [
	...loaderedCompaniesRoutes,
	...loaderedSettingsRoutes,
	...loaderedKnowledgeBase,
	...loaderedAuditorsAreaRoutes,
	...loaderedCompanyActionPlanRoutes,
	...loaderedCompanyDashboardRoutes,
	...loaderedCompanyQuestionariesRoutes,
	...loaderedCompanyContactUsRoutes,
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
