import { Body } from 'components/body'
import { Header } from 'components/header'
import React from 'react'
import ArticleIcon from '@mui/icons-material/Article'
import { Question } from 'interfaces/question.type'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Input } from 'components/input'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Button } from 'components/button'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { useNavigate, useParams } from 'react-router-dom'
import { Table } from 'components/table'
import { Checkbox } from 'components/checkbox/input'
import AddIcon from '@mui/icons-material/Add'
import { Container } from './styles'
import { AddEmployeeToQuestionDialog } from './components/add-employee-to-question'

const tableTitles = ['Pergunta', 'Usuários']

export const QuestionsFromGrouping: React.FC = () => {
	const [questions, setQuestions] = React.useState<Question[]>([])
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [selectedQuestions, setSelectedQuestions] = React.useState<string[]>([])
	const [pages, setPages] = React.useState(0)
	const [currentPage, setCurrentPage] = React.useState(1)
	const { questionaryId, groupingId } = useParams()
	const [isDialogOpen, setIsDialogOpen] = React.useState(false)
	const [selectedQuestionsIds, setSelectedQuestionsIds] = React.useState<
		string[]
	>([])
	const navigate = useNavigate()

	React.useEffect(() => {
		;(async () => {
			try {
				const { data: foundQuestions } = await api.get(
					`/questions/${groupingId}/grouping`,
				)
				setQuestions(foundQuestions)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [groupingId])

	const toggleDialogOpen = () => {
		setIsDialogOpen(!isDialogOpen)
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchUser')
		try {
			const { data: foundQuestions } = await api.get(
				`/questions/${groupingId}/grouping?query=${searchInputValue}`,
			)
			setQuestions(foundQuestions)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleAddUsersClick = () => {
		setSelectedQuestionsIds(selectedQuestions)
		toggleDialogOpen()
	}

	const handleRespondQuestionsClick = () => {
		navigate(
			`/questionarios-da-empresa/${questionaryId}/perguntas-do-agrupamento/${groupingId}/responder-perguntas`,
		)
	}

	const toggleSelectedQuestion = (questionId: string) => {
		if (selectedQuestions.includes(questionId)) {
			setSelectedQuestions(
				selectedQuestions.filter(question => question !== questionId),
			)
		} else {
			setSelectedQuestions([...selectedQuestions, questionId])
		}
	}

	const handleCheckChange = (questionId: string) => {
		toggleSelectedQuestion(questionId)
	}

	const handleAddUserButtonClick = (questionIds: string[]) => {
		setSelectedQuestionsIds(questionIds)
		toggleDialogOpen()
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = questions.map(question => {
			return (
				<tr
					key={question._eq}
					className={`question-table-row
					${selectedQuestions.includes(question._eq) ? 'active' : 'unactive'}`}
				>
					<td>
						<Checkbox
							onChange={() => handleCheckChange(question._eq)}
							checked={selectedQuestions.includes(question._eq)}
						/>
					</td>
					<td>
						<p className="table-text">{question.question}</p>
					</td>

					<td className="users-cell">
						{question.employees?.map(employee => (
							<div className="employee-in-table">
								<img
									src={employee.profilePicture}
									alt={`Foto de perfil de ${employee.name}`}
								/>
								<p>{employee.name}</p>
							</div>
						))}
						<div
							className="add-employee"
							onClick={() => handleAddUserButtonClick([question._eq])}
							role="presentation"
						>
							<span>Adicionar usuários</span>
							<AddIcon />
						</div>
					</td>
				</tr>
			)
		})
		return renderedTableRow
	}

	const toggleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const allQuestionsIds = questions.map(question => question._eq)
			setSelectedQuestions(allQuestionsIds)
			return
		}
		setSelectedQuestions([])
	}

	const handleSelectPage = async (page: number) => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestion')

		try {
			const { data: findQuestions } = await api.get(
				`/questions/${groupingId}/grouping?query=${searchInputValue}&page=${page}`,
			)
			setQuestions(findQuestions.findQuestions)
			setPages(findQuestions.pageCount)
			setCurrentPage(page)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleReloadTable = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchUser')
		try {
			const { data: foundQuestions } = await api.get(
				`/questions/${groupingId}/grouping?query=${searchInputValue}`,
			)
			setQuestions(foundQuestions)
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container>
			<Header title="Questionários" icon={<ArticleIcon />} />
			<Body>
				<div className="top-components">
					<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
						<Input
							name="searchUser"
							placeholder="Pesquise pelo nome da pergunta"
							endAdornmentIcon={<SearchRoundedIcon />}
							className="search-input"
							onChange={handleSearchInputChange}
						/>
					</Form>
					<div className="button-group">
						{selectedQuestions.length > 0 && (
							<Button
								endIcon={<AddIcon />}
								text="Adicionar usuários"
								variant="secondary"
								onClick={handleAddUsersClick}
							/>
						)}

						<Button
							text="Responder perguntas"
							endIcon={<PostAddIcon />}
							variant="primary"
							onClick={handleRespondQuestionsClick}
						/>
					</div>
				</div>
				<Table
					headerTitles={tableTitles}
					tableRows={renderTableBodyInfo()}
					className="table-questions"
					selectAllRows={toggleSelectAllRows}
					isSelectable
					pages={pages}
					currentPage={currentPage}
					selectPage={handleSelectPage}
				/>
				<AddEmployeeToQuestionDialog
					isOpen={isDialogOpen}
					questionIds={selectedQuestionsIds}
					toggleOpen={toggleDialogOpen}
					reloadTable={handleReloadTable}
				/>
			</Body>
		</Container>
	)
}
