import React from 'react'
import { RouteObject } from 'react-router-dom'
import { AddFirstCompany } from './AddFirstCompany'

const companiesRoutes: RouteObject[] = [
	{
		path: '/cadastre-sua-primeira-empresa',
		element: <AddFirstCompany />
	},
]

export { companiesRoutes }