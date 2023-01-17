import React, { useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { AddNewUserContainer, Container } from './styles'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Table } from '../../../components/Table'
import { AccessLevels, ACCESS_LEVEL_CONSULTANT } from '../../companies/components/access-level'
import { RightDrawer } from '../../../components/RightDrawer'
import CloseIcon from '@mui/icons-material/Close'
import { UserForm } from '../components/UserForm'

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
	const [drawerOpen, setDrawerOpen] = useState(false)
	const handleAddNewUser = () => {
		toggleDrawer()
	}

	const handleUserRowClicked = () => {
		console.log('Editando o perfil do usuário.')
		toggleDrawer()
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = users.map((user, i) => {
			return (
				<tr key={i} onClick={handleUserRowClicked} className='user-table-row'>
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
				</tr>
			)
		})

		return renderedTableRow
	}

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleSaveUser = () => {
		toggleDrawer()
		console.log('usuário salvo com sucesso')
	}

	return (
		<Container>
			<div className="users-list-utilities">
				<Input name='searchUser' placeholder='Pesquise por nome, email ou responsabilidade' endAdornmentIcon={<SearchRoundedIcon />} className='search-input' />
				<Button buttonStyle='primary' text='Criar novo usuário +' className='new-user-button' onClick={handleAddNewUser} />
			</div>
			<Table headerTitles={tableTitles} tableRows={renderTableBodyInfo()} />
			<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
				<AddNewUserContainer>
					<CloseIcon className='close-drawer-icon' onClick={toggleDrawer} />
					<div className="drawer-body">
						<h2>
							Crie novos usuários 😁
						</h2>
						<UserForm saveUser={handleSaveUser} />
					</div>
				</AddNewUserContainer>
			</RightDrawer>
		</Container>
	)
}