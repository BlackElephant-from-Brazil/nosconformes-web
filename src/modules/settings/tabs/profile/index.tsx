import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import { api } from 'api'
import { Alert } from 'components/alert'
import { Button } from 'components/button'
import { ImageUploader } from 'components/image-uploader'
import { Input } from 'components/input'
import { useAuth } from 'hooks/authentication.hook'
import { User } from 'interfaces/user.type'
import { AccessLevelInput } from 'modules/settings/components/acess-level-input'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { handleApiError } from 'utils/handle-api-error'
import { revertPhone } from 'utils/handlePhoneChange'
import { handleYupErrors } from 'utils/handle-yup-errors'
import * as Yup from 'yup'
import { Employee } from 'interfaces/employee.type'
import { Container } from './styles'

type UpdateProfileForm = {
	name: string
	email: string
	phone: string
	password?: string
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
	password: {
		unfilled: 'Preencha a senha. ',
		invalid:
			'Sua senha precisa ter: 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial. ',
	},
}

export const Profile: React.FC = () => {
	const formRef = React.useRef<FormHandles>(null)
	const [profileData, setProfileData] = useState({} as User | Employee)
	const [displayErrors, setDisplayErrors] = useState('')
	const { user, updateUser, employee } = useAuth()

	useEffect(() => {
		;(async () => {
			try {
				if (user) {
					const { data } = await api.get(`/users/${user._eq}`)
					setProfileData({ ...data, password: '**********' })
				} else if (employee) {
					const { data } = await api.get(`/employees/${employee._eq}`)
					setProfileData({ ...data, password: '**********' })
				}
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee, user])

	useEffect(() => {
		formRef.current?.setData({ ...profileData, accessLevel: profileData.name })
	}, [profileData])

	const handleSubmitFormUpdateProfile: SubmitHandler<
		UpdateProfileForm
	> = async data => {
		setDisplayErrors('')
		let updateProfileData
		const phone = revertPhone(data.phone)

		if (data.password === '**********') {
			delete data.password
			updateProfileData = {
				name: data.name.trim(),
				email: data.email.trim(),
				phone,
				office: data.office.trim(),
				accessLevel: data.accessLevel.trim(),
			}
		} else {
			updateProfileData = {
				name: data.name.trim(),
				email: data.email.trim(),
				phone,
				office: data.office.trim(),
				password: data.password?.trim(),
				accessLevel: data.accessLevel.trim(),
			}
		}

		try {
			let schema
			if (data.password) {
				schema = Yup.object().shape({
					name: Yup.string().required(errorMessages.name.unfilled),
					email: Yup.string()
						.required(errorMessages.email.unfilled)
						.email(errorMessages.email.invalid),
					phone: Yup.string()
						.required(errorMessages.phone.unfilled)
						.min(10, errorMessages.phone.lessThan10Chars),
					office: Yup.string().required(errorMessages.office.unfilled),
					password: Yup.string()
						.required(errorMessages.password.unfilled)
						.matches(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							errorMessages.password.invalid,
						),
				})
			} else {
				schema = Yup.object().shape({
					name: Yup.string().required(errorMessages.name.unfilled),
					email: Yup.string()
						.required(errorMessages.email.unfilled)
						.email(errorMessages.email.invalid),
					phone: Yup.string()
						.required(errorMessages.phone.unfilled)
						.min(10, errorMessages.phone.lessThan10Chars),
					office: Yup.string().required(errorMessages.office.unfilled),
				})
			}

			await schema.validate(updateProfileData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayErrors)
			return
		}

		try {
			if (user) {
				await api.put(`/users/${user._eq}`, {
					...updateProfileData,
				})
			} else if (employee) {
				await api.put(`/employees/${employee._eq}`, {
					...updateProfileData,
				})
			}
			enqueueSnackbar('Dados atualizados com sucesso!', { variant: 'success' })
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleClickSubmitFormButton = () => {
		formRef.current?.submitForm()
	}

	const handleDeleteProfilePicture = async () => {
		try {
			if (user) {
				await api.delete(`/users/${user._eq}/photo`)

				enqueueSnackbar('Foto de perfil removida com sucesso!', {
					variant: 'success',
				})
				setProfileData({ ...profileData, profilePicture: '' })
				updateUser({ ...user, profilePicture: '' })
			} else if (employee) {
				await api.delete(`/employees/${employee._eq}/photo`)

				enqueueSnackbar('Foto de perfil removida com sucesso!', {
					variant: 'success',
				})
				setProfileData({ ...profileData, profilePicture: '' })
				updateUser(undefined, { ...employee, profilePicture: '' })
			}
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleUploadProfilePicture = async (file: File) => {
		try {
			const data = new FormData()
			data.append('photo', file)
			let response: any
			if (user) {
				response = await api.post(`/users/${user._eq}/photo`, data)
				setProfileData({ ...profileData, profilePicture: response.data })

				updateUser({ ...user, profilePicture: response.data })
			} else if (employee) {
				response = await api.post(`/users/${employee._eq}/photo`, data)
				setProfileData({ ...profileData, profilePicture: response.data })

				updateUser(undefined, { ...employee, profilePicture: response.data })
			}
			enqueueSnackbar('Foto de perfil atualizada com sucesso!', {
				variant: 'success',
			})
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container>
			<Button
				text="Salvar"
				variant="primary"
				onClick={handleClickSubmitFormButton}
				className="save-button"
			/>
			<Form
				ref={formRef}
				onSubmit={handleSubmitFormUpdateProfile}
				className="form"
			>
				<ImageUploader
					onDelete={handleDeleteProfilePicture}
					initialImage={user?.profilePicture || employee?.profilePicture}
					onEdit={handleUploadProfilePicture}
				/>
				<Input label="Nome" name="name" />
				<Input label="Email" name="email" />
				<Input label="Telefone" name="phone" />
				<Input label="Cargo" name="office" />
				<Input label="Senha" name="password" type="password" />
				<p className="password-info">
					Mínimo de 8 caracteres, uma letra maiúscula, uma minúscula e um
					caractere especial.
				</p>
				<AccessLevelInput
					accessLevel={profileData.accessLevel}
					name={profileData.name}
					formRef={formRef}
				/>
				<Input type="hidden" name="accessLevel" />
				<Alert text={displayErrors} type="error" />
			</Form>
		</Container>
	)
}
