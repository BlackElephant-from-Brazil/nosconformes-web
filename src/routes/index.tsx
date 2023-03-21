import React from 'react'
import { Home } from 'modules/login/pages/home'
import { createBrowserRouter } from 'react-router-dom'
import { SideBar } from 'components/side-bar'
import { STORAGE_USER_KEY } from 'hooks/authentication.hook'
import { privateRoutes } from './private.routes'
import { publicRoutes } from './public.routes'
import { Error404 } from './pages/error-404'
import { ErrorHandler } from './pages/error-handler'

const errorElement = (() => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	if (!storagedUser) {
		return <ErrorHandler />
	}
	return (
		<>
			<SideBar />
			<ErrorHandler />
		</>
	)
})()

const allRoutes = [
	{
		path: '/',
		element: <Home />,
		errorElement,
	},
	...publicRoutes.map(route => {
		return {
			...route,
			errorElement,
		}
	}),
	...privateRoutes.map(route => {
		return {
			...route,
			errorElement,
		}
	}),
	{
		path: '*',
		element: (() => {
			const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
			if (!storagedUser) {
				return <Error404 />
			}
			return (
				<>
					<SideBar />
					<Error404 />
				</>
			)
		})(),
		errorElement,
	},
]

const router = createBrowserRouter(allRoutes)

export { router }
