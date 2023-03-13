import { Auditor } from './auditor.type'
import { Manager } from './manager.type'

export type Company = {
	_eq: string
	logo: string
	name: string
	sector: string
	manager?: Manager
	cnpj: string
	site: string
	points: number
	progress: number
	status: 'late' | 'finished' | 'inprogress' | 'notstarted'
	auditors: Auditor[]
}
