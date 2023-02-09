import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/Close'
import { User } from 'interfaces/user.type'
import { Input } from 'components/input'
import { Button } from 'components/button'
import { Table } from 'components/table'
import { RightDrawer } from 'components/right-drawer'
import { UserForm } from 'modules/settings/components/UserForm'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { enqueueApiError } from 'utils/enqueueApiError'
import { api } from 'api'
import { handleImageError } from 'utils/handle-image-error'
import { AccessLevel } from 'modules/settings/components/access-level'
import { AddNewUserContainer, Container } from './styles'

const tableTitles = ['Nome', 'E-mail', 'Cargo', 'Responsabilidade']

export const Users: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const imgRef = React.useRef<HTMLImageElement>(null)
	const [users, setUsers] = useState<User[]>([])
	const [editableUser, setEditableUser] = useState<User | null>(null)

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const { data } = await api.get('/users')
				setUsers(data)
			} catch (error) {
				enqueueApiError(error)
			}
		})()
	}, [])

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleUserRowClicked = async (userId: string) => {
		try {
			const { data } = await api.get(`/users/${userId}`)
			setEditableUser(data as User)
			toggleDrawer()
		} catch (err) {
			enqueueApiError(err)
		}
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = users.map(user => {
			return (
				<tr
					key={user._eq}
					onClick={() => handleUserRowClicked(user._eq)}
					className="user-table-row"
				>
					<td>
						<img
							src={user.profilePicture}
							alt={`Foto de perfil de ${user.name}`}
							className="user-avatar"
							ref={imgRef}
							onError={() => handleImageError(imgRef)}
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
						<AccessLevel accessLevel={user.accessLevel} />
					</td>
				</tr>
			)
		})
		return renderedTableRow
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchUser')

		try {
			const { data: findUsers } = await api.get(
				`/users?query=${searchInputValue}`,
			)
			setUsers(findUsers)
		} catch (err) {
			enqueueApiError(err)
		}
	}

	const handleCreateNewUserButtonClick = () => {
		setEditableUser(null)
		toggleDrawer()
	}

	return (
		<Container>
			<div className="users-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchUser"
						placeholder="Pesquise por nome, email ou responsabilidade"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					buttonStyle="primary"
					text="Criar novo usuário +"
					className="new-user-button"
					onClick={handleCreateNewUserButtonClick}
				/>
			</div>
			<Table headerTitles={tableTitles} tableRows={renderTableBodyInfo()} />
			<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
				<AddNewUserContainer>
					<CloseIcon className="close-drawer-icon" onClick={toggleDrawer} />
					<div className="drawer-body">
						<h2>{editableUser ? 'Perfil' : 'Crie novos usuários 😁'}</h2>
						<UserForm toggleDrawer={toggleDrawer} user={editableUser} />
					</div>
				</AddNewUserContainer>
			</RightDrawer>
		</Container>
	)
}
