import { AccordionDetails } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button } from 'components/button'
import ModeIcon from '@mui/icons-material/Mode'
import { Table } from 'components/table'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Question } from 'interfaces/question.type'
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
import { AccordionSummary, Container, DialogBody } from './styles'

const headerTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

type GroupingAccordionProps = {
	grouping: Grouping
	questionaryId: string
	onDelete: (groupingId: string) => void
}

export const GroupingAccordion: React.FC<GroupingAccordionProps> = ({
	grouping,
	questionaryId,
	onDelete,
}) => {
	const formGroupingNameRef = React.useRef<FormHandles>(null)
	const [isExpanded, setIsExpanded] = useState(false)
	const [dialogDeleteGroupingOpen, setDialogDeleteGroupingOpen] =
		useState(false)
	const [editingName, setEditingName] = useState(false)
	const [newGroupingName, setNewGroupingName] = useState('')

	useEffect(() => {
		setNewGroupingName(grouping.name)
	}, [grouping.name])

	const renderTableBodyInfo = () => {
		const renderedTableRow = grouping.questions.map(question => {
			return (
				<tr key={question._eq} className="question-table-row">
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

	const handleButtonAddClick = () => {
		console.log('add')
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
		</Container>
	)
}
