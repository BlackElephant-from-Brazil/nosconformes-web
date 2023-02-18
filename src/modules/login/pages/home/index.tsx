import { useAuth } from 'hooks/authentication.hook'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user || Object.keys(user).length === 0) {
			navigate('/login')
		} else {
			navigate('/empresas')
		}
	}, [navigate, user])

	return null
}

export { Home }
