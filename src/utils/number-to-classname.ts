export const numberToClassName = (number?: number) => {
	if (!number) return ''
	const classNames = ['one', 'two', 'three', 'four', 'five']
	return classNames[number - 1]
}
