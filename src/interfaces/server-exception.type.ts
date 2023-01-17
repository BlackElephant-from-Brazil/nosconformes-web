export type ServerException = {
	response: {
		data: {
			statusCode: number
			message: string
		}
	}
}