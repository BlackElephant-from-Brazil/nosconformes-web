import React, { useEffect, useRef, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import { useNavigate, useParams } from 'react-router-dom'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Form } from '@unform/web'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { Company } from 'interfaces/company.type'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Alert } from 'components/alert'
import { handleCNPJChange, revertCnpj } from 'utils/handleCNPJChange'
import * as Yup from 'yup'
import { handlePhoneChange, revertPhone } from 'utils/handlePhoneChange'
import { handleApiError } from 'utils/handle-api-error'
import { isObjectEmpty } from 'utils/is-object-empty'
import { BackButton } from 'components/back-button'
import { handleYupErrors } from 'utils/handle-yup-errors'
import { Body } from 'components/body'
import { Input } from '../../../../components/input'
import { Button } from '../../../../components/button'
import { Container, TabCompanyDetails } from './styles'
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
	const { companyId } = useParams()
	const formCompanyRef = useRef<FormHandles>(null)
	const formManagerRef = useRef<FormHandles>(null)
	const [displayErrors, setDisplayErrors] = useState('')
	const [dataLoaded, setDataLoaded] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get(`/companies/${companyId}`)
				setDataLoaded(true)
				setCompany(data)
				setIsLoading(false)
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
		navigate(-2)
	}

	const handleActiveCompanyData = () => {
		setDisplayErrors('')
		setActive(TAB_COMPANY_DATA)
	}

	const handleAcitveManagerData = () => {
		setDisplayErrors('')
		setActive(TAB_MANAGER_DATA)
	}

	const handleSubmitCompanyData: SubmitHandler<
		CompanyDataForm
	> = async data => {
		setDisplayErrors('')
		const cnpj = revertCnpj(data.cnpj)
		const companyFormData = {
			name: data.name.trim(),
			cnpj,
			site: data.site.trim(),
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
			await api.put(`/companies/company/${company._eq}`, {
				company: { ...companyFormData },
			})
			setCompany({ ...company, ...companyFormData })
			enqueueSnackbar('Dados da empresa atualizados com sucesso!', {
				variant: 'success',
			})
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleSubmitManagerData: SubmitHandler<
		ManagerDataForm
	> = async data => {
		setDisplayErrors('')
		const phone = revertPhone(data.phone)
		const managerFormData = {
			name: data.name.trim(),
			email: data.email.trim(),
			department: data.department.trim(),
			office: data.office.trim(),
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
			await api.put(`/companies/manager/${company._eq}`, {
				manager: { ...managerFormData },
			})
			enqueueSnackbar('Dados do gestor atualizados com sucesso!', {
				variant: 'success',
			})
			setCompany({ ...company, manager: { ...managerFormData } })
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body data-testid="company-details-body" isLoading={isLoading}>
				<TabCompanyDetails active={active}>
					<div className="tab-header">
						<BackButton
							testid="back-button"
							handleClick={handleBackToCompanyData}
						/>
						<div className="tab-titles">
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
										variant="primary"
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
									variant="primary"
									type="submit"
								/>
							</Form>
						</li>
					)}
				</TabCompanyDetails>
			</Body>
		</Container>
	)
}
