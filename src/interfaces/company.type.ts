import { Auditor } from './auditor.type'
import { Manager } from './manager.type'

export type Company = {
	_eq: string
	logo: string,
	name: string,
	manager?: Manager,
	cnpj: string,
	site: string,
	status: 'late' | 'finished' | 'inprogress',
	auditors: Auditor[]
}