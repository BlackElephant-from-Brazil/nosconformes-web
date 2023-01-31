export type User = {
	_eq: string
	name: string
	avatar: string
	email: string
	office: string
	accessLevel: 'master' | 'manager' | 'consultant' | 'auditor'
}
