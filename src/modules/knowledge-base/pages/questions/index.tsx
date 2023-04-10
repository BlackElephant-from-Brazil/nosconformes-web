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
import { Grouping } from 'interfaces/grouping.type'
import { Body } from 'components/body'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { HeaderWithTabs } from 'components/header-with-tabs'
import { NotFound } from 'components/not-found'
import AddIcon from '@mui/icons-material/Add'
import { FormQuestion } from './components/form-question'
import { AddNewQuestionContainer, Container, DialogBody } from './styles'

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
	const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<HTMLElement | null>(
		null,
	)
	const [allGroupings, setAllGroupings] = useState<Grouping[]>([])
	const [pages, setPages] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [isPageLoading, setIsPageLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const { data: groupings } = await api.get('/groupings')
				setAllGroupings(groupings)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/questions')
				setQuestions(data.findQuestions)
				setPages(data.pageCount)
				setIsPageLoading(false)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
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

	const handleContextMenu = (event: any) => {
		event.preventDefault()
		setAnchorEl(event.currentTarget)
		setMousePosition({ x: event.clientX, y: event.clientY })
	}

	const handleClose = () => {
		setMousePosition({ x: null, y: null })
		setAnchorEl(null)
	}

	const handleOpenEditQuestion = (questionId: string) => {
		setEditableQuestion(questions.find(question => question._eq === questionId))
		toggleDrawer()
	}

	const handleCheckChange = (questionId: string) => {
		toggleSelectedQuestion(questionId)
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestion')

		try {
			const { data: findQuestions } = await api.get(
				`/questions?query=${searchInputValue}`,
			)
			setQuestions(findQuestions.findQuestions)
			setPages(findQuestions.pageCount)
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

	const handleDeleteButtonClick = () => {
		if (selectedQuestions.length === 0) {
			enqueueSnackbar('Selecione pelo menos uma pergunta para deletar.', {
				variant: 'warning',
			})

			setAnchorEl(null)
			return
		}
		toggleDialog()
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

	const handleSubMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setSubMenuAnchorEl(event.currentTarget)
	}

	const handleSubMenuClose = () => {
		setSubMenuAnchorEl(null)
	}

	const handleAddQuestionsToGrouping = async (groupingId: string) => {
		if (selectedQuestions.length === 0) {
			enqueueSnackbar('Selecione pelo menos uma pergunta para adicionar.', {
				variant: 'warning',
			})

			setAnchorEl(null)
			setSubMenuAnchorEl(null)
			return
		}

		try {
			await api.put(`/groupings/add-questions/${groupingId}`, {
				questionsIds: selectedQuestions,
			})
		} catch (err) {
			handleApiError(err)
			return
		}
		enqueueSnackbar('Perguntas adicionadas ao agrupamento com sucesso!', {
			variant: 'success',
		})
		setAnchorEl(null)
		setSubMenuAnchorEl(null)
		setSelectedQuestions([])
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
						<Chip
							className={question.func}
							info={capitalizeFirstLetter(question.func)}
							key={question.func}
						/>
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						{question.tags.map(tag => (
							<Chip info={tag.label} />
						))}
					</td>
					<td
						onClick={() => handleOpenEditQuestion(question._eq)}
						role="presentation"
					>
						{question.references.map(ref => (
							<Chip info={ref.label} />
						))}
					</td>
				</tr>
			)
		})
		return renderedTableRow
	}

	const reloadTable = async () => {
		try {
			const { data } = await api.get('/questions')
			setQuestions(data.findQuestions)
			setPages(data.pageCount)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleSelectPage = async (page: number) => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestion')

		try {
			const { data: findQuestions } = await api.get(
				`/questions?query=${searchInputValue}&page=${page}`,
			)
			setQuestions(findQuestions.findQuestions)
			setPages(findQuestions.pageCount)
			setCurrentPage(page)
		} catch (err) {
			handleApiError(err)
		}
	}

	return (
		<Container onContextMenu={handleContextMenu}>
			<HeaderWithTabs
				icon={<CommentBankIcon />}
				title="Base de conhecimento"
				tabs={[
					{
						title: 'Perguntas',
						link: '/perguntas',
					},
					{
						title: 'Questionários',
						link: '/questionarios',
					},
				]}
				active="/perguntas"
			/>
			<Body isLoading={isPageLoading}>
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
						text="Cadastrar pergunta"
						className="new-question-button"
						endIcon={<AddIcon />}
						onClick={handleCreateNewQuestionButtonClick}
					/>
				</div>
				{questions.length === 0 ? (
					<NotFound />
				) : (
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
				)}
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
					<MenuItem
						onMouseEnter={(e: any) => handleSubMenuOpen(e)}
						onMouseLeave={handleSubMenuClose}
					>
						Mover para o agrupamento {'>'}
						<Menu
							anchorEl={subMenuAnchorEl}
							open={Boolean(subMenuAnchorEl)}
							onClose={handleSubMenuClose}
							anchorOrigin={{
								horizontal: 'right',
								vertical: 'top',
							}}
						>
							{allGroupings.map(grouping => (
								<MenuItem
									onClick={() => handleAddQuestionsToGrouping(grouping._eq)}
								>
									{grouping.name}
								</MenuItem>
							))}
						</Menu>
					</MenuItem>
					<MenuItem onClick={handleDeleteButtonClick} className="danger">
						Remover perguntas
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
			</Body>
		</Container>
	)
}
