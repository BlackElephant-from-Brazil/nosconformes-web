import { FormHandles } from '@unform/core'

export const handlePhoneChange = (
	value: string,
	formRef: React.RefObject<FormHandles>,
	fieldName: string,
) => {
	if (!value) return

	const phoneValueWithoutNANChars = value.replace(/[^\d]/g, '')
	let formattedPhoneValue = phoneValueWithoutNANChars
	if (phoneValueWithoutNANChars.length >= 12) {
		formattedPhoneValue = phoneValueWithoutNANChars.substring(
			0,
			phoneValueWithoutNANChars.length - 1,
		)
		formRef.current?.setFieldValue(
			fieldName,
			formattedPhoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
		)
		return
	}

	if (phoneValueWithoutNANChars.length === 10) {
		formRef.current?.setFieldValue(
			fieldName,
			formattedPhoneValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'),
		)
		return
	}

	if (phoneValueWithoutNANChars.length === 11) {
		formRef.current?.setFieldValue(
			fieldName,
			formattedPhoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
		)
	}
}

export const revertPhone = (phone: string) => {
	return phone.replace(/\D/g, '')
}
