import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

export const handleYupErrors = (
	err: any,
	formRef: React.RefObject<FormHandles>,
	callbackDisplayErros: React.Dispatch<React.SetStateAction<string>>,
	complexPath?: string,
) => {
	let allErrors = ''
	if (err instanceof Yup.ValidationError) {
		const validationErrors: { [key: string]: string } = {}
		err.inner.forEach(error => {
			if (error.path)
				validationErrors[`${complexPath || ''}${error.path}`] = error.message
			allErrors += error.message
		})
		formRef.current?.setErrors(validationErrors)
		callbackDisplayErros(allErrors)
	}
}
