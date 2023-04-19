import { Body } from 'components/body'
import { Container } from 'components/container'
import { Header } from 'components/header'
import SettingsIcon from '@mui/icons-material/Settings'
import React from 'react'
import { useAuth } from 'hooks/authentication.hook'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Company } from 'interfaces/company.type'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import { FormHandles } from '@unform/core'
import { Button } from 'components/button'
import { FormContactUsContainer } from './styles'

export const CompanyContactUs: React.FC = () => {
	const [isPageLoading, setIsPageLoading] = React.useState(true)
	const [company, setCompany] = React.useState<Company>()
	const formRef = React.useRef<FormHandles>(null)
	const { employee } = useAuth()

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/companies/${employee?.companyId}`)
				setCompany(data)
				setIsPageLoading(false)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [employee?.companyId])

	const handleSubmitFormContact = async (data: any) => {
		console.log(data)
	}

	return (
		<Container>
			<Header icon={<SettingsIcon />} title="Contate-nos" />
			<Body isLoading={isPageLoading}>
				<FormContactUsContainer>
					<div className="company-info">
						<img src={company?.logo} alt={`Logo da empresa ${company?.name}`} />
						<h2>{company?.name}</h2>
					</div>
					<span>Preencha os campos abaixo:</span>
					<Form onSubmit={handleSubmitFormContact} ref={formRef}>
						<Input name="name" label="Nome" />
						<Input name="email" label="Email" />
						<Input name="phone" label="Telefone" />
						<Input
							name="company"
							label="Empresa"
							disabled
							initialValue={company?.name || ''}
						/>
						<Input
							name="message"
							placeholder="Sua mensagem de solicitação"
							multiline
							rows={4}
						/>
						<Button variant="primary" text="Enviar" type="submit" />
					</Form>
				</FormContactUsContainer>
			</Body>
		</Container>
	)
}
