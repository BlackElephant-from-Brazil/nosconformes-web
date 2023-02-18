import { Form } from '@unform/web'
import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { handleApiError } from 'utils/handle-api-error'
import { Input } from 'components/input'
import { Button } from 'components/button'
import { api } from 'api'
import { Table } from 'components/table'
import { Question } from 'interfaces/question.type'
import { RightDrawer } from 'components/right-drawer'
import CloseIcon from '@mui/icons-material/Close'
import { AddNewQuestionContainer, Container } from './styles'
import { FormQuestion } from './components/form-question'

const tableTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

export const Questions: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questions, setQuestions] = useState<Question[]>([])
	const [editableQuestion, setEditableQuestion] = useState<Question>(
		{} as Question,
	)

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const { data } = await api.get('/questions')
				setQuestions(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleOpenEditQuestion = (questionId: string) => {
		console.log(questionId)
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = questions.map(question => {
			return (
				<tr
					key={question._eq}
					onClick={() => handleOpenEditQuestion(question._eq)}
					className="user-table-row"
				>
					<td>
						<p>{question.id}</p>
					</td>
					<td>
						<p>{question.question}</p>
					</td>
					<td>
						<p>{question.funcs}</p>
					</td>
					<td>
						<p>{question.tags[0].text}</p>
					</td>
					<td>
						<p>{question.references[0].text}</p>
					</td>
				</tr>
			)
		})
		return renderedTableRow
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestion')

		try {
			const { data: findUsers } = await api.get(
				`/questions?query=${searchInputValue}`,
			)
			setQuestions(findUsers)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewUserButtonClick = () => {
		setEditableQuestion({} as Question)
		toggleDrawer()
	}

	const handleImportExcelButtonClick = () => {
		console.log('Importar excel')
	}

	return (
		<Container>
			<div className="users-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchQuestion"
						placeholder="Pesquise por nome, email ou cargo"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					buttonStyle="excel"
					text="Importar excel"
					className="excel-button"
					onClick={handleImportExcelButtonClick}
				/>
				<Button
					buttonStyle="primary"
					text="Cadastrar pergunta +"
					className="new-question-button"
					onClick={handleCreateNewUserButtonClick}
				/>
			</div>
			<Table
				headerTitles={tableTitles}
				tableRows={renderTableBodyInfo()}
				className="table-questions"
			/>
			<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
				<AddNewQuestionContainer>
					<CloseIcon className="close-drawer-icon" onClick={toggleDrawer} />
					<FormQuestion />
				</AddNewQuestionContainer>
			</RightDrawer>
		</Container>
	)
}
