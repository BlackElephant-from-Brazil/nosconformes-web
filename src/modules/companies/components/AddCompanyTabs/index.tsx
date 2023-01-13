import React, { ChangeEventHandler, useRef, useState } from 'react'
import { AddCompanyData, AddManagerData, Container } from './styles'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { Form } from '@unform/web'
import { FormHandles, Scope, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'
import { Alert } from '../../../../components/Alert'
import { useNavigate } from 'react-router-dom'

const TAB_ADD_COMPANY_DATA = 0
const TAB_ADD_MANAGER_DATA = 1

type Company = {
	name: string
	cnpj: string
	site: string
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
			unfilled: 'Preencha o nome da empresa. '
		},
		cnpj: {
			unfilled: 'Coloque o CNPJ da empresa. ',
			lessThan14Chars: 'Escreva o CNPJ completo. '
		},
		site: {
			unfilled: 'Insira o site da empresa. ',
			invalid: 'O site precisa ser um endereço web real. Exemplo: https://sitedaempresa.com.br/. '
		}
	},
	manager: {
		name: {
			unfilled: 'Preencha o nome do gestor. '
		},
		office: {
			unfilled:  'Coloque o cargo do gestor. '
		},
		department: {
			unfilled: 'Insira o departamento de atuação do gestor na empresa. '
		},
		email: {
			unfilled: 'Insira o email do gestor. ',
			invalid: 'O email precisa ser um email válido. '
		},
		phone: {
			unfilled: 'Por favor, preencha o telefone deste gestor. ',
			lessThan10Chars: 'Preencha o telefone completo. '
		}
	}
}

