import React from 'react'
import {
	STORAGE_EMPLOYEE_KEY,
	STORAGE_USER_KEY,
} from 'hooks/authentication.hook'
import { redirect, RouteObject } from 'react-router-dom'
import { Questionaries } from './pages/questionaries'
import { QuestionaryDetails } from './pages/questionary-details'
import { QuestionsFromGrouping } from './pages/questions-from-grouping'
import { AnswerQuestions } from './pages/answer-questions'

const companyQuestionariesRoutes: RouteObject[] = [
	{
		path: '/questionarios-da-empresa',
		element: <Questionaries />,
	},
	{
		path: '/questionarios-da-empresa/:questionaryId',
		element: <QuestionaryDetails />,
	},
	{
		path: '/questionarios-da-empresa/:questionaryId/perguntas-do-agrupamento/:groupingId',
		element: <QuestionsFromGrouping />,
	},
	{
		path: '/questionarios-da-empresa/:questionaryId/perguntas-do-agrupamento/:groupingId/responder-perguntas',
		element: <AnswerQuestions />,
	},
]

const loader = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
	if (storagedEmployee === 'null' && storagedUser !== 'null') {
		return redirect('/empresas')
	}
	if (!storagedUser && !storagedEmployee) {
		return redirect('/login')
	}
	return null
}

const loaderedCompanyQuestionariesRoutes = companyQuestionariesRoutes.map(
	route => {
		return {
			...route,
			loader,
			element: route.element,
		}
	},
)

export { loaderedCompanyQuestionariesRoutes }
