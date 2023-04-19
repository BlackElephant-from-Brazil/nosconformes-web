import { Question } from './question.type'

export type Answer = {
	_eq: string
	status: 'pending' | 'approved' | 'rejected'
	conformity: 'conform' | 'partial' | 'non-conform'
	companyId: string
	questionId: string
	question: Question
}
