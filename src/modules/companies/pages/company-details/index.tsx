import React, { useEffect, useRef, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { useNavigate, useParams } from 'react-router-dom'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Form } from '@unform/web'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { Company } from 'interfaces/company.type'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Alert } from 'components/alert'
import { handleYupErrors } from 'utils/handleYupErrors'
import { handleCNPJChange, revertCnpj } from 'utils/handleCNPJChange'
import * as Yup from 'yup'
import { handlePhoneChange, revertPhone } from 'utils/handlePhoneChange'
import { enqueueApiError } from 'utils/enqueueApiError'
import { Autocomplete, Box, TextField } from '@mui/material'
import { Auditor } from 'interfaces/auditor.type'
import { isObjectEmpty } from 'utils/is-object-empty'
import { BackButton } from 'components/back-button'
import { AccessLevel } from '../../components/access-level'
import { Dialog } from '../../../../components/dialog'
import { Input } from '../../../../components/input'
import { BT_PRIMARY, Button } from '../../../../components/button'
import {
	Container,
	Body,
	TabCompanyDetails,
	AuditorsDialogContent,
} from './styles'
import { Header } from '../../../../components/header'

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

export const CompanyDetails: React.FC = () => {
	const navigate = useNavigate()
	const [company, setCompany] = useState({} as Company)
	const [active, setActive] = useState(TAB_COMPANY_DATA)
	const [auditorsDialogOpen, setAuditorsDialogOpen] = useState(false)
	const { companyId } = useParams()
	const formCompanyRef = useRef<FormHandles>(null)
	const formManagerRef = useRef<FormHandles>(null)
	const [displayErrors, setDisplayErrors] = useState('')
	const [availableAuditors, setAvailableAuditors] = useState<Auditor[]>([])
	const auditorsRef = useRef(null)
	const [selectedAuditors, setSelectedAuditors] = useState<Auditor[]>([])
	const [dataLoaded, setDataLoaded] = useState(false)

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const {
					data: {
						company: companyData,
						availableAuditors: availableAuditorsData,
					},
				} = await api.get(`/companies/${companyId}`)
				setDataLoaded(true)
				setCompany(companyData)
				setAvailableAuditors(availableAuditorsData)
			} catch (err: any) {
				enqueueSnackbar(err.response.data.message, { variant: 'error' })
			}
		})()
	}, [companyId])

	useEffect(() => {
		formCompanyRef.current?.setData({
			name: company.name,
			cnpj: company.cnpj,
			site: company.site,
		})
		if (company.manager && !isObjectEmpty(company.manager)) {
			formManagerRef.current?.setData({
				name: company.manager?.name,
				office: company.manager?.office,
				department: company.manager?.department,
				email: company.manager?.email,
				phone: company.manager?.phone,
			})
		}
	}, [company])

	useEffect(() => {
		if (active === TAB_COMPANY_DATA) {
			formCompanyRef.current?.setData({
				name: company.name || '',
				cnpj: company.cnpj || '',
				site: company.site || '',
			})
		}
		if (active === TAB_MANAGER_DATA) {
			formManagerRef.current?.setData({
				name: company.manager?.name || '',
				office: company.manager?.office || '',
				department: company.manager?.department || '',
				email: company.manager?.email || '',
				phone: company.manager?.phone || '',
			})
		}
	}, [
		active,
		company.cnpj,
		company.manager?.department,
		company.manager?.email,
		company.manager?.name,
		company.manager?.office,
		company.manager?.phone,
		company.name,
		company.site,
	])

	const handleBackToCompanyData = () => {
		navigate('/empresas')
	}

	const handleActiveCompanyData = () => {
		setDisplayErrors('')
		setActive(TAB_COMPANY_DATA)
	}

	const handleAcitveManagerData = () => {
		setDisplayErrors('')
		setActive(TAB_MANAGER_DATA)
	}

	const toggleAuditorsDialogOpen = () => {
		setAuditorsDialogOpen(!auditorsDialogOpen)
	}

	const handleSubmitCompanyData: SubmitHandler<
		CompanyDataForm
	> = async data => {
		setDisplayErrors('')
		const cnpj = revertCnpj(data.cnpj)
		const companyFormData = {
			name: data.name,
			cnpj,
			site: data.site,
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
			handleYupErrors(err, formCompanyRef, setDisplayErrors)
			return
		}
		try {
			api.put(`/companies/company/${company._eq}`, companyFormData)
			enqueueSnackbar('Dados da empresa atualizados com sucesso!', {
				variant: 'success',
			})
		} catch (err) {
			enqueueApiError(err)
		}
	}

	const handleSubmitManagerData: SubmitHandler<
		ManagerDataForm
	> = async data => {
		setDisplayErrors('')
		const phone = revertPhone(data.phone)
		const managerFormData = {
			name: data.name,
			email: data.email,
			department: data.department,
			office: data.office,
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
			handleYupErrors(err, formManagerRef, setDisplayErrors)
			return
		}
		try {
			api.put(`/companies/manager/${company._eq}`, managerFormData)
			enqueueSnackbar('Dados do gestor atualizados com sucesso!', {
				variant: 'success',
			})
		} catch (err) {
			enqueueApiError(err)
		}
	}

	const handleChangeAuditorsSave = async () => {
		try {
			const auditorsToSave = [...company.auditors, ...selectedAuditors]
			api.put(`/company/auditors/${companyId}`, auditorsToSave)
			enqueueSnackbar('Auditores atualizados com sucesso!', {
				variant: 'success',
			})
		} catch (err: any) {
			enqueueSnackbar(err.response.data.message, { variant: 'error' })
		}
		toggleAuditorsDialogOpen()
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body data-testid="company-details-body">
				<Button
					text="Auditores"
					buttonStyle="primary-orange"
					icon={<PeopleAltIcon />}
					className="auditors-button"
					onClick={toggleAuditorsDialogOpen}
				/>
				<TabCompanyDetails active={active}>
					<div className="tab-header">
						<BackButton
							testid="back-button"
							handleClick={handleBackToCompanyData}
						/>
						<div
							className="company-data-title"
							onClick={handleActiveCompanyData}
							role="presentation"
						>
							<p>Dados da empresa</p>
						</div>
						<div
							className="manager-data-title"
							onClick={handleAcitveManagerData}
							role="presentation"
						>
							<p>Dados do gestor</p>
						</div>
					</div>
					{active === TAB_COMPANY_DATA && (
						<li className="company-data" data-testid="tab-company-form">
							<div className="company-photo">
								<InsertPhotoOutlinedIcon />
								<p>
									Clique para <br /> adicionar uma foto
								</p>
							</div>
							{dataLoaded && (
								<Form
									className="add-company-data-form"
									onSubmit={handleSubmitCompanyData}
									ref={formCompanyRef}
								>
									<Input label="Nome da empresa" name="name" />
									<Input
										label="CNPJ"
										name="cnpj"
										onChange={e =>
											handleCNPJChange(e.target.value, formCompanyRef, 'cnpj')
										}
									/>
									<Input label="Site" name="site" />

									<Alert
										text={displayErrors}
										type="error"
										testid="display-errors"
									/>
									<Button
										text="Salvar alterações"
										buttonStyle="primary"
										type="submit"
									/>
								</Form>
							)}
						</li>
					)}
					{active === TAB_MANAGER_DATA && (
						<li className="manager-data" data-testid="tab-manager-form">
							<Form
								className="add-manager-data-form"
								onSubmit={handleSubmitManagerData}
								ref={formManagerRef}
							>
								<Input label="Nome" name="name" />
								<Input label="Cargo" name="office" />
								<Input label="Departamento" name="department" />
								<Input label="Email" name="email" />
								<Input
									label="Telefone"
									name="phone"
									onChange={e =>
										handlePhoneChange(e.target.value, formManagerRef, 'phone')
									}
								/>
								<Alert
									text={displayErrors}
									type="error"
									testid="display-errors"
								/>
								<Button
									text="Salvar alterações"
									buttonStyle="primary"
									type="submit"
								/>
							</Form>
						</li>
					)}
				</TabCompanyDetails>
				<Dialog open={auditorsDialogOpen} toggleOpen={toggleAuditorsDialogOpen}>
					<AuditorsDialogContent>
						<CloseIcon
							className="close-dialog-icon"
							onClick={toggleAuditorsDialogOpen}
							data-testid="close-button"
						/>
						<div className="dialog-header">
							<PeopleAltIcon />
							<h2>Auditores</h2>
						</div>
						<div className="dialog-body">
							<Autocomplete
								data-testid="auditors-select"
								multiple
								ref={auditorsRef}
								id="auditorsSelect"
								options={availableAuditors}
								disableCloseOnSelect
								value={selectedAuditors}
								onChange={(event: any, auditors: Auditor[]) => {
									setSelectedAuditors(auditors)
								}}
								getOptionLabel={auditor => auditor.name}
								renderOption={(props, auditor) => (
									<Box
										component="li"
										sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
										{...props}
									>
										<img
											style={{
												borderRadius: '50%',
												width: 36,
												height: 36,
												objectFit: 'cover',
											}}
											src={auditor.profilePicture}
											alt={`Foto do auditor: ${auditor.name}`}
										/>
										<p
											style={{
												fontFamily: 'Inter',
												fontWeight: 600,
												fontSize: 16,
												color: '#0F141E',
												marginLeft: 6,
											}}
										>
											{auditor.name}
										</p>
									</Box>
								)}
								renderInput={params => (
									<TextField
										{...params}
										label="Adicione auditores"
										inputProps={{
											...params.inputProps,
										}}
									/>
								)}
							/>

							<h3>Pessoas com acesso</h3>
							{company.auditors?.map(auditor => {
								return (
									<div className="auditor" key={auditor._eq}>
										<img
											src={auditor.profilePicture}
											alt="Foto de um auditor"
										/>
										<p>{auditor.name}</p>
										<AccessLevel
											level="master"
											className="auditor-access-level"
										/>
									</div>
								)
							})}
							<Button
								buttonStyle={BT_PRIMARY}
								text="Concluído"
								className="bt-auditors-finished"
								onClick={handleChangeAuditorsSave}
							/>
						</div>
					</AuditorsDialogContent>
				</Dialog>
			</Body>
		</Container>
	)
}
