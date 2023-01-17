import { Auditor } from './auditor.type'

export type Company = {
	_eq: string
	logo: string,
	name: string,
	manager?: string,
	status: 'late' | 'finished' | 'inprogress',
	auditors: Auditor[]
}