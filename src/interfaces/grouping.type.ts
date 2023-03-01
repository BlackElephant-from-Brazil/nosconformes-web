import { Question } from './question.type'

export type Grouping = {
	_eq: string
	name: string
	questions: Question[]
}
