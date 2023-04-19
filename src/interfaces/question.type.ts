import { AccordingButton } from './according-button.type'
import { Answer } from './answer.type'
import { Employee } from './employee.type'
import { PartialAccordingButton } from './partial-according-button.type'
import { Questionary } from './questionary.type'

type Grouping = {
	_eq: string
	name: string
	questionaries: Questionary[]
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
	accordingButtons: AccordingButton[]
	partialAccordingButtons: PartialAccordingButton[]
	answer: Answer
	employees?: Employee[]
}
