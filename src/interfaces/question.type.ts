import { Answer } from './answer.type'

type Grouping = {
	_eq: string
	name: string
}
type Tag = {
	_eq: string
	label: string
}
type Reference = {
	_eq: string
	label: string
}

export type Question = {
	_eq: string
	id: string
	question: string
	func: 'protect' | 'identify' | 'detect' | 'respond' | 'recover'
	groupings: Grouping[]
	tags: Tag[]
	references: Reference[]
	priority: number
	probability: number
	impact: number
	threat: string
	recommendation: string
	description: string
	accordingButtons: string[]
	partialAccordingButtons: string[]
	answer: Answer
}
