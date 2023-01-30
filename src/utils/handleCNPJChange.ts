import { FormHandles } from '@unform/core'

export const handleCNPJChange = (
	value: string,
	formRef: React.RefObject<FormHandles>,
	fieldName: string,
) => {
	if (!value) return

	const cnpjValueWithouNANChars = value.replace(/[^\d]/g, '')
	let formattedCNPJValue = cnpjValueWithouNANChars
	if (cnpjValueWithouNANChars.length >= 15)
		formattedCNPJValue = cnpjValueWithouNANChars.substring(
			0,
			cnpjValueWithouNANChars.length - 1,
		)

	formRef.current?.setFieldValue(
		fieldName,
		formattedCNPJValue.replace(
			/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			'$1.$2.$3/$4-$5',
		),
	)
}

export const revertCnpj = (cnpj: string) => {
	return cnpj.replace(/\D/g, '')
}
