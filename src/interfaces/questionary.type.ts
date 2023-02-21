import { Auditor } from './auditor.type'
import { Company } from './company.type'

export type Questionary = {
	_eq: string
	name: string
	auditors: Auditor[]
	companies: Company[]
}
