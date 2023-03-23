export const showPriority = (priority?: number): string => {
	if (priority === undefined) return ''
	const priorityText = ['Baixa', 'Média', 'Alta', 'Crítica', 'Extrema']

	return priorityText[priority - 1]
}
