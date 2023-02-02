import React from 'react'
import { RouteObject } from 'react-router-dom'
import { KnowledgeBase } from '.'

const knowledgeBaseRoutes: RouteObject[] = [
	{
		path: '/base-de-conhecimento',
		element: <KnowledgeBase />,
	},
]

export { knowledgeBaseRoutes }
