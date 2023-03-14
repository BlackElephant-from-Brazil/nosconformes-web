import { User } from 'interfaces/user.type'

export const getAccessLevelName = (accessLevel: User['accessLevel']) => {
	switch (accessLevel) {
		case 'auditor':
			return 'Auditor'
		case 'consultor':
			return 'Consultor'
		case 'gestor':
			return 'Gestor'
		case 'master':
			return 'Master'
		default:
			return 'Usuário'
	}
}
