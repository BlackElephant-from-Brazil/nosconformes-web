import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import { Button } from 'components/button'
import { User } from 'interfaces/user.type'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { handleApiError } from 'utils/enqueueApiError'
import { handleYupErrors } from 'utils/handleYupErrors'
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

	useEffect(() => {
		if (user) {
			formRef.current?.setData({
				name: user.name,
				email: user.email,
				phone: user.phone,
				office: user.office,
				accessLevel: user.accessLevel,
			})
		}
	}, [user])

	const handleSubmitFormUser: SubmitHandler<FormData> = async data => {
		setDisplayErrors('')
		const phone = revertPhone(data.phone)
		const userData = {
			name: data.name,
			email: data.email,
			phone,
			office: data.office,
			accessLevel: data.accessLevel,
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
	return (
		<Container>
			<ImageUploader />
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
				<Button buttonStyle="primary" text="Salvar" type="submit" />
			</Form>
		</Container>
	)
}