export const AddCompanyTabs: React.FC = () => {
	const [activeTab, setActiveTab] = useState(TAB_ADD_COMPANY_DATA)
	const formRef = useRef<FormHandles>(null)
	const [displayCompanyErrors, setDisplayCompanyErrors] = useState('')
	const navigate = useNavigate()

	const handleBackToCompanyData = () => {
		setActiveTab(TAB_ADD_COMPANY_DATA)
	}

	const handleButtonNextClick = async () => {
		setDisplayCompanyErrors('')
		const cnpj = formRef.current?.getFieldValue('company.cnpj').replace(/\D/g,'')
		const companyFormData: Company = {
			name: formRef.current?.getFieldValue('company.name'),
			cnpj,
			site: formRef.current?.getFieldValue('company.site')
		}
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.company.name.unfilled),
				cnpj: Yup.string().required(errorMessages.company.cnpj.unfilled).length(14, errorMessages.company.cnpj.lessThan14Chars),
				site: Yup.string().required(errorMessages.company.site.unfilled).url(errorMessages.company.site.invalid)
			})

			await schema.validate(companyFormData, {
				abortEarly: false
			})
		} catch (err) {
			let allErrors = ''
			if (err instanceof Yup.ValidationError) {
				const validationErrors: {[key: string]: string} = {}
				err.inner.forEach(error => {
					if(error.path)
						validationErrors[`company.${error.path}`] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				setDisplayCompanyErrors(allErrors)
				return
			} else {
				console.log(err)
				return
			}
		}
		setActiveTab(TAB_ADD_MANAGER_DATA)
	}

	const handleSubmitFormWithManagerData: SubmitHandler<NewCompanyForm> = async (data) => {
		setDisplayCompanyErrors('')
		const managerFormData: Manager = {
			name: data.manager.name,
			email: data.manager.email,
			department: data.manager.department,
			office: data.manager.office,
			phone: data.manager.phone
		}
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required(errorMessages.manager.name.unfilled),
				email: Yup.string().required(errorMessages.manager.email.unfilled).email(errorMessages.manager.email.invalid),
				department: Yup.string().required(errorMessages.manager.department.unfilled),
				office: Yup.string().required(errorMessages.manager.office.unfilled),
				phone: Yup.string().required(errorMessages.manager.phone.unfilled).min(10, errorMessages.manager.phone.lessThan10Chars)
			})

			await schema.validate(managerFormData, {
				abortEarly: false
			})
		} catch (err) {
			let allErrors = ''
			if (err instanceof Yup.ValidationError) {
				const validationErrors: {[key: string]: string} = {}
				err.inner.forEach(error => {
					if(error.path)
						validationErrors[`manager.${error.path}`] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				setDisplayCompanyErrors(allErrors)
				return
			} else {
				console.log(err)
				return
			}
		}
		navigate('/empresas')
		// TODO: SEND DATA TO DB VIA AXIOS API
	}

	const handleSaveWithoutManagerData = () => {
		// TODO: SEND DATA TO DATABASE
		navigate('/empresas')
	}

	const handleCNPJChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target: { value } }) => {
		if(!value)
			return

		const cnpjValueWithouNANChars = value.replace(/[^\d]/g, '')
		let formattedCNPJValue = cnpjValueWithouNANChars
		if(cnpjValueWithouNANChars.length >= 15)
			formattedCNPJValue = cnpjValueWithouNANChars.substring(0, cnpjValueWithouNANChars.length - 1)

		formRef.current?.setFieldValue('company.cnpj', formattedCNPJValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
		)
	}

	const handlePhoneChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target: { value } }) => {
		if(!value)
			return

		const phoneValueWithoutNANChars = value.replace(/[^\d]/g, '')
		let formattedPhoneValue = phoneValueWithoutNANChars
		if(phoneValueWithoutNANChars.length >= 12)
			formattedPhoneValue = phoneValueWithoutNANChars.substring(0, phoneValueWithoutNANChars.length - 1)

		formRef.current?.setFieldValue('manager.phone', formattedPhoneValue)

		if(phoneValueWithoutNANChars.length === 10)
			formRef.current?.setFieldValue('manager.phone', formattedPhoneValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'))

		if(phoneValueWithoutNANChars.length === 11)
			formRef.current?.setFieldValue('manager.phone', formattedPhoneValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'))


	}

	const renderTab = () => {
		if (activeTab === TAB_ADD_COMPANY_DATA) {
			return (
				<AddCompanyData data-testid="add-company-data-tab">
					<h1>
						Cadastre novas empresas 🏭
					</h1>
					<div className="form-steps">
						<p><span className='active'>1</span>Dados da empresa</p>
						<p><span>2</span>Dados do gestor</p>
					</div>
					<h2>
							Adicione os dados da empresa:
					</h2>
					<div className="company-photo">
						<InsertPhotoOutlinedIcon />
						<p>Clique para <br /> adicionar uma foto</p>
					</div>
					<Scope path='company'>
						<Input label='Nome da empresa' name='name'/>
						<Input label='CNPJ' name='cnpj' onChange={handleCNPJChange}/>
						<Input label='Site' name="site"/>
						<Alert
							text={displayCompanyErrors}
							type='error'
							testid="company-errors"
						/>
						<Button text='Próximo' buttonStyle='primary' onClick={handleButtonNextClick}/>
					</Scope>
				</AddCompanyData>
			)
		} else if (activeTab === TAB_ADD_MANAGER_DATA) {
			return (
				<AddManagerData data-testid="add-manager-data-tab">
					<h1>
							Cadastre novas empresas 🏭
					</h1>
					<div className="form-steps">
						<p><span>1</span>Dados da empresa</p>
						<p><span className='active'>2</span>Dados do gestor</p>
					</div>
					<div className="form-title">
						<a className='back-button' onClick={handleBackToCompanyData} data-testid="back-button">
							<KeyboardArrowLeftOutlinedIcon />
						</a>
						<h2>
								Adicione os dados do gestor:
						</h2>
					</div>
					<Scope path='manager'>
						<Input label='Nome' name='name'/>
						<Input label='Cargo' name='office'/>
						<Input label='Departamento' name='department'/>
						<Input label='Email' name='email'/>
						<Input label='Telefone' name='phone' onChange={handlePhoneChange}/>
						<Alert
							text={displayCompanyErrors}
							type='error'
							testid="company-errors"
						/>
						<div className="form-manager-button-container">
							<Button text="Pular etapa" buttonStyle='secondary' onClick={handleSaveWithoutManagerData} className="jump-buttom"/>
							<Button text='Cadastrar empresa' buttonStyle='primary' type='submit'/>
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