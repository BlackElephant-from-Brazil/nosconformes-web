export const formatSite = (site?: string): string => {
	if (!site) return ''
	const siteWithoutHttp = site
		.replace('http://', '')
		.replace('https://', '')
		.replace('www.', '')

	if (siteWithoutHttp.endsWith('/')) {
		return siteWithoutHttp.slice(0, -1)
	}

	return siteWithoutHttp
}
