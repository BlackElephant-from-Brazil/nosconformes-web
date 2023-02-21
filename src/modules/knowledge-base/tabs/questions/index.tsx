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
import { Chip } from 'components/chip'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { Menu, MenuItem } from '@mui/material'
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
	const [anchorEl, setAnchorEl] = useState(null)
	const [mousePosition, setMousePosition] = useState({ x: null, y: null })

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
		console.log(questionId)
	}

	const renderTableBodyInfo = () => {
		const renderedTableRow = questions.map(question => {
			return (
				<tr
					key={question._eq}
					onClick={() => handleOpenEditQuestion(question._eq)}
					className="question-table-row"
				>
					<td>
						<p className="table-text">{question.id}</p>
					</td>
					<td>
						<p className="table-text">{question.question}</p>
					</td>
					<td>
						{question.funcs.map(func => (
							<Chip className={func} info={capitalizeFirstLetter(func)} />
						))}
					</td>
					<td>
						<Chip info="Uma tag bem complexa" />
						<Chip info="Uma tag bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.tags[0].text}</p> */}
					</td>
					<td>
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
		console.log('Importar excel')
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
					buttonStyle="excel"
					text="Importar excel"
					className="excel-button"
					onClick={handleImportExcelButtonClick}
				/>
				<Button
					buttonStyle="primary"
					text="Cadastrar pergunta +"
					className="new-question-button"
					onClick={handleCreateNewQuestionButtonClick}
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
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
					mousePosition.y !== null && mousePosition.x !== null
						? { top: mousePosition.y, left: mousePosition.x }
						: undefined
				}
			>
				<MenuItem onClick={handleClose}>Opção 1</MenuItem>
				<MenuItem onClick={handleClose}>Opção 2</MenuItem>
				<MenuItem onClick={handleClose}>Opção 3</MenuItem>
			</Menu>
		</Container>
	)
}
