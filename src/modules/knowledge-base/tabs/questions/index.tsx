import { Form } from '@unform/web'
import React, { useEffect, useRef, useState } from 'react'
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
import { Chip } from 'components/chip'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { Menu, MenuItem } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Checkbox } from 'components/checkbox/input'
import { ContextMenu } from 'components/context-menu'
import { Dialog } from 'components/dialog'
import { AddNewQuestionContainer, Container, DialogBody } from './styles'
import { FormQuestion } from './components/form-question'

const tableTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

export const Questions: React.FC = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questions, setQuestions] = useState<Question[]>([])
	const [editableQuestion, setEditableQuestion] = useState<
		Question | undefined
	>({} as Question)
	const [mousePosition, setMousePosition] = useState({ x: null, y: null })
	const inputFileRef = useRef<HTMLInputElement>(null)
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [dialogOpen, setDialogOpen] = useState(false)

	const handleContextMenu = (event: any) => {
		event.preventDefault()
		setAnchorEl(event.currentTarget)
		setMousePosition({ x: event.clientX, y: event.clientY })
	}

	const handleClose = () => {
		setMousePosition({ x: null, y: null })
		setAnchorEl(null)
	}

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
		setEditableQuestion(questions.find(question => question._eq === questionId))
		toggleDrawer()
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
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						<p className="table-text">{question.id}</p>
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						<p className="table-text">{question.question}</p>
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						{question.funcs.map(func => (
							<Chip
								className={func}
								info={capitalizeFirstLetter(func)}
								key={func}
							/>
						))}
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						<Chip info="Uma tag bem complexa" />
						<Chip info="Uma tag bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.tags[0].text}</p> */}
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						<Chip info="Uma referência bem complexa" />
						<Chip info="Uma referência bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.references[0]?.text}</p> */}
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
			const { data: findQuestions } = await api.get(
				`/questions?query=${searchInputValue}`,
			)
			setQuestions(findQuestions)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewQuestionButtonClick = () => {
		setEditableQuestion({} as Question)
		toggleDrawer()
	}

	const handleImportExcelButtonClick = () => {
		inputFileRef.current?.click()
	}

	const handleFileExcelSelected = async (event: any) => {
		const file = event.target.files[0]
		try {
			await api.post('/questions/import', file)
		} catch (err) {
			handleApiError(err)
			return
		}
		enqueueSnackbar('Perguntas importadas com sucesso!', { variant: 'success' })
	}

	const toggleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const allQuestionsIds = questions.map(question => question._eq)
			setSelectedQuestions(allQuestionsIds)
			return
		}
		setSelectedQuestions([])
	}

	const toggleDialog = () => {
		setDialogOpen(!dialogOpen)
	}

	const reloadTable = async () => {
		try {
			const { data } = await api.get('/questions')
			setQuestions(data)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleDeleteQuesitons = async () => {
		try {
			await api.delete('/questions', {
				data: { questions: selectedQuestions },
			})
		} catch (err) {
			handleApiError(err)
			return
		}
		reloadTable()
		setDialogOpen(false)
		setAnchorEl(null)
		enqueueSnackbar('Perguntas deletadas com sucesso!', { variant: 'success' })
		setSelectedQuestions([])
	}

	return (
		<Container onContextMenu={handleContextMenu}>
			<div className="questions-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchQuestion"
						placeholder="Pesquise por pergunta, função, tag, agrupamento ou referência"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					variant="excel"
					text="Importar excel"
					className="excel-button"
					onClick={handleImportExcelButtonClick}
				/>
				<input
					type="file"
					ref={inputFileRef}
					style={{ display: 'none' }}
					onChange={handleFileExcelSelected}
					accept=".xlsx"
				/>
				<Button
					variant="primary"
					text="Cadastrar pergunta +"
					className="new-question-button"
					onClick={handleCreateNewQuestionButtonClick}
				/>
			</div>
			<Table
				headerTitles={tableTitles}
				tableRows={renderTableBodyInfo()}
				className="table-questions"
				selectAllRows={toggleSelectAllRows}
				isSelectable
			/>
			<RightDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
				<AddNewQuestionContainer>
					<CloseIcon className="close-drawer-icon" onClick={toggleDrawer} />
					<FormQuestion
						reloadTable={reloadTable}
						toggleDrawer={toggleDrawer}
						question={editableQuestion}
					/>
				</AddNewQuestionContainer>
			</RightDrawer>
			<ContextMenu
				anchorEl={anchorEl}
				handleClose={handleClose}
				mousePosition={mousePosition}
			>
				<MenuItem onClick={handleClose}>Mover para o agrupamento</MenuItem>
				<MenuItem onClick={toggleDialog} className="danger">
					Remover pergunta
				</MenuItem>
			</ContextMenu>
			<Dialog
				open={dialogOpen}
				toggleOpen={toggleDialog}
				variant="bottom_right"
			>
				<DialogBody>
					<CloseIcon
						className="close-dialog-icon"
						onClick={toggleDialog}
						data-testid="close-button"
					/>
					<div className="dialog-confirmation-text">
						<h2>Tem certeza que deseja excluir as perguntas selecionadas?</h2>
					</div>
					<Button
						text="Excluir"
						onClick={handleDeleteQuesitons}
						variant="danger"
					/>
				</DialogBody>
			</Dialog>
		</Container>
	)
}
