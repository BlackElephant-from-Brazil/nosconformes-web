import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/authentication.hook'

type RouteProtectionProps = {
	children: JSX.Element
}

export const RouteProtection: React.FC<RouteProtectionProps> = ({ children }) => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (Object.keys(user).length === 0)
			navigate('/')
	}, [user])

	return (
		<>
			{children}
		</>
	)
}