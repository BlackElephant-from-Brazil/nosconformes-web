export const getAccessLevelName = (
	accessLevel?:
		| 'master'
		| 'gestor'
		| 'consultor'
		| 'auditor'
		| 'patrocinador'
		| 'stackholder',
) => {
	if (!accessLevel) return 'Usuário'
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
