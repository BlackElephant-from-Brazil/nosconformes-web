import React, { createContext, useContext, useState } from 'react'
import api from '../api'
import { AccessLevel } from '../enums/access-level.enum'

type User = {
	_eq: string
	profilePicture: string
	name: string
	email: string
	office: string
	accessLevel: AccessLevel
}

type SignInCredentials = {
	email: string
	password: string
}

type AuthContextData = {
	user: User
	signIn(credentials: SignInCredentials): Promise<void>
	signOut(): void
	updateUser(user: User): void
}

type AuthProviderProps = {
	children: JSX.Element
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>({} as User)

	const signIn = async ({ email, password }: SignInCredentials) => {
		const response = await api.post('auth/login', {
			email,
			password
		})

		const { _success, token, user } = response.data

		if (!_success) console.log('deu bug, mostrar um toast')

		api.defaults.headers.authorization = `Bearer ${token}`

		setUser(user)
	}

	const updateUser = (user: User) => {
		setUser(user)
	}

	const signOut = async () => {
		const response = await api.get('auth/logout')

		const { _success } = response.data

		if (!_success) console.log('deu ruinzao')

		setUser({} as User)
	}


	return (
		<AuthContext.Provider value={{
			signIn, signOut, user, updateUser
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	return context
}