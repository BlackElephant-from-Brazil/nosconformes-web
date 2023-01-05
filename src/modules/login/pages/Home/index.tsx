import React, { useEffect, useState } from 'react'
import api from '../../../../api'

const Home: React.FC = () => {
	const [user, setUser] = useState<any | undefined>()

	useEffect(() => {
		api
			.get('/users')
			.then((response) => setUser(response.data[0]))
			.catch((err) => {
				console.error('ops! ocorreu um erro' + err)
			})
	}, [])



	return (
		<div>
			{
				user?.name
			}
		</div>
	)
}

export { Home }