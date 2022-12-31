import React, { useState } from 'react'
import { Header } from '../../../components/Header'
import BusinessIcon from '@mui/icons-material/Business'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { Container, Body, CreateYourFirstCompanyScreen, AddCompanyData, AddManagerData } from './styles'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { useNavigate } from 'react-router-dom'

const TAB_ADD_FIRST_COMPANY = 0
const TAB_ADD_COMPANY_DATA = 1
const TAB_ADD_MANAGER_DATA = 2


const AddFirstCompany: React.FC = () => {
	const [activeTab, setActiveTab] = useState(TAB_ADD_FIRST_COMPANY)
	const navigate = useNavigate()

	const handleAddFirstCompanyButtonClicked = () => {
		setActiveTab(TAB_ADD_COMPANY_DATA)
	}

	const handleSubmitFirstCompanyData = () => {
		setActiveTab(TAB_ADD_MANAGER_DATA)
	}

	const handleBackToCompanyData = () => {
		setActiveTab(TAB_ADD_COMPANY_DATA)
	}

	const handleJumpSendManagerData = () => {
		navigate('/empresas')
	}

	const handleSubmitManagerData = () => {
		navigate('/empresas')
	}

	return (
		<Container>
			<Header icon={<BusinessIcon fontSize='large'/>} title="Empresas"/>
			<Body>

				<CreateYourFirstCompanyScreen active={activeTab === TAB_ADD_FIRST_COMPANY}>
					<h1>
							Cadastre novas empresas 🏭
					</h1>
					<div className="form-steps">
						<p><span>1</span>Adicione os dados da empresa</p>
						<p><span>2</span>Adicione os dados do gestor</p>
					</div>
					<Button buttonStyle='primary' text='Cadastrar primeira empresa ->' className='bt-add-first-company' onClick={handleAddFirstCompanyButtonClicked} />
				</CreateYourFirstCompanyScreen>

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
						<Button text='Próximo' buttonStyle='primary' onClick={handleSubmitFirstCompanyData}/>
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
			</Body>
		</Container>
	)
}

export { AddFirstCompany }