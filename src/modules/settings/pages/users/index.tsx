import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/Close'
import { User } from 'interfaces/user.type'
import { Input } from 'components/input'
import { Button } from 'components/button'
import { Table } from 'components/table'
import { RightDrawer } from 'components/right-drawer'
import { UserForm } from 'modules/settings/components/user-form'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { api } from 'api'
import { handleUserImageError } from 'utils/handle-image-error'
import { AccessLevel } from 'modules/settings/components/access-level'
import { handleApiError } from 'utils/handle-api-error'
import { useAuth } from 'hooks/authentication.hook'
import { Employee } from 'interfaces/employee.type'
import AddIcon from '@mui/icons-material/Add'
import { HeaderWithTabs } from 'components/header-with-tabs'
import SettingsIcon from '@mui/icons-material/Settings'
import { Body } from 'components/body'
import { NotFound } from 'components/not-found'
import { AddNewUserContainer, Container } from './styles'

const tableTitles = ['Nome', 'E-mail', 'Cargo', 'Responsabilidade']

export const Users: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [users, setUsers] = useState<User[] | Employee[]>([])
	const [editableUser, setEditableUser] = useState<User | null>(null)
	const { user, employee } = useAuth()
	const [isPageLoading, setIsPageLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				if (user) {
					const { data } = await api.get('/users')
					setUsers(data)
					setIsPageLoading(false)
				} else if (employee) {
					const { data } = await api.get('/employees')
					setUsers(data)
					setIsPageLoading(false)
				}
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [employee, user])

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleUserRowClicked = async (userId: string) => {
		try {
			if (user) {
				const { data } = await api.get(`/users/${userId}`)
				setEditableUser(data as User)
				toggleDrawer()
			} else if (employee) {
				const { data } = await api.get(`/employees/${userId}`)
				setEditableUser(data as User)
				toggleDrawer()
			}
		} catch (err) {
			handleApiError(err)
		}
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = users.map(u => {
			const userImageRef = React.createRef<HTMLImageElement>()
			return (
				<tr
					key={u._eq}
					onClick={() => handleUserRowClicked(u._eq)}
					className="user-table-row"
				>
					<td>
						<img
							src={u.profilePicture}
							alt={`Foto de perfil de ${u.name}`}
							className="user-avatar"
							ref={userImageRef}
							onError={() => handleUserImageError(userImageRef)}
						/>
						<p>{u.name}</p>
					</td>
					<td>
						<p>{u.email}</p>
					</td>
					<td>
						<p>{u.office}</p>
					</td>
					<td>
						<AccessLevel accessLevel={u.accessLevel} />
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
			handleApiError(err)
		}
	}

	const handleCreateNewUserButtonClick = () => {
		setEditableUser(null)
		toggleDrawer()
	}

	const reloadTable = async () => {
		try {
			const { data } = await api.get('/users')
			setUsers(data)
		} catch (error) {
			handleApiError(error)
		}
	}

	return (
		<Container>
			<HeaderWithTabs
				icon={<SettingsIcon />}
				title="Configurações"
				tabs={[
					{
						title: 'Perfil',
						link: '/perfil',
					},
					{
						title: 'Usuários',
						link: '/usuarios',
					},
				]}
				active="/usuarios"
			/>
			<Body isLoading={isPageLoading}>
				<div className="users-list-utilities">
					<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
						<Input
							name="searchUser"
							placeholder="Pesquise por nome, email ou cargo"
							endAdornmentIcon={<SearchRoundedIcon />}
							className="search-input"
							onChange={handleSearchInputChange}
						/>
					</Form>
					<Button
						variant="primary"
						text="Criar novo usuário"
						endIcon={<AddIcon />}
						className="new-user-button"
						onClick={handleCreateNewUserButtonClick}
					/>
				</div>
				{users.length === 0 ? (
					<NotFound />
				) : (
					<Table
						headerTitles={tableTitles}
						tableRows={renderTableBodyInfo()}
						className="table-users"
					/>
				)}
				<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
					<AddNewUserContainer>
						<CloseIcon className="close-drawer-icon" onClick={toggleDrawer} />
						<div className="drawer-body">
							<h2>{editableUser ? 'Perfil' : 'Crie novos usuários 😁'}</h2>
							<UserForm
								toggleDrawer={toggleDrawer}
								user={editableUser}
								reloadTable={reloadTable}
							/>
						</div>
					</AddNewUserContainer>
				</RightDrawer>
			</Body>
		</Container>
	)
}
