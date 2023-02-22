import React, { useEffect, useRef, useState } from 'react'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from 'components/input'
import { Button } from 'components/button'
import { Form } from '@unform/web'
import { FormHandles, Scope, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import { Alert } from 'components/alert'
import { useNavigate } from 'react-router-dom'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { handleYupErrors } from 'utils/handle-yup-errors'
import { handlePhoneChange, revertPhone } from 'utils/handlePhoneChange'
import { handleCNPJChange, revertCnpj } from 'utils/handleCNPJChange'
import { BackButton } from 'components/back-button'
import { AddCompanyData, AddManagerData, Container } from './styles'

const TAB_ADD_COMPANY_DATA = 0
const TAB_ADD_MANAGER_DATA = 1

type Company = {
	name: string
	cnpj: string
	site: string
	logo?: string
}

type Manager = {
	name: string
	office: string
	department: string
	email: string
	phone: string
}

type NewCompanyForm = {
	company: Company
	manager: Manager
}

const errorMessages = {
	company: {
		name: {
			unfilled: 'Preencha o nome da empresa. ',
		},
		cnpj: {
			unfilled: 'Coloque o CNPJ da empresa. ',
			lessThan14Chars: 'Escreva o CNPJ completo. ',
		},
		site: {
			unfilled: 'Insira o site da empresa. ',
			invalid:
				'O site precisa ser um endereço web real. Exemplo: https://sitedaempresa.com.br/. ',
		},
	},
	manager: {
		name: {
			unfilled: 'Preencha o nome do gestor. ',
		},
		office: {
			unfilled: 'Coloque o cargo do gestor. ',
		},
		department: {
			unfilled: 'Insira o departamento de atuação do gestor na empresa. ',
		},
		email: {
			unfilled: 'Insira o email do gestor. ',
			invalid: 'O email precisa ser um email válido. ',
		},
		phone: {
			unfilled: 'Por favor, preencha o telefone deste gestor. ',
			lessThan10Chars: 'Preencha o telefone completo. ',
		},
	},
}

type AddCompanyTabsProps = {
	finishRegisteringCallback?: () => void
}

const initialFormDataValue: NewCompanyForm = {
	company: {
		cnpj: '',
		name: '',
		site: '',
	},
	manager: {
		department: '',
		email: '',
		name: '',
		office: '',
		phone: '',
	},
}

export const AddCompanyTabs: React.FC<AddCompanyTabsProps> = ({
	finishRegisteringCallback,
}) => {
	const [activeTab, setActiveTab] = useState(TAB_ADD_COMPANY_DATA)
	const formRef = useRef<FormHandles>(null)
	const [displayCompanyErrors, setDisplayCompanyErrors] = useState('')
	const navigate = useNavigate()
	const [formData, setFormData] = useState<NewCompanyForm>(initialFormDataValue)

	useEffect(() => {
		if (activeTab === TAB_ADD_COMPANY_DATA) {
			formRef.current?.setFieldValue('company.name', formData.company.name)
			formRef.current?.setFieldValue('company.cnpj', formData.company.cnpj)
			formRef.current?.setFieldValue('company.site', formData.company.site)
		}
		if (activeTab === TAB_ADD_MANAGER_DATA) {
			formRef.current?.setFieldValue('manager.name', formData.manager.name)
			formRef.current?.setFieldValue('manager.office', formData.manager.office)
			formRef.current?.setFieldValue(
				'manager.department',
				formData.manager.department,
			)
			formRef.current?.setFieldValue('manager.email', formData.manager.email)
			formRef.current?.setFieldValue('manager.phone', formData.manager.phone)
		}
	}, [activeTab, formData])

	const handleBackToCompanyData = () => {
		setDisplayCompanyErrors('')
		setActiveTab(TAB_ADD_COMPANY_DATA)
		const formManagerData: Manager = {
			name: formRef.current?.getFieldValue('manager.name'),
			email: formRef.current?.getFieldValue('manager.email'),
			phone: formRef.current?.getFieldValue('manager.phone'),
			department: formRef.current?.getFieldValue('manager.department'),
			office: formRef.current?.getFieldValue('manager.office'),
		}

		setFormData(prev => ({
			company: prev.company,
			manager: formManagerData,
		}))
	}

	const handleButtonNextClick = async () => {
		setDisplayCompanyErrors('')
		const cnpj = revertCnpj(formRef.current?.getFieldValue('company.cnpj'))
		const companyFormData: Company = {
			name: formRef.current?.getFieldValue('company.name'),
			cnpj,
			site: formRef.current?.getFieldValue('company.site'),
		}
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.company.name.unfilled),
				cnpj: Yup.string()
					.required(errorMessages.company.cnpj.unfilled)
					.length(14, errorMessages.company.cnpj.lessThan14Chars),
				site: Yup.string()
					.required(errorMessages.company.site.unfilled)
					.url(errorMessages.company.site.invalid),
			})

			await schema.validate(companyFormData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayCompanyErrors, 'company.')
			return
		}
		setFormData(prev => ({
			manager: prev.manager,
			company: companyFormData,
		}))
		setActiveTab(TAB_ADD_MANAGER_DATA)
	}

	const handleSubmitFormWithManagerData: SubmitHandler<
		NewCompanyForm
	> = async data => {
		setDisplayCompanyErrors('')
		const phone = revertPhone(data.manager.phone)
		const managerFormData: Manager = {
			name: data.manager.name,
			email: data.manager.email,
			department: data.manager.department,
			office: data.manager.office,
			phone,
		}
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.manager.name.unfilled),
				email: Yup.string()
					.required(errorMessages.manager.email.unfilled)
					.email(errorMessages.manager.email.invalid),
				department: Yup.string().required(
					errorMessages.manager.department.unfilled,
				),
				office: Yup.string().required(errorMessages.manager.office.unfilled),
				phone: Yup.string()
					.required(errorMessages.manager.phone.unfilled)
					.min(10, errorMessages.manager.phone.lessThan10Chars),
			})

			await schema.validate(managerFormData, {
				abortEarly: false,
			})
		} catch (err) {
			handleYupErrors(err, formRef, setDisplayCompanyErrors, 'manager.')
			return
		}
		try {
			formData.company.logo =
				'https://media.licdn.com/dms/image/C4D0BAQGAYL99EehE8w/company-logo_200_200/0/1673981963317?e=1682553600&v=beta&t=I1GVv1NaM_LXAbaglNo29n5_WasBsQIPaMfTEXCfgZA'
			await api.post('/companies', {
				company: formData.company,
				manager: managerFormData,
			})
			enqueueSnackbar('Empresa cadastrada com sucesso!', { variant: 'success' })
			finishRegisteringCallback?.()
			navigate('/empresas')
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleSubmitWithoutManagerData = async () => {
		try {
			formData.company.logo =
				'https://media.licdn.com/dms/image/C4D0BAQGAYL99EehE8w/company-logo_200_200/0/1673981963317?e=1682553600&v=beta&t=I1GVv1NaM_LXAbaglNo29n5_WasBsQIPaMfTEXCfgZA'
			await api.post('/companies', {
				company: formData.company,
			})
		} catch (err: any) {
			handleApiError(err)
			return
		}
		enqueueSnackbar('Empresa cadastrada com sucesso!', { variant: 'success' })
		finishRegisteringCallback?.()
		navigate('/empresas')
	}

	const renderTab = () => {
		if (activeTab === TAB_ADD_COMPANY_DATA) {
			return (
				<AddCompanyData data-testid="add-company-data-tab">
					<h1>Cadastre novas empresas 🏭</h1>
					<div className="form-steps">
						<p>
							<span className="active">1</span>Dados da empresa
						</p>
						<p>
							<span>2</span>Dados do gestor
						</p>
					</div>
					<h2>Adicione os dados da empresa:</h2>
					<div className="company-photo">
						<InsertPhotoOutlinedIcon />
						<p>
							Clique para <br /> adicionar uma foto
						</p>
					</div>
					<Scope path="company">
						<Input label="Nome da empresa" name="name" />
						<Input
							label="CNPJ"
							name="cnpj"
							onChange={e =>
								handleCNPJChange(e.target.value, formRef, 'company.cnpj')
							}
						/>
						<Input label="Site" name="site" />
						<Alert
							text={displayCompanyErrors}
							type="error"
							testid="company-errors"
						/>
						<Button
							text="Próximo"
							variant="primary"
							onClick={handleButtonNextClick}
						/>
					</Scope>
				</AddCompanyData>
			)
		}
		if (activeTab === TAB_ADD_MANAGER_DATA) {
			return (
				<AddManagerData data-testid="add-manager-data-tab">
					<h1>Cadastre novas empresas 🏭</h1>
					<div className="form-steps">
						<p>
							<span>1</span>Dados da empresa
						</p>
						<p>
							<span className="active">2</span>Dados do gestor
						</p>
					</div>
					<div className="form-title">
						<BackButton
							handleClick={handleBackToCompanyData}
							testid="back-button"
						/>
						<h2>Adicione os dados do gestor:</h2>
					</div>
					<Scope path="manager">
						<Input label="Nome" name="name" />
						<Input label="Cargo" name="office" />
						<Input label="Departamento" name="department" />
						<Input label="Email" name="email" />
						<Input
							label="Telefone"
							name="phone"
							onChange={e =>
								handlePhoneChange(e.target.value, formRef, 'manager.phone')
							}
						/>
						<Alert
							text={displayCompanyErrors}
							type="error"
							testid="company-errors"
						/>
						<div className="form-manager-button-container">
							<Button
								text="Pular etapa"
								variant="secondary"
								onClick={handleSubmitWithoutManagerData}
								className="jump-buttom"
							/>
							<Button
								text="Cadastrar empresa"
								variant="primary"
								type="submit"
							/>
						</div>
					</Scope>
				</AddManagerData>
			)
		}
	}

	return (
		<Container>
			<Form onSubmit={handleSubmitFormWithManagerData} ref={formRef}>
				{renderTab()}
			</Form>
		</Container>
	)
}
