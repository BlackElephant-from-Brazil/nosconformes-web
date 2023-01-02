import React, { useState } from 'react'
import { AddCompanyData, AddManagerData, Container } from './styles'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'

const TAB_ADD_COMPANY_DATA = 0
const TAB_ADD_MANAGER_DATA = 1

export const AddCompanyTabs: React.FC = () => {
	const [activeTab, setActiveTab] = useState(TAB_ADD_COMPANY_DATA)

	const handleSubmitCompanyData = () => {
		setActiveTab(TAB_ADD_MANAGER_DATA)
	}

	const handleBackToCompanyData = () => {
		setActiveTab(TAB_ADD_COMPANY_DATA)
	}

	const handleJumpSendManagerData = () => {
		console.log('olá mundo')
	}

	const handleSubmitManagerData = () => {
		console.log('olá mundo')
	}

	return (
		<Container>

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
				<form action="#" className="add-company-data-form">
					<Input label='Nome da empresa' name='name'/>
					<Input label='CNPJ' name='cnpj'/>
					<Input label='Site' name="site"/>
					<Button text='Próximo' buttonStyle='primary' onClick={handleSubmitCompanyData}/>
				</form>
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
				<form action="#" className="add-manager-data-form">
					<Input label='Nome' name='name'/>
					<Input label='Cargo' name='office'/>
					<Input label='Departamento' name='department'/>
					<Input label='Email' name='email'/>
					<Input label='Telefone' name='phone'/>
					<div className="form-manager-button-container">
						<Button text="Pular etapa" buttonStyle='secondary' onClick={handleJumpSendManagerData} className="jump-buttom"/>
						<Button text='Cadastrar empresa' buttonStyle='primary' onClick={handleSubmitManagerData}/>
					</div>
				</form>
			</AddManagerData>
		</Container>

	)
}