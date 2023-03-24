export const getTimeDifferenceFromToday = (createdAt: Date) => {
	const createdTime = new Date(createdAt).getTime()
	const now = new Date().getTime()
	const diff = now - createdTime
	const diffHours = Math.floor(diff / (1000 * 60 * 60))
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

	if (diffHours < 1) {
		return '<1h atrás'
	}
	if (diffHours === 1) {
		return '1h atrás'
	}
	if (diffHours < 24) {
		return `${diffHours}h atrás`
	}
	if (diffDays === 1) {
		return '1d atrás'
	}
	if (diffDays <= 7) {
		return `${diffDays}d atrás`
	}
	const date = new Date(createdTime)
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	return `${day}/${month}/${year}`
}
