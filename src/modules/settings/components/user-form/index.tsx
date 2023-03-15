import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import { Button } from 'components/button'
import { User } from 'interfaces/user.type'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { handleApiError } from 'utils/handle-api-error'
import { handleYupErrors } from 'utils/handle-yup-errors'
import * as Yup from 'yup'
import { revertPhone } from 'utils/handlePhoneChange'
import { Alert } from 'components/alert'
import { api } from 'api'
import { ImageUploader } from '../../../../components/image-uploader'
import { Input } from '../../../../components/input'
import { Container } from './styles'
import { AccessLevelInput } from '../acess-level-input'

type UserFormProps = {
	toggleDrawer: () => void
	user: User | null
	reloadTable: () => void
}

type FormData = {
	name: string
	email: string
	phone: string
	office: string
	accessLevel: User['accessLevel']
}

const errorMessages = {
	name: {
		unfilled: 'Preencha o seu nome. ',
	},
	email: {
		unfilled: 'Insira o email. ',
		invalid: 'O email precisa ser um email válido. ',
	},

	phone: {
		unfilled: 'Por favor, preencha o telefone. ',
		lessThan10Chars: 'Preencha o telefone completo. ',
	},
	office: {
		unfilled: 'O cargo é obrigatório. ',
	},
}

export const UserForm: React.FC<UserFormProps> = ({
	toggleDrawer,
	user,
	reloadTable,
}) => {
	const formRef = React.useRef<FormHandles>(null)
	const [displayErrors, setDisplayErrors] = useState('')
	const [profilePicture, setProfilePicture] = useState('')

	useEffect(() => {
		if (user) {
			formRef.current?.setData({
				name: user.name,
				email: user.email,
				phone: user.phone,
				office: user.office,
				accessLevel: user.accessLevel,
			})
			setProfilePicture(user.profilePicture)
		}
	}, [user])

	const handleSubmitFormUser: SubmitHandler<FormData> = async data => {
		setDisplayErrors('')
		const phone = revertPhone(data.phone)
		const userData = {
			name: data.name.trim(),
			email: data.email.trim(),
			phone,
			office: data.office.trim(),
			accessLevel: data.accessLevel.trim(),
		}

		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.name.unfilled),
				email: Yup.string()
					.required(errorMessages.email.unfilled)
					.email(errorMessages.email.invalid),
				phone: Yup.string()
					.required(errorMessages.phone.unfilled)
					.min(10, errorMessages.phone.lessThan10Chars),
				office: Yup.string().required(errorMessages.office.unfilled),
			})

			await schema.validate(userData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayErrors)
			return
		}

		try {
			if (user) {
				await api.put(`/users/${user._eq}`, {
					...userData,
					profilePicture: 'photo.png',
				})
				enqueueSnackbar('Usuário atualizado com sucesso!', {
					variant: 'success',
				})
			} else {
				await api.post('/users', {
					...userData,
					profilePicture: 'photo.png',
				})
				enqueueSnackbar('Usuário cadastrado com sucesso!', {
					variant: 'success',
				})
			}
			reloadTable()
			toggleDrawer()
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleDeleteUserPic = async () => {
		try {
			await api.delete(`/users/${user?._eq}/picture`)
			enqueueSnackbar('Foto de perfil removida com sucesso!', {
				variant: 'success',
			})
			setProfilePicture('')
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleUploadUserProfilePicture = async (file: File) => {
		try {
			const data = new FormData()
			data.append('file', file)
			const response = await api.post(
				`/users/${user?._eq}/profile-picture`,
				data,
			)
			enqueueSnackbar('Foto de perfil atualizada com sucesso!', {
				variant: 'success',
			})
			setProfilePicture(response.data.profilePicture)
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container>
			<ImageUploader
				onDelete={handleDeleteUserPic}
				initialImage={profilePicture}
				onEdit={handleUploadUserProfilePicture}
			/>
			<div className="space" />
			<Form onSubmit={handleSubmitFormUser} ref={formRef}>
				<Input name="name" label="Nome" />
				<Input name="email" label="Email" />
				<Input name="phone" label="Telefone" />
				<Input name="office" label="Cargo" />
				<AccessLevelInput
					name="Selecione o perfil"
					formRef={formRef}
					accessLevel={user?.accessLevel || 'auditor'}
				/>
				<Input type="hidden" name="accessLevel" />
				<Alert text={displayErrors} type="error" />
				<Button variant="primary" text="Salvar" type="submit" />
			</Form>
		</Container>
	)
}
