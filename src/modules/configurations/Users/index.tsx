import React from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Container } from './styles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Table } from '../../../components/Table'
import { AccessLevels, ACCESS_LEVEL_CONSULTANT } from '../../companies/components/AccessLevel'

type User = {
	avatar: string
	name: string
	email: string
	office: string
	accessLevel: AccessLevels
}

const tableTitles = [
	'Nome',
	'E-mail',
	'Cargo'
]

const users: User[] = [{
	avatar: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg',
	name: 'Ana Clara Santos',
	email: 'ana.dm11@gmail.com ',
	office: 'Gestora',
	accessLevel: ACCESS_LEVEL_CONSULTANT
}]

export const Users: React.FC = () => {
	const handleAddNewUser = () => {
		console.log('adicionando usuários')
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = users.map(user => {
			return (
				<>
					<td>
						<img src={user.avatar} alt={`Foto de perfil de ${user.name}`} className='user-avatar' />
						<p>
							{user.name}
						</p>
					</td>
					<td>
						<p>
							{user.email}
						</p>
					</td>
					<td>
						<p>
							{user.office}
						</p>
					</td>
					<td>
						<p>
							{user.accessLevel}
						</p>
					</td>
				</>
			)
		})

		return renderedTableRow
	}

	return (
		<Container>
			<div className="users-list-utilities">
				<Input name='searchUser' placeholder='Pesquise por nome, email ou responsabilidade' endAdornmentIcon={<SearchRoundedIcon />} className='search-input' />
				<Button buttonStyle='primary' text='Criar novo usuário +' className='new-user-button' onClick={handleAddNewUser} />
			</div>
			<Table headerTitles={tableTitles} tableRows={renderTableBodyInfo()} />
		</Container>
	)
}