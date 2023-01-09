import React, { useRef, useState } from 'react'
import { AddCompanyData, AddManagerData, Container } from './styles'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { Form } from '@unform/web'
import { FormHandles, Scope, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'

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

}

export const AddCompanyTabs: React.FC = () => {
	const [activeTab, setActiveTab] = useState(TAB_ADD_COMPANY_DATA)
	const formRef = useRef<FormHandles>(null)

	const handleGoToManagerTab = () => {
		setActiveTab(TAB_ADD_MANAGER_DATA)
	}

	const handleBackToCompanyData = () => {
		setActiveTab(TAB_ADD_COMPANY_DATA)
	}

	const handleNewCompanyFormSubmit: SubmitHandler<NewCompanyForm> = async (data) => {
		try {
			const schema = Yup.object().shape({
				company: Yup.object({
					name: Yup.string().required(),
					cnpj: Yup.string().required().length(18),
					site: Yup.string().required().url()
				}),
				// manager: Yup.object({

				// }),
			})

			await schema.validate(data, {
				abortEarly: false
			})
		} catch (errors) {
			let allErrors = ''
			if (errors instanceof Yup.ValidationError) {

				const validationErrors: {[key: string]: string} = {}
				errors.inner.forEach(error => {
					if(error.path)
						validationErrors[error.path] = error.message
					allErrors += error.message
				})
				formRef.current?.setErrors(validationErrors)
				console.log(allErrors)
				return
			} else {
				console.log(errors)
				return
			}
		}
	}

	const handleSubmitData = () => {
		formRef.current?.submitForm()
	}

	const handleJumpManagarData = () => {
		return
	}

	return (
		<Container>
			<Form onSubmit={handleNewCompanyFormSubmit} ref={formRef}>

				<AddCompanyData active={activeTab === TAB_ADD_COMPANY_DATA}>
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
						<Input label='CNPJ' name='cnpj'/>
						<Input label='Site' name="site"/>
						<Button text='Próximo' buttonStyle='primary' onClick={handleGoToManagerTab}/>
					</Scope>

				</AddCompanyData>

				<AddManagerData active={activeTab === TAB_ADD_MANAGER_DATA}>
					<h1>
						Cadastre novas empresas 🏭
					</h1>
					<div className="form-steps">
						<p><span>1</span>Dados da empresa</p>
						<p><span className='active'>2</span>Dados do gestor</p>
					</div>
					<div className="form-title">
						<a className='back-button' onClick={handleBackToCompanyData}>
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
						<Input label='Telefone' name='phone'/>
						<div className="form-manager-button-container">
							<Button text="Pular etapa" buttonStyle='secondary' onClick={() => console.log('olá')} className="jump-buttom"/>
							<Button text='Cadastrar empresa' buttonStyle='primary' onClick={handleSubmitData}/>
						</div>
					</Scope>
				</AddManagerData>
			</Form>

		</Container>

	)
}