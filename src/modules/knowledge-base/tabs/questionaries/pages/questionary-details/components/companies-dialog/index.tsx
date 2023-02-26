import { Dialog } from 'components/dialog'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import LockIcon from '@mui/icons-material/Lock'
import { Autocomplete } from 'components/autocomplete'
import { handleCompanyImageError } from 'utils/handle-image-error'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Box } from '@mui/material'
import { Button } from 'components/button'
import { enqueueSnackbar } from 'notistack'
import { Company } from 'interfaces/company.type'
import { AuditorsDialogContent } from './styles'

type CompaniesDialogProps = {
	questionaryId: string
	open: boolean
	toggleOpen: () => void
	currentCompanies: Company[]
}

export const CompaniesDialog: React.FC<CompaniesDialogProps> = ({
	questionaryId,
	open,
	toggleOpen,
	currentCompanies,
}) => {
	const [availableCompanies, setAvailableCompanies] = React.useState<Company[]>(
		[],
	)
	const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([])
	const [questionaryCurrentCompanies, setQuestionaryCurrentCompanies] =
		useState<Company[]>([])

	useEffect(() => {
		setQuestionaryCurrentCompanies(currentCompanies)
	}, [currentCompanies])

	useEffect(() => {
		;(async () => {
			try {
				const { data: findAvailableCompanies } = await api.get(
					`/questionaries/available-companies/${questionaryId}`,
				)
				setAvailableCompanies(findAvailableCompanies)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [questionaryId])

	const handleRemoveCompany = async (companyId: string) => {
		try {
			const companiesToSave = currentCompanies.filter(
				company => company._eq !== companyId,
			)
			const { data } = await api.put(
				`/questionaries/companies/${questionaryId}`,
				{
					companies: [...companiesToSave],
				},
			)
			enqueueSnackbar('Empresa removida com sucesso!', {
				variant: 'success',
			})
			setQuestionaryCurrentCompanies(companiesToSave)
			setAvailableCompanies(data)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCompaniesSave = async () => {
		try {
			const companiesToSave = [
				...questionaryCurrentCompanies,
				...selectedCompanies,
			]
			const { data } = await api.put(
				`/questionaries/companies/${questionaryId}`,
				{
					companies: [...companiesToSave],
				},
			)
			enqueueSnackbar('Empresas atualizadas com sucesso!', {
				variant: 'success',
			})
			setQuestionaryCurrentCompanies(companiesToSave)
			setSelectedCompanies([])
			setAvailableCompanies(data)
		} catch (err: any) {
			handleApiError(err)
		}
		toggleOpen()
	}

	return (
		<Dialog open={open} toggleOpen={toggleOpen}>
			<AuditorsDialogContent>
				<CloseIcon
					className="close-dialog-icon"
					onClick={toggleOpen}
					data-testid="close-button"
				/>
				<div className="dialog-header">
					<LockIcon />
					<h2>Compartilhar</h2>
				</div>
				<div className="dialog-body">
					<Autocomplete
						testid="auditors-select"
						options={availableCompanies}
						selectedValues={selectedCompanies}
						handleChange={(_, companies) => {
							setSelectedCompanies(companies as Company[])
						}}
						optionLabel={company => company.name}
						renderOption={(props, company) => {
							const companyImageRef = React.createRef<HTMLImageElement>()
							return (
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
										src={company.logo}
										alt={`Foto da empresa: ${company.name}`}
										ref={companyImageRef}
										onError={() => handleCompanyImageError(companyImageRef)}
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
										{company.name}
									</p>
								</Box>
							)
						}}
						label="Adicione empresas"
					/>

					<h3>Empresas com acesso</h3>
					{questionaryCurrentCompanies?.map(company => {
						const companyImageRef = React.createRef<HTMLImageElement>()
						return (
							<div className="auditor" key={company._eq}>
								<img
									src={company.logo}
									alt="Foto de um auditor"
									ref={companyImageRef}
									onError={() => handleCompanyImageError(companyImageRef)}
								/>
								<p className="auditor-name">{company.name}</p>
								<div
									className="remove"
									onClick={() => handleRemoveCompany(company._eq)}
									role="presentation"
								>
									<p>Remover</p>
									<CloseIcon />
								</div>
							</div>
						)
					})}
					<Button
						variant="primary"
						text="Concluído"
						className="bt-auditors-finished"
						onClick={handleCompaniesSave}
					/>
				</div>
			</AuditorsDialogContent>
		</Dialog>
	)
}
