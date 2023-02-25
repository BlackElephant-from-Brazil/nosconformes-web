import { Dialog } from 'components/dialog'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Autocomplete } from 'components/autocomplete'
import { handleUserImageError } from 'utils/handle-image-error'
import { Auditor } from 'interfaces/auditor.type'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Box } from '@mui/material'
import { AccessLevel } from 'modules/companies/components/access-level'
import { Button } from 'components/button'
import { enqueueSnackbar } from 'notistack'
import { AuditorsDialogContent } from './styles'

type AuditorsDialogProps = {
	questionaryId: string
	open: boolean
	toggleOpen: () => void
	currentAuditors: Auditor[]
}

export const AuditorsDialog: React.FC<AuditorsDialogProps> = ({
	questionaryId,
	open,
	toggleOpen,
	currentAuditors,
}) => {
	const [availableAuditors, setAvailableAuditors] = React.useState<Auditor[]>(
		[],
	)
	const [selectedAuditors, setSelectedAuditors] = useState<Auditor[]>([])
	const [questionaryCurrentAuditors, setQuestionaryCurrentAuditors] = useState<
		Auditor[]
	>([])

	useEffect(() => {
		setQuestionaryCurrentAuditors(currentAuditors)
	}, [currentAuditors])

	useEffect(() => {
		;(async () => {
			try {
				const { data: findAvailableAuditors } = await api.get(
					`/questionaries/available-auditors/${questionaryId}`,
				)
				setAvailableAuditors(findAvailableAuditors)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [questionaryId])

	const handleRemoveAuditor = async (auditorId: string) => {
		try {
			const auditorsToSave = currentAuditors.filter(
				auditor => auditor._eq !== auditorId,
			)
			const { data } = await api.put(
				`/questionaries/auditors/${questionaryId}`,
				{
					auditors: [...auditorsToSave],
				},
			)
			enqueueSnackbar('Auditor removido com sucesso!', {
				variant: 'success',
			})
			setQuestionaryCurrentAuditors(auditorsToSave)
			setAvailableAuditors(data)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleAuditorsSave = async () => {
		try {
			const auditorsToSave = [
				...questionaryCurrentAuditors,
				...selectedAuditors,
			]
			const { data } = await api.put(
				`/questionaries/auditors/${questionaryId}`,
				{
					auditors: [...auditorsToSave],
				},
			)
			enqueueSnackbar('Auditores atualizados com sucesso!', {
				variant: 'success',
			})
			setQuestionaryCurrentAuditors(auditorsToSave)
			setSelectedAuditors([])
			setAvailableAuditors(data)
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
					<PeopleAltIcon />
					<h2>Auditores</h2>
				</div>
				<div className="dialog-body">
					<Autocomplete
						testid="auditors-select"
						options={availableAuditors}
						selectedValues={selectedAuditors}
						handleChange={(_, auditors) => {
							setSelectedAuditors(auditors as Auditor[])
						}}
						optionLabel={auditor => auditor.name}
						renderOption={(props, auditor) => {
							const auditorImageRef = React.createRef<HTMLImageElement>()
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
										src={auditor.profilePicture}
										alt={`Foto do auditor: ${auditor.name}`}
										ref={auditorImageRef}
										onError={() => handleUserImageError(auditorImageRef)}
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
							)
						}}
						label="Adicione auditores"
					/>

					<h3>Pessoas com acesso</h3>
					{questionaryCurrentAuditors?.map(auditor => {
						const auditorImageRef = React.createRef<HTMLImageElement>()
						return (
							<div className="auditor" key={auditor._eq}>
								<img
									src={auditor.profilePicture}
									alt="Foto de um auditor"
									ref={auditorImageRef}
									onError={() => handleUserImageError(auditorImageRef)}
								/>
								<p className="auditor-name">{auditor.name}</p>
								<AccessLevel level="master" className="auditor-access-level" />
								<div
									className="remove"
									onClick={() => handleRemoveAuditor(auditor._eq)}
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
						onClick={handleAuditorsSave}
					/>
				</div>
			</AuditorsDialogContent>
		</Dialog>
	)
}
