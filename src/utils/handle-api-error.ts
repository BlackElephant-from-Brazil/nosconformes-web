import { enqueueSnackbar } from 'notistack'

export const handleApiError = (err: any) => {
	enqueueSnackbar(err.response.data.message, { variant: 'error' })
}
