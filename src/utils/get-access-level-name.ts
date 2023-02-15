import { User } from 'interfaces/user.type'

export const getAccessLevelName = (accessLevel: User['accessLevel']) => {
	switch (accessLevel) {
		case 'auditor':
			return 'Auditor'
		case 'consultant':
			return 'Consultor'
		case 'manager':
			return 'Gestor'
		case 'master':
			return 'Master'
		default:
			return 'Usuário'
	}
}
