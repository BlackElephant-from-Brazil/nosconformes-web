import { Employee } from 'interfaces/employee.type'
import { User } from 'interfaces/user.type'
import { enqueueSnackbar } from 'notistack'
import React, {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { api } from '../api'

type SignInCredentials = {
	email: string
	password: string
}

type AuthContextData = {
	user?: User
	employee?: Employee
	signIn: (credentials: SignInCredentials) => Promise<boolean>
	signOut: () => void
	updateUser: (user?: User, employee?: Employee) => void
}

type AuthProviderProps = {
	children: JSX.Element
	authenticateUser: () => void
}

type AuthState = {
	token: string
	user?: User
	employee?: Employee
}

export const STORAGE_USER_KEY = '@nosconformes:user'
export const STORAGE_EMPLOYEE_KEY = '@nosconformes:employee'
export const STORAGE_TOKEN_KEY = '@nosconformes:token'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	authenticateUser,
}) => {
	const [data, setData] = useState<AuthState>(() => {
		const storagedUser = localStorage.getItem(STORAGE_USER_KEY)
		const storagedEmployee = localStorage.getItem(STORAGE_EMPLOYEE_KEY)
		const storagedToken = localStorage.getItem(STORAGE_TOKEN_KEY)

		if (storagedToken && (storagedUser || storagedEmployee)) {
			api.defaults.headers.authorization = `Bearer ${storagedToken}`
			const userToParse = storagedUser || ''
			const employeeToParse = storagedEmployee || ''
			return {
				token: storagedToken,
				user: JSON.parse(userToParse),
				employee: JSON.parse(employeeToParse),
			}
		}
		return {} as AuthState
	})

	const signIn = useCallback(
		async ({ email, password }: SignInCredentials) => {
			try {
				const response = await api.post('auth/login', {
					email,
					password,
				})

				const { accessToken, user, employee } = response.data

				authenticateUser()
				localStorage.setItem(STORAGE_TOKEN_KEY, accessToken)
				localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user || null))
				localStorage.setItem(
					STORAGE_EMPLOYEE_KEY,
					JSON.stringify(employee || null),
				)
				api.defaults.headers.authorization = `Bearer ${accessToken}`

				setData({
					token: accessToken,
					user,
					employee,
				})
				return true
			} catch (err: any) {
				enqueueSnackbar(err.response.data.message, { variant: 'error' })
				return false
			}
		},
		[authenticateUser],
	)

	const updateUser = useCallback(
		(user?: User, employee?: Employee) => {
			localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
			localStorage.setItem(STORAGE_EMPLOYEE_KEY, JSON.stringify(employee))

			setData({
				...data,
				user,
				employee,
			})
		},
		[data],
	)

	const signOut = useCallback(async () => {
		localStorage.clear()
		api.defaults.headers.authorization = ''
		setData({} as AuthState)
	}, [])

	const contextValue = useMemo(
		() => ({
			signIn,
			signOut,
			user: data.user,
			employee: data.employee,
			updateUser,
		}),
		[signIn, signOut, data.user, data.employee, updateUser],
	)

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	return context
}
