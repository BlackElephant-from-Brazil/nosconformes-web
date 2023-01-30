import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { enqueueApiError } from './enqueueApiError'

export function errorHandler(
	err: unknown,
	formRef: React.RefObject<FormHandles>,
	displayErrors?: (value: React.SetStateAction<string>) => void,
) {
	let allErrors = ''

	if (err instanceof Yup.ValidationError) {
		const validationErrors: { [key: string]: string } = {}
		err.inner.forEach(error => {
			if (error.path) validationErrors[error.path] = error.message
			allErrors += error.message
		})
		formRef.current?.setErrors(validationErrors)
		if (displayErrors) displayErrors(allErrors)
	} else {
		enqueueApiError(err)
	}
}
