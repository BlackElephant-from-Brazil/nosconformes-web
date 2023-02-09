import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Settings } from '.'

export const settingsRoutes: RouteObject[] = [
	{
		path: '/configuracoes',
		element: <Settings />,
	},
]
