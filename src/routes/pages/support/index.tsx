import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Body } from 'components/body'
import { Button } from 'components/button'
import { Header } from 'components/header'
import { Input } from 'components/input'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { errorMessages } from 'defaults/error-messages'
import { handleYupErrors } from 'utils/handle-yup-errors'
import { handleApiError } from 'utils/handle-api-error'
import { useNavigate } from 'react-router-dom'
import { api } from 'api'
import { Alert } from 'components/alert'
import { handlePhoneChange, revertPhone } from 'utils/handlePhoneChange'
import { enqueueSnackbar } from 'notistack'
import { Container } from './styles'

export const Support = () => {
	const formRef = useRef<FormHandles>(null)
	const [displayError, setDisplayError] = useState<string>('')
	const navigate = useNavigate()

	const handleSubmitSupportMessage = async (data: any) => {
		setDisplayError('')
		const phone = revertPhone(data.phone)
		const contactData = {
			name: data.name.trim(),
			email: data.email.trim(),
			phone,
			company: data.company.trim(),
			message: data.message.trim(),
		}
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.name.unfilled),
				email: Yup.string()
					.email(errorMessages.email.invalid)
					.required(errorMessages.email.unfilled),
				phone: Yup.string()
					.required(errorMessages.phone.unfilled)
					.min(10, errorMessages.phone.lessThan10Chars),
				company: Yup.string().required(errorMessages.company.unfilled),
				message: Yup.string().required(errorMessages.message.unfilled),
			})

			await schema.validate(contactData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayError)
			return
		}

		try {
			await api.post('/support', contactData)
			navigate('/empresas')
			enqueueSnackbar('Mensagem enviada ao suporte!', {
				variant: 'success',
			})
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container>
			<Header title="Contato com o suporte" icon={<SupportAgentIcon />} />
			<Body>
				<div className="form">
					<h2>Preencha os campos abaixo:</h2>
					<Form onSubmit={handleSubmitSupportMessage} ref={formRef}>
						<Input name="name" label="Nome" />
						<Input name="email" label="Email" />
						<Input
							label="Telefone"
							name="phone"
							onChange={e =>
								handlePhoneChange(e.target.value, formRef, 'phone')
							}
						/>
						<Input name="company" label="Empresa" />
						<Input
							name="message"
							placeholder="Sua mensagem"
							rows={4}
							multiline
						/>
						<Alert text={displayError} type="error" />
						<Button text="Enviar mensagem" variant="primary" type="submit" />
					</Form>
				</div>
			</Body>
		</Container>
	)
}
