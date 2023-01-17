import { ServerException } from 'interfaces/server-exception.type'
import { enqueueSnackbar } from 'notistack'
import React, { createContext, useContext, useState } from 'react'
import { api } from '../api'
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
	signIn(credentials: SignInCredentials): Promise<boolean>
	signOut(): void
	updateUser(user: User): void
}

type AuthProviderProps = {
	children: JSX.Element
	authenticateUser: () => void
}

type AuthState = {
	token: string
	user: User
}

export const STORAGE_USER_KEY = '@nosconformes:user'
export const STORAGE_TOKEN_KEY = '@nosconformes:token'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authenticateUser }) => {
	const [data, setData] = useState<AuthState>(() => {
		const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
		const storagedToken = localStorage.getItem(STORAGE_TOKEN_KEY)

		if (storagedToken && storagedUser) {
			api.defaults.headers.authorization = `Bearer ${storagedToken}`
			return { token: storagedToken, user: JSON.parse(storagedUser) }
		}
		return {} as AuthState
	})

	const signIn = async ({ email, password }: SignInCredentials) => {

		try {
			const response = await api.post('auth/login', {
				email,
				password
			})

			const { accessToken, user } = response.data

			authenticateUser()
			localStorage.setItem(STORAGE_TOKEN_KEY, accessToken)
			localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
			api.defaults.headers.authorization = `Bearer ${accessToken}`

			setData({
				token: accessToken,
				user
			})
			return true
		} catch (err: any) {
			enqueueSnackbar(err.response.data.message, { variant: 'error' })
			return false
		}
	}

	const updateUser = (user: User) => {
		localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))

		setData({
			...data,
			user
		})
	}

	const signOut = async () => {
		const response = await api.get('auth/logout')

		const { _success } = response.data

		if (!_success) {
			console.log('deu ruinzao')
			return
		}

		localStorage.removeItem(STORAGE_TOKEN_KEY)
		localStorage.removeItem(STORAGE_USER_KEY)
		api.defaults.headers.authorization = ''
		setData({} as AuthState)
	}


	return (
		<AuthContext.Provider value={{
			signIn, signOut, user: data.user, updateUser
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	return context
}