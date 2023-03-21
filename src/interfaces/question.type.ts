type Grouping = {
	_eq: string
	text: string
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
	threat: string
	recommendation: string
	description: string
	accordingButtons: string[]
	partialAccordingButtons: string[]
}
