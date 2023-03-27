import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/authentication.hook'

type RouteProtectionProps = {
	children: JSX.Element
}

export const RouteProtection: React.FC<RouteProtectionProps> = ({
	children,
}) => {
	const { user, employee } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user && !employee) {
			navigate('/')
			return
		}
		if (employee && Object.keys(employee).length === 0) navigate('/')
		if (user && Object.keys(user).length === 0) navigate('/')
	}, [employee, navigate, user])

	return <>({children})</>
}
