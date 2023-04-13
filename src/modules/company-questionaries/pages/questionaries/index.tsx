import { Body } from 'components/body'
import { Header } from 'components/header'
import React, { useEffect } from 'react'
import ArticleIcon from '@mui/icons-material/Article'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { Questionary } from 'interfaces/questionary.type'
import { useAuth } from 'hooks/authentication.hook'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Company } from 'interfaces/company.type'
import { Container } from './styles'
import { AddEmployeeToQuestionaryDialog } from './components/add-employee-to-questionary-dialog'
import { QuestionaryInfo } from './components/questionary-info'

export const Questionaries: React.FC = () => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = React.useState<Questionary[]>([])
	const [company, setCompany] = React.useState<Company>()
	const [isPageLoading, setIsPageLoading] = React.useState(true)
	const [
		isAddUsersToQuestionaryDialogOpen,
		setIsAddUsersToQuestionaryDialogOpen,
	] = React.useState(false)
	const [selectedQuestionaryId, setSelectedQuestionaryID] = React.useState('')
	const { employee } = useAuth()

	useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(
					`/questionaries/${employee.companyId}/company`,
				)
				setQuestionaries(data)
				setIsPageLoading(false)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee])

	useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(`/companies/${employee.companyId}`)
				setCompany(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee])

	const handleSearchInputChange = async () => {
		if (!employee) return
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchUser')
		try {
			const { data: findQuestionaries } = await api.get(
				`/questionaries/${employee.companyId}/company?query=${searchInputValue}`,
			)
			setQuestionaries(findQuestionaries)
		} catch (err) {
			handleApiError(err)
		}
	}

	const toggleIsAddUsersToQuestionaryDialogOpen = () => {
		setIsAddUsersToQuestionaryDialogOpen(!isAddUsersToQuestionaryDialogOpen)
	}

	const handleAddEmployeesToQuestionary = (questionaryId: string) => {
		toggleIsAddUsersToQuestionaryDialogOpen()
		setSelectedQuestionaryID(questionaryId)
	}

	return (
		<Container>
			<Header title="Questionarios" icon={<ArticleIcon />} />
			<Body cardContext isLoading={isPageLoading}>
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchUser"
						placeholder="Pesquise pelo nome do questionário"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				{questionaries.map(questionary => (
					<QuestionaryInfo
						questionary={questionary}
						company={company}
						onAddEmployeesToAquestionaryButtonClick={
							handleAddEmployeesToQuestionary
						}
					/>
				))}
				<AddEmployeeToQuestionaryDialog
					isOpen={isAddUsersToQuestionaryDialogOpen}
					toggleOpen={toggleIsAddUsersToQuestionaryDialogOpen}
					questionaryId={selectedQuestionaryId}
				/>
			</Body>
		</Container>
	)
}
