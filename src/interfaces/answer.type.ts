import { Question } from './question.type'

export type Answer = {
	_eq: string
	status: 'pending' | 'approved' | 'rejected'
	conformity: 'conform' | 'partial' | 'non-conform'
	conforming_files: string[]
	partial_conforming_files: string[]
	companyId: string
	questionId: string
	question: Question
}
