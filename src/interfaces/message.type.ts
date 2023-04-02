import { Employee } from './employee.type'
import { User } from './user.type'

export type Message = {
	_eq: string
	user?: User
	employee?: Employee
	questionId: string
	companyId: string
	text: string
	read: boolean
	createdAt: Date
}
