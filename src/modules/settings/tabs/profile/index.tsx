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
import { handleApiError } from 'utils/enqueueApiError'
import { revertPhone } from 'utils/handlePhoneChange'
import { handleYupErrors } from 'utils/handleYupErrors'
import * as Yup from 'yup'
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
	const [userData, setUserData] = useState({} as User)
	const [displayErrors, setDisplayErrors] = useState('')
	const { user } = useAuth()

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const { data } = await api.get(`/users/${user._eq}`)
				setUserData({ ...data, password: '**********' })
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [user._eq])

	useEffect(() => {
		formRef.current?.setData({ ...userData, accessLevel: userData.name })
	}, [userData])

	const handleSubmitFormUpdateProfile: SubmitHandler<
		UpdateProfileForm
	> = async data => {
		setDisplayErrors('')
		let profileData
		const phone = revertPhone(data.phone)

		if (data.password === '**********') {
			delete data.password
			profileData = {
				name: data.name,
				email: data.email,
				phone,
				office: data.office,
				accessLevel: data.accessLevel,
			}
		} else {
			profileData = {
				name: data.name,
				email: data.email,
				phone,
				office: data.office,
				password: data.password,
				accessLevel: data.accessLevel,
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

			await schema.validate(profileData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayErrors)
			return
		}

		try {
			await api.put(`/users/${user._eq}`, {
				...profileData,
			})
			enqueueSnackbar('Dados atualizados com sucesso!', { variant: 'success' })
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleClickSubmitFormButton = () => {
		formRef.current?.submitForm()
	}

	return (
		<Container>
			<Button
				text="Salvar"
				buttonStyle="primary"
				onClick={handleClickSubmitFormButton}
				className="save-button"
			/>
			<Form
				ref={formRef}
				onSubmit={handleSubmitFormUpdateProfile}
				className="form"
			>
				<ImageUploader />
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
					accessLevel={userData.accessLevel}
					name={userData.name}
					formRef={formRef}
				/>
				<Input type="hidden" name="accessLevel" />
				<Alert text={displayErrors} type="error" />
			</Form>
		</Container>
	)
}
