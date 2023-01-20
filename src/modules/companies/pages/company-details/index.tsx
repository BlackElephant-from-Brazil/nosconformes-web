import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../../../components/Header'
import { Container, Body, TabCompanyDetails, AuditorsDialogContent } from './styles'
import BusinessIcon from '@mui/icons-material/Business'
import { BT_PRIMARY, Button } from '../../../../components/Button'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Input } from '../../../../components/Input'
import { Dialog } from '../../../../components/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import { AccessLevel, ACCESS_LEVEL_MASTER } from '../../components/access-level'
import { Form } from '@unform/web'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { Company } from 'interfaces/company.type'
import { FormHandles, SubmitHandler } from '@unform/core'

export const TAB_COMPANY_DATA = 0
export const TAB_MANAGER_DATA = 1

type CompanyDataForm = {
	name: string
	cnpj: string
	site: string
}

type ManagerDataForm = {
	name: string
	office: string
	department: string
	email: string
	phone: string
}


export const CompanyDetails: React.FC = () => {
	const navigate = useNavigate()
	const [company, setCompany] = useState({} as Company)
	const [active, setActive] = useState(TAB_COMPANY_DATA)
	const [auditorsDialogOpen, setAuditorsDialogOpen] = useState(false)
	const { companyId } = useParams()
	const formCompanyRef = useRef<FormHandles>(null)
	const formManagerRef = useRef<FormHandles>(null)

	useEffect(() => {
		(async () => {
			try {
				const { data: companyData } = await api.get(`/companies/${companyId}`)
				formCompanyRef.current?.setData({ name: companyData.name, cnpj: companyData.cnpj, site: companyData.site })
				setCompany(companyData)
			} catch (err: any) {
				enqueueSnackbar(err.response.data.message, { variant: 'error' })
			}
		})()
	}, [])

	useEffect(() => {
		if (active === TAB_COMPANY_DATA) {
			formCompanyRef.current?.setData({
				name: company.name || '',
				cnpj: company.cnpj || '',
				site: company.site || ''
			})
		}
		if (active === TAB_MANAGER_DATA) {
			formManagerRef.current?.setData({
				name: company.manager?.name || '',
				office: company.manager?.office || '',
				department: company.manager?.department || '',
				email: company.manager?.email || '',
				phone: company.manager?.phone || ''
			})
		}
	}, [active])


	const handleBackToCompanyData = () => {
		navigate('/empresas')
	}

	const handleActiveCompanyData = () => {
		setActive(TAB_COMPANY_DATA)
	}

	const handleAcitveManagerData = () => {
		setActive(TAB_MANAGER_DATA)
	}

	const toggleAuditorsDialogOpen = () => {
		setAuditorsDialogOpen(!auditorsDialogOpen)
	}

	const handleSubmitCompanyData: SubmitHandler<CompanyDataForm> = (data) => {
		console.log(data)
		return
	}

	const handleSubmitManagerData: SubmitHandler<ManagerDataForm> = (data) => {
		console.log(data)
		return
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body data-testid="company-details-body">
				<Button text='Auditores' buttonStyle='primary-orange' icon={<PeopleAltIcon />} className={'auditors-button'} onClick={toggleAuditorsDialogOpen} />
				<TabCompanyDetails active={active}>
					<div className="tab-header">
						<a className='back-button' onClick={handleBackToCompanyData} data-testid="back-button">
							<KeyboardArrowLeftOutlinedIcon />
						</a>
						<div className="company-data-title" onClick={handleActiveCompanyData}>
							<p>Dados da empresa</p>
						</div>
						<div className="manager-data-title" onClick={handleAcitveManagerData}>
							<p>Dados do gestor</p>
						</div>
					</div>
					{
						active === TAB_COMPANY_DATA &&
						<li className="company-data" data-testid="tab-company-form">
							<div className="company-photo">
								<InsertPhotoOutlinedIcon />
								<p>Clique para <br /> adicionar uma foto</p>
							</div>
							<Form className='add-company-data-form' onSubmit={handleSubmitCompanyData} ref={formCompanyRef}>
								<Input label='Nome da empresa' name='name' />
								<Input label='CNPJ' name='cnpj' />
								<Input label='Site' name="site" />
								<Button text='Salvar alterações' buttonStyle='primary' type="submit" />
							</Form>
						</li>
					}
					{
						active === TAB_MANAGER_DATA &&
						<li className="manager-data" data-testid="tab-manager-form">
							<Form className='add-manager-data-form' onSubmit={handleSubmitManagerData} ref={formManagerRef}>
								<Input label='Nome' name='name' />
								<Input label='Cargo' name='office' />
								<Input label='Departamento' name='department' />
								<Input label='Email' name='email' />
								<Input label='Telefone' name='phone' />
								<Button text='Salvar alterações' buttonStyle='primary' type="submit" />
							</Form>
						</li>
					}
				</TabCompanyDetails>
				<Dialog open={auditorsDialogOpen} toggleOpen={toggleAuditorsDialogOpen}>
					<AuditorsDialogContent>
						<CloseIcon className='close-dialog-icon' onClick={toggleAuditorsDialogOpen} />
						<div className="dialog-header">
							<PeopleAltIcon />
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