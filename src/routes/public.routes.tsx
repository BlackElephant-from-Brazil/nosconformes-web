import React from 'react'
import { STORAGE_USER_KEY } from 'hooks/authentication.hook'
import { loginRoutes } from 'modules/login/login.routes'
import { redirect } from 'react-router-dom'

const validateLoggedUser = () => {
	const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
	if (storagedUser) {
		return redirect('/empresas')
	}
	return null
}

const allPublicRoutes = [...loginRoutes]

const publicRoutes = allPublicRoutes.map(route => {
	return {
		...route,
		loader: validateLoggedUser,
	}
})

export { publicRoutes }
