export const isObjectEmpty = (obj: object) => {
	return JSON.stringify(obj) === '{}'
}
