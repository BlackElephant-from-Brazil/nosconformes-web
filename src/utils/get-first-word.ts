export const getFirstWord = (phrase?: string) => {
	if (!phrase) return ''
	return phrase.split(' ')[0]
}
