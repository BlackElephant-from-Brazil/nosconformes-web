import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const api = axios.create({
	baseURL: 'http://localhost:3333/',
	// baseURL: 'https://nosconformes-api.blackelephant.com.br/',
})

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) {
			localStorage.clear()
			setTimeout(() => {
				window.location.href = '/login'
			}, 2800)
			enqueueSnackbar('Faça login novamente para continuar', {
				variant: 'error',
			})
		}
		return Promise.reject(error)
	},
)

export { api }
