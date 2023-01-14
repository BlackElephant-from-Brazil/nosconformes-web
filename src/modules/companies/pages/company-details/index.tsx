import React, { useState } from 'react'
import { Header } from '../../../../components/Header'
import { Container, Body, TabCompanyDetails, AuditorsDialogContent } from './styles'
import BusinessIcon from '@mui/icons-material/Business'
import { BT_PRIMARY, Button } from '../../../../components/Button'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { useNavigate } from 'react-router-dom'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from '../../../../components/Input'
import { Dialog } from '../../../../components/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import { AccessLevel, ACCESS_LEVEL_MASTER } from '../../components/access-level'

export const TAB_COMPANY_DATA = 0
export const TAB_MANAGER_DATA = 1

export const CompanyDetails: React.FC = () => {
	const navigate = useNavigate()
	const [active, setActive] = useState(TAB_COMPANY_DATA)
	const [auditorsDialogOpen, setAuditorsDialogOpen] = useState(false)

	const handleBackToCompanyData = () => {
		navigate('/empresas')
	}

	const handleActiveCompanyData = () => {
		setActive(TAB_COMPANY_DATA)
	}

	const handleAcitveManagerData = () => {
		setActive(TAB_MANAGER_DATA)
	}

	const handleUploadCompanyData = () => {
		console.log('atualizando')
	}

	const handleUploadManagerData = () => {
		console.log('atualizando')
	}

	const handleShowAuditorsDialog = () => {
		toggleAuditorsDialogOpen()
	}

	const toggleAuditorsDialogOpen = () => {
		setAuditorsDialogOpen(!auditorsDialogOpen)
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas"/>
			<Body>
				<Button text='Auditores' buttonStyle='primary-orange' icon={<PeopleAltIcon/>} className={'auditors-button'} onClick={handleShowAuditorsDialog} />
				<TabCompanyDetails active={active}>
					<div className="tab-header">
						<a className='back-button' onClick={handleBackToCompanyData}>
							<KeyboardArrowLeftOutlinedIcon />
						</a>
						<div className="company-data-title" onClick={handleActiveCompanyData}>
							<p>Dados da empresa</p>
						</div>
						<div className="manager-data-title" onClick={handleAcitveManagerData}>
							<p>Dados do gestor</p>
						</div>
					</div>
					<li className="company-data">
						<div className="company-photo">
							<InsertPhotoOutlinedIcon />
							<p>Clique para <br /> adicionar uma foto</p>
						</div>
						<form action="#" className="add-company-data-form">
							<Input label='Nome da empresa' name='name'/>
							<Input label='CNPJ' name='cnpj'/>
							<Input label='Site' name="site"/>
							<Button text='Salvar alterações' buttonStyle='primary' onClick={handleUploadCompanyData}/>
						</form>
					</li>
					<li className="manager-data">
						<form action="#" className="add-manager-data-form">
							<Input label='Nome' name='name'/>
							<Input label='Cargo' name='office'/>
							<Input label='Departamento' name='department'/>
							<Input label='Email' name='email'/>
							<Input label='Telefone' name='phone'/>
							<Button text='Salvar alterações' buttonStyle='primary' onClick={handleUploadManagerData}/>
						</form>
					</li>
				</TabCompanyDetails>
				<Dialog open={auditorsDialogOpen} toggleOpen={toggleAuditorsDialogOpen}>
					<AuditorsDialogContent>
						<CloseIcon className='close-dialog-icon' onClick={toggleAuditorsDialogOpen} />
						<div className="dialog-header">
							<PeopleAltIcon/>
							<h2>
								Auditores
							</h2>
						</div>
						<div className="dialog-body">
							<Input name='auditor' placeholder='Adicione auditores' className='input-auditors' />
							<h3>
								Pessoas com acesso
							</h3>
							<div className="auditor">
								<img src='https://images.squarespace-cdn.com/content/v1/60f5b1e3e382636224667fb4/1626896647720-ZK45YCRNWNCQLB7WMK8Q/Amanda+Pessoa+oraculos+e+professora+de+portugues' alt="Foto de um auditor" />
								<p>Douglas Maia</p>
								<AccessLevel level={ACCESS_LEVEL_MASTER} className='auditor-access-level' />
							</div>
							<Button buttonStyle={BT_PRIMARY} text='Concluído' className='bt-auditors-finished' />
						</div>
					</AuditorsDialogContent>
				</Dialog>
			</Body>
		</Container>
	)
}