import React, { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/Close'
import { User } from 'interfaces/user.type'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { AddNewUserContainer, Container } from './styles'
import { Table } from '../../../components/Table'
import { RightDrawer } from '../../../components/RightDrawer'
import { UserForm } from '../components/UserForm'

const tableTitles = ['Nome', 'E-mail', 'Cargo']

const users: User[] = [
	{
		_eq: 'test-id',
		avatar:
			'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg',
		name: 'Ana Clara Santos',
		email: 'ana.dm11@gmail.com ',
		office: 'Gestora',
		accessLevel: 'consultant',
	},
]

export const Users: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleAddNewUser = () => {
		toggleDrawer()
	}

	const handleUserRowClicked = () => {
		toggleDrawer()
	}

	const handleSaveUser = () => {
		toggleDrawer()
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = users.map(user => {
			return (
				<tr
					key={user._eq}
					onClick={handleUserRowClicked}
					className="user-table-row"
				>
					<td>
						<img
							src={user.avatar}
							alt={`Foto de perfil de ${user.name}`}
							className="user-avatar"
						/>
						<p>{user.name}</p>
					</td>
					<td>
						<p>{user.email}</p>
					</td>
					<td>
						<p>{user.office}</p>
					</td>
					<td>
						<p>{user.accessLevel}</p>
					</td>
				</tr>
			)
		})

		return renderedTableRow
	}

	return (
		<Container>
			<div className="users-list-utilities">
				<Input
					name="searchUser"
					placeholder="Pesquise por nome, email ou responsabilidade"
					endAdornmentIcon={<SearchRoundedIcon />}
					className="search-input"
				/>
				<Button
					buttonStyle="primary"
					text="Criar novo usuário +"
					className="new-user-button"
					onClick={handleAddNewUser}
				/>
			</div>
			<Table headerTitles={tableTitles} tableRows={renderTableBodyInfo()} />
			<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
				<AddNewUserContainer>
					<CloseIcon className="close-drawer-icon" onClick={toggleDrawer} />
					<div className="drawer-body">
						<h2>Crie novos usuários 😁</h2>
						<UserForm saveUser={handleSaveUser} />
					</div>
				</AddNewUserContainer>
			</RightDrawer>
		</Container>
	)
}
