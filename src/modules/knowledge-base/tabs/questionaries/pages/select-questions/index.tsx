import React, { useEffect, useState } from 'react'
import { Form } from '@unform/web'
import { BackButton } from 'components/back-button'
import { Input } from 'components/input'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { Table } from 'components/table'
import { Question } from 'interfaces/question.type'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Checkbox } from 'components/checkbox/input'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { Chip } from 'components/chip'
import { Button } from 'components/button'
import { Dialog } from 'components/dialog'
import CloseIcon from '@mui/icons-material/Close'
import { enqueueSnackbar } from 'notistack'
import { Container, DialogBody } from './styles'

const tableTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

type SelectQuestionsProps = {
	groupingId: string
	openTab: (link: string) => void
}

export const SelectQuestions: React.FC<SelectQuestionsProps> = ({
	groupingId,
	openTab,
}) => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questions, setQuestions] = React.useState<Question[]>([])
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
	const [saveDialogOpen, setSaveDialogOpen] = useState(false)
	const [pages, setPages] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await api.get('/questions')
				setQuestions(data.findQuestions)
				setPages(data.pageCount)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const toggleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const allQuestionsIds = questions.map(question => question._eq)
			setSelectedQuestions(allQuestionsIds)
			return
		}
		setSelectedQuestions([])
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

	const toggleSaveDialogOpen = () => {
		setSaveDialogOpen(!saveDialogOpen)
	}

	const handleBackButtonClick = () => {
		openTab('/detalhes-do-questionario')
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchGrouping')

		console.log(searchInputValue)

		// try {
		// 	const { data: findGroupings } = await api.get(
		// 		`/groupings/${questionary._eq}?query=${searchInputValue}`,
		// 	)
		// 	setQuestionary({ ...questionary, groupings: findGroupings })
		// } catch (err) {
		// 	handleApiError(err)
		// }
	}

	const handleCheckChange = (questionId: string) => {
		toggleSelectedQuestion(questionId)
	}

	const handleAddQuestionsToGroupingClick = () => {
		if (selectedQuestions.length === 0) {
			enqueueSnackbar(
				'Selecione pelo menos uma pergunta para adicionar ao agrupamento',
				{
					variant: 'warning',
				},
			)
			return
		}
		toggleSaveDialogOpen()
	}

	const handleSaveDialogConfirm = async () => {
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
		toggleSaveDialogOpen()
		setSelectedQuestions([])
		openTab('/detalhes-do-questionario')
	}

	const handleSelectPage = async (page: number) => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestion')

		try {
			const { data } = await api.get(
				`/questions?query=${searchInputValue}&page=${page}`,
			)
			setQuestions(data.findQuestions)
			setPages(data.pageCount)
			setCurrentPage(page)
		} catch (err) {
			handleApiError(err)
		}
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
						onClick={() => handleCheckChange(question._eq)}
						role="presentation"
					>
						<p className="table-text">{question.id}</p>
					</td>
					<td
						onClick={() => handleCheckChange(question._eq)}
						role="presentation"
					>
						<p className="table-text">{question.question}</p>
					</td>
					<td
						onClick={() => handleCheckChange(question._eq)}
						role="presentation"
					>
						<Chip
							className={question.func}
							info={capitalizeFirstLetter(question.func)}
							key={question.func}
						/>
					</td>
					<td
						onClick={() => handleCheckChange(question._eq)}
						role="presentation"
					>
						<Chip info="Uma tag bem complexa" />
						<Chip info="Uma tag bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.tags[0].text}</p> */}
					</td>
					<td
						onClick={() => handleCheckChange(question._eq)}
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

	return (
		<Container>
			<div className="select-questions-header">
				<BackButton handleClick={handleBackButtonClick} />
				<h3>Selecione as perguntas abaixo para adicionar ao agrupamento:</h3>
			</div>
			<div className="search">
				<Form
					onSubmit={e => e.preventDefault()}
					ref={formSearchInputRef}
					className="search-input"
				>
					<Input
						name="searchQuestion"
						placeholder="Pesquise por nome da pergunta"
						endAdornmentIcon={<SearchRoundedIcon />}
						onChange={handleSearchInputChange}
					/>
				</Form>
			</div>
			<div className="table-questions">
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
			</div>
			<Button
				text="Adicionar perguntas ao agrupamento ^"
				variant="primary"
				onClick={handleAddQuestionsToGroupingClick}
				className="save-questions-button"
			/>
			<Dialog
				open={saveDialogOpen}
				toggleOpen={toggleSaveDialogOpen}
				variant="bottom_right"
			>
				<DialogBody>
					<CloseIcon
						className="close-dialog-icon"
						onClick={toggleSaveDialogOpen}
						data-testid="close-button"
					/>
					<div className="dialog-confirmation-text">
						<h2>Deseja adicionar as perguntas ao agrupamento?</h2>
					</div>
					<Button
						text="Salvar"
						onClick={handleSaveDialogConfirm}
						variant="primary"
					/>
				</DialogBody>
			</Dialog>
		</Container>
	)
}
