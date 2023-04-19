import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
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
