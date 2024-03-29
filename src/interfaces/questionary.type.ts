import { Auditor } from './auditor.type'
import { Company } from './company.type'
import { Employee } from './employee.type'
import { Grouping } from './grouping.type'

export type Questionary = {
	_eq: string
	name: string
	auditors: Auditor[]
	companies: Company[]
	groupings: Grouping[]
	percentage?: number
	employees?: Employee[]
}
