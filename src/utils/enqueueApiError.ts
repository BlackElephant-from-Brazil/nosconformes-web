import { enqueueSnackbar } from 'notistack'

export const enqueueApiError = (err: any) => {
	enqueueSnackbar(err.response.data.message, { variant: 'error' })
}