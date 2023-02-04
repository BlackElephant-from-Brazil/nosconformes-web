import React from 'react'
import { RouteObject } from 'react-router-dom'
import { Configurations } from '.'

export const configurationsRoutes: RouteObject[] = [
	{
		path: '/configuracoes',
		element: <Configurations />,
	},
]
