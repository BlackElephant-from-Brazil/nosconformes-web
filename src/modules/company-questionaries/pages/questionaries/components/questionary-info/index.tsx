import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AddIcon from '@mui/icons-material/Add'
import { Button } from 'components/button'
import { Questionary } from 'interfaces/questionary.type'
import { Company } from 'interfaces/company.type'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'
import { Container, EmployeesMenu } from './styles'

type QuestionaryInfoProps = {
	questionary: Questionary
	company?: Company
	onAddEmployeesToAquestionaryButtonClick: (questionaryId: string) => void
}

export const QuestionaryInfo: React.FC<QuestionaryInfoProps> = ({
	questionary,
	company,
	onAddEmployeesToAquestionaryButtonClick,
}) => {
	const [isEmployeesMenuOpen, setIsEmployeesMenuOpen] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const navigate = useNavigate()

	const toggleEmployeesMenu = () => {
		setIsEmployeesMenuOpen(!isEmployeesMenuOpen)
	}

	const handleOpenQuestionary = (questionaryId: string) => {
		navigate(`/questionarios-da-empresa/${questionaryId}`)
	}

	const handleOpenEmployeeMenuClick = (
		event: React.MouseEvent<HTMLElement>,
	) => {
		setAnchorEl(event.currentTarget)
		toggleEmployeesMenu()
	}

	return (
		<Container>
			<h2>Questionário</h2>
			<h3
				onClick={() => handleOpenQuestionary(questionary._eq)}
				role="presentation"
			>
				{questionary.name}
			</h3>
			<div
				className="employees"
				onClick={handleOpenEmployeeMenuClick}
				role="presentation"
			>
				<span>Usuários:</span>
				<div className="employees-avatar">
					{questionary.employees?.map((e, i) => {
						if (i === 2) return null
						return (
							<img src={e.profilePicture} alt={`Foto de perfil de ${e.name}`} />
						)
					})}
				</div>
				<KeyboardArrowDownIcon />
				{questionary.employees && (
					<EmployeesMenu
						anchorEl={anchorEl}
						open={isEmployeesMenuOpen}
						onClose={toggleEmployeesMenu}
						className="employees-menu"
					>
						{questionary.employees.map(employee => {
							return (
								<MenuItem key={employee.name} className="employees-menu-item">
									<img
										src={employee.profilePicture}
										alt={`Foto de perfil de ${employee.name}`}
									/>
									<span>{employee.name}</span>
								</MenuItem>
							)
						})}
					</EmployeesMenu>
				)}
			</div>
			<Button
				text="Adicionar usuários"
				variant="secondary"
				className="bt-add-users-to-questionary"
				endIcon={<AddIcon />}
				onClick={() => onAddEmployeesToAquestionaryButtonClick(questionary._eq)}
			/>
			<span className="company-title">Empresa</span>
			<div className="company-details">
				<img src={company?.logo} alt={`Logo da ${company?.name}`} />
				<p>{company?.name}</p>
			</div>
		</Container>
	)
}
