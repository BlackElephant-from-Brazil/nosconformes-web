import React, { useEffect } from 'react'
import { Dialog } from 'components/dialog'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { Autocomplete } from 'components/autocomplete'
import { Box } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { Button } from 'components/button'
import { Employee } from 'interfaces/employee.type'
import { handleUserImageError } from 'utils/handle-image-error'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { enqueueSnackbar } from 'notistack'
import { DialogContainer, EmployeeChip } from './styles'

type AddEmployeeToQuestionaryDialogProps = {
	isOpen: boolean
	toggleOpen: () => void
	questionIds: string[]
	reloadTable: () => void
}

export const AddEmployeeToQuestionDialog: React.FC<
	AddEmployeeToQuestionaryDialogProps
> = ({ isOpen, toggleOpen, questionIds, reloadTable }) => {
	const [employeesWithAccess, setEmployeesWithAccess] = React.useState<
		Employee[]
	>([])
	const [availableEmployees, setAvailableEmployees] = React.useState<
		Employee[]
	>([])
	const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>(
		[],
	)

	useEffect(() => {
		if (!isOpen) return
		;(async () => {
			try {
				const { data } = await api.get(
					'/employees/available-to-questions/company',
					{
						params: {
							questionIds,
						},
					},
				)
				setAvailableEmployees(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [isOpen, questionIds])

	useEffect(() => {
		if (!isOpen) return
		;(async () => {
			try {
				const { data } = await api.get(
					'/employees/current-in-questions/company',
					{
						params: {
							questionIds,
						},
					},
				)
				setEmployeesWithAccess(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [isOpen, questionIds])

	if (!isOpen) return null

	const toggleDialogOpen = () => {
		setSelectedEmployees([])
		toggleOpen()
	}

	const handleRemoveEmployee = async (employeeId: string) => {
		try {
			await api.delete(`/questions/employees/${employeeId}`, {
				params: {
					questionIds,
				},
			})
			enqueueSnackbar('Usuário removido com sucesso!', {
				variant: 'success',
			})
			setEmployeesWithAccess(
				employeesWithAccess.filter(employee => employee._eq !== employeeId),
			)
			setAvailableEmployees([
				...availableEmployees,
				employeesWithAccess.find(
					employee => employee._eq === employeeId,
				) as Employee,
			])
			reloadTable()
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleSaveEmployeesToQuestionaryButtonClick = async () => {
		try {
			await api.post('/questions/employees', {
				employees: selectedEmployees,
				questionIds,
			})
			enqueueSnackbar(
				'Os usuário que tem permissão para responder estas perguntas foram atualizados!',
				{
					variant: 'success',
				},
			)
			reloadTable()
		} catch (error) {
			handleApiError(error)
		}
		toggleDialogOpen()
	}

	return (
		<Dialog open={isOpen} toggleOpen={toggleDialogOpen}>
			<DialogContainer>
				<CloseIcon
					className="close-dialog-icon"
					onClick={toggleOpen}
					data-testid="close-button"
				/>
				<div className="dialog-header">
					<AddIcon />
					<h2>Adicionar usuários às perguntas</h2>
				</div>
				<div className="dialog-body">
					<Autocomplete
						testid="employees-select"
						options={availableEmployees}
						selectedValues={selectedEmployees}
						handleChange={(_, employees) => {
							setSelectedEmployees(employees as Employee[])
						}}
						optionLabel={employee => employee.name}
						renderOption={(props, employee) => {
							const employeePhotoRef = React.createRef<HTMLImageElement>()
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
										src={employee.profilePicture}
										alt={`Foto do funcionário: ${employee.name}`}
										ref={employeePhotoRef}
										onError={() => handleUserImageError(employeePhotoRef)}
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
										{employee.name}
									</p>
								</Box>
							)
						}}
						renderTags={(value: any, getTagProps: any) =>
							value.map((option: any, index: any) => (
								<EmployeeChip>
									<img
										src={option.profilePicture}
										alt={`Foto do funcionário: ${option.name}`}
									/>
									<p>{option.name}</p>
									<div
										className="remove-button"
										onClick={() => {
											const employeesToSave = selectedEmployees.filter(
												employee => employee._eq !== option._eq,
											)
											setSelectedEmployees(employeesToSave)
										}}
										role="presentation"
									>
										<ClearIcon />
									</div>
								</EmployeeChip>
							))
						}
						label="Adicione para eles responderem questionário"
					/>

					<h3>Usuários com acesso</h3>
					{employeesWithAccess?.map(employee => {
						const employeeImageRef = React.createRef<HTMLImageElement>()
						return (
							<div className="employee" key={employee._eq}>
								<img
									src={employee.profilePicture}
									alt={`Foto de perfil do usuário ${employee.name}`}
									ref={employeeImageRef}
									onError={() => handleUserImageError(employeeImageRef)}
								/>
								<p className="employee-name">{employee.name}</p>
								<div
									className="remove"
									onClick={() => handleRemoveEmployee(employee._eq)}
									role="presentation"
								>
									<CloseIcon />
								</div>
							</div>
						)
					})}
					<Button
						variant="primary"
						text="Concluído"
						className="bt-employees-finished"
						onClick={handleSaveEmployeesToQuestionaryButtonClick}
					/>
				</div>
			</DialogContainer>
		</Dialog>
	)
}
