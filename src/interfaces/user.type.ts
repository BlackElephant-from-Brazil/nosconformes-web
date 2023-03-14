export type User = {
	_eq: string
	name: string
	profilePicture: string
	email: string
	office: string
	phone: string
	accessLevel: 'master' | 'gestor' | 'consultor' | 'auditor'
}
