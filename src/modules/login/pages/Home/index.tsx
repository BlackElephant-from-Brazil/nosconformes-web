import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../hooks/authentication.hook'

const Home: React.FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			navigate('/login')
		} else {
			navigate('/dashboard')
		}
	}, [user])

	return <></>
}

export { Home }