import { AccordionDetails, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button } from 'components/button'
import ModeIcon from '@mui/icons-material/Mode'
import { Table } from 'components/table'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Chip } from 'components/chip'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { Grouping } from 'interfaces/grouping.type'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import CloseIcon from '@mui/icons-material/Close'
import { Dialog } from 'components/dialog'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import { FormHandles } from '@unform/core'
import { Checkbox } from 'components/checkbox/input'
import { ContextMenu } from 'components/context-menu'
import { enqueueSnackbar } from 'notistack'
import { AccordionSummary, Container, DialogBody } from './styles'

const headerTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

type GroupingAccordionProps = {
	groupingId: string
	questionaryId: string
	onDelete: (groupingId: string) => void
	openTab: (link: string, groupingId: string) => void
}

export const GroupingAccordion: React.FC<GroupingAccordionProps> = ({
	groupingId,
	questionaryId,
	onDelete,
	openTab,
}) => {
	const formGroupingNameRef = React.useRef<FormHandles>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const [dialogDeleteGroupingOpen, setDialogDeleteGroupingOpen] =
		useState(false)
	const [editingName, setEditingName] = useState(false)
	const [newGroupingName, setNewGroupingName] = useState('')
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [mousePosition, setMousePosition] = useState({ x: null, y: null })
	const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<HTMLElement | null>(
		null,
	)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [allGroupings, setAllGroupings] = useState<Grouping[]>([])
	const [grouping, setGrouping] = useState<Grouping>({} as Grouping)

	useEffect(() => {
		;(async () => {
			try {
				const { data: findGrouping } = await api.get(`/groupings/${groupingId}`)
				setGrouping(findGrouping)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [groupingId])

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
		setNewGroupingName(grouping.name)
	}, [grouping.name])

	const handleClose = () => {
		setMousePosition({ x: null, y: null })
		setAnchorEl(null)
	}

	const toggleDialog = () => {
		setDialogOpen(!dialogOpen)
	}

	const toggleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const allQuestionsIds = grouping.questions?.map(question => question._eq)
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

	const handleCheckChange = (questionId: string) => {
		toggleSelectedQuestion(questionId)
	}

	const handleContextMenu = (event: any) => {
		event.preventDefault()
		setAnchorEl(event.currentTarget)
		setMousePosition({ x: event.clientX, y: event.clientY })
	}

	const renderTableBodyInfo = () => {
		if (!grouping.questions) return [<>oi</>]
		const renderedTableRow = grouping.questions.map(question => {
			return (
				<tr
					key={question._eq}
					className={`question-table-row
						${selectedQuestions.includes(question._eq) ? 'active' : 'unactive'}`}
					onContextMenu={handleContextMenu}
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
						{question.funcs?.map(func => (
							<Chip className={func} info={capitalizeFirstLetter(func)} />
						))}
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

	const handleButtonAddClick = () => {
		openTab('/selecione-as-perguntas', grouping._eq)
	}

	const toggleDialogDeleteGrouping = () => {
		setDialogDeleteGroupingOpen(!dialogDeleteGroupingOpen)
	}

	const handleButtonDeleteClick = () => {
		toggleDialogDeleteGrouping()
	}

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	const handleDeleteDialogConfirm = () => {
		try {
			api.delete(`/questionaries/${questionaryId}/groupings/${grouping._eq}`)
			onDelete(grouping._eq)
			toggleDialogDeleteGrouping()
		} catch (error) {
			handleApiError(error)
		}
	}

	const toggleEditingName = () => {
		setEditingName(!editingName)
	}

	const handleEditGroupingName = () => {
		toggleEditingName()
	}

	const handleSubMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setSubMenuAnchorEl(event.currentTarget)
	}

	const handleSubMenuClose = () => {
		setSubMenuAnchorEl(null)
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

	const reloadTable = async () => {
		try {
			const { data: findGrouping } = await api.get(`/groupings/${groupingId}`)
			setGrouping(findGrouping)
		} catch (error) {
			handleApiError(error)
		}
	}

	const handleDeleteQuesitons = async () => {
		try {
			await api.delete(`/groupings/remove-questions/${grouping._eq}`, {
				data: { questionsIds: selectedQuestions },
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

	const handleSaveGroupingName = async () => {
		const groupingName = formGroupingNameRef.current?.getFieldValue('name')

		try {
			await api.put(`/groupings/${grouping._eq}`, {
				name: groupingName,
			})
		} catch (err) {
			handleApiError(err)
			return
		}
		setNewGroupingName(groupingName)
		toggleEditingName()
	}

	const handleCancelEditGroupingName = () => {
		toggleEditingName()
	}

	const handleAddQuestionsToGrouping = async (newGroupingId: string) => {
		if (selectedQuestions.length === 0) {
			enqueueSnackbar('Selecione pelo menos uma pergunta para adicionar.', {
				variant: 'warning',
			})

			setAnchorEl(null)
			setSubMenuAnchorEl(null)
			return
		}

		try {
			await api.put(`/groupings/add-questions/${newGroupingId}`, {
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

	return (
		<Container expanded={isExpanded}>
			<AccordionSummary
				expandIcon={
					<ArrowForwardIosSharpIcon
						sx={{ fontSize: '0.9rem' }}
						onClick={toggleExpanded}
					/>
				}
			>
				<div className="accordion-grouping-name">
					{editingName ? (
						<Form onSubmit={e => e.preventDefault()} ref={formGroupingNameRef}>
							<Input
								name="name"
								variant="standard"
								initialValue={newGroupingName}
							/>
							<CheckIcon onClick={handleSaveGroupingName} />
							<ClearIcon onClick={handleCancelEditGroupingName} />
						</Form>
					) : (
						<>
							<p className="title">
								{newGroupingName !== ''
									? newGroupingName
									: 'Insira o nome do agrupamento'}
							</p>
							<ModeIcon onClick={handleEditGroupingName} />
						</>
					)}
				</div>
				<div
					className="empty-space"
					onClick={toggleExpanded}
					role="presentation"
				/>
				<div className="accordion-buttons">
					<Button
						variant="secondary"
						text="Adicionar perguntas +"
						className="button-add"
						onClick={handleButtonAddClick}
					/>
					<Button
						variant="secondary"
						text="Excluir agrupamento x"
						className="button-delete"
						onClick={handleButtonDeleteClick}
					/>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Table
					headerTitles={headerTitles}
					tableRows={renderTableBodyInfo()}
					className="table-questionary-grouping"
					selectAllRows={toggleSelectAllRows}
					isSelectable
				/>
			</AccordionDetails>

			<Dialog
				open={dialogDeleteGroupingOpen}
				toggleOpen={toggleDialogDeleteGrouping}
				variant="bottom_right"
			>
				<DialogBody>
					<CloseIcon
						className="close-dialog-icon"
						onClick={toggleDialogDeleteGrouping}
						data-testid="close-button"
					/>
					<div className="dialog-confirmation-text">
						<h2>
							Tem certeza que deseja excluir este agrupamento deste
							questionário?
						</h2>
					</div>
					<Button
						text="Excluir"
						onClick={handleDeleteDialogConfirm}
						variant="danger"
					/>
				</DialogBody>
			</Dialog>
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
						{allGroupings?.map(
							availableGrouping =>
								availableGrouping._eq !== grouping._eq && (
									<MenuItem
										onClick={() =>
											handleAddQuestionsToGrouping(availableGrouping._eq)
										}
									>
										{availableGrouping.name}
									</MenuItem>
								),
						)}
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
						<h2>
							Tem certeza que deseja remover as perguntas selecionadas do
							agrupamento?
						</h2>
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
