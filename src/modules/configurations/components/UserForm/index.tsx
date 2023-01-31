import React from 'react'
import { BT_PRIMARY, Button } from '../../../../components/button'
import { ImageUploader } from '../../../../components/image-uploader'
import { Input } from '../../../../components/input'
import { Container } from './styles'

type UserForm = {
	saveUser: () => void
}

export const UserForm: React.FC<UserForm> = ({ saveUser }) => {
	return (
		<Container action="">
			<ImageUploader />
			<div className="space" />
			<Input name="name" label="Nome" />
			<Input name="email" label="Email" />
			<Input name="office" label="Cargo" />
			<Input name="accessLevel" label="Nível de acesso" />
			<Button buttonStyle={BT_PRIMARY} text="Salvar" onClick={saveUser} />
		</Container>
	)
}
