type Grouping = {
	_eq: string
	text: string
}
type Tag = {
	_eq: string
	text: string
}
type Reference = {
	_eq: string
	text: string
}

export type Question = {
	_eq: string
	id: string
	question: string
	funcs: Array<'protect' | 'identify' | 'detect' | 'respond' | 'recover'>
	groupings: Grouping[]
	tags: Tag[]
	references: Reference[]
	threat: string
	recommendation: string
	description: string
	accordingButtons: string[]
	partialAccordingButtons: string[]
}
