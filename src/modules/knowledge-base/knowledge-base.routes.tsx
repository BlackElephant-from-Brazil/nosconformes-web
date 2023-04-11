import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { Questions } from './pages/questions'
import { Questionaries } from './pages/questionaries'

const knowledgeBaseRoutes: RouteObject[] = [
	{
		path: '/base-de-conhecimento/perguntas',
		element: <Questions />,
	},
	{
		path: '/base-de-conhecimento/questionarios',
		element: <Questionaries />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedUser === 'null' && storagedEmployee !== 'null') {
		return redirect('/dashboard-da-empresa')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedKnowledgeBase = knowledgeBaseRoutes.map(route => {
	return {
		...route,
		loader,
		element: route.element,
	}
})

export { loaderedKnowledgeBase }
