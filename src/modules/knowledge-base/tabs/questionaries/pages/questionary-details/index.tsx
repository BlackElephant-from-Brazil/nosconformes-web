import { BackButton } from 'components/back-button'
import { Button } from 'components/button'
import React, { useEffect, useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LockIcon from '@mui/icons-material/Lock'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Grouping } from 'interfaces/grouping.type'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { Questionary } from 'interfaces/questionary.type'
import { Container } from './styles'
import { GroupingAccordion } from './components/grouping-accordion'
import { AuditorsDialog } from './components/auditors-dialog'

type QuestionaryDetailsProps = {
	questionaryId: string
}

export const QuestionaryDetails: React.FC<QuestionaryDetailsProps> = ({
	questionaryId,
}) => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const formQuestionaryNameRef = React.useRef<FormHandles>(null)
	const [auditorsDialogOpen, setAuditorsDialogOpen] = useState(false)
	const [questionaryNameEditable, setQuestionaryNameEditable] = useState(false)
	const [newQuestionaryName, setNewQuestionaryName] = useState('')
	const [questionary, setQuestionary] = useState({} as Questionary)

	useEffect(() => {
		;(async () => {
			try {
				const { data: findQuestionary } = await api.get(
					`/questionaries/${questionaryId}`,
				)

				console.log('findQuestionary', findQuestionary)
				setQuestionary(findQuestionary)
				setNewQuestionaryName(findQuestionary.name)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [questionaryId])

	if (!questionaryId) return null

	const toggleAuditorsDialogOpen = () => {
		setAuditorsDialogOpen(!auditorsDialogOpen)
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchGrouping')

		try {
			const { data: findGroupings } = await api.get(
				`/groupings/${questionary._eq}?query=${searchInputValue}`,
			)
			setQuestionary({ ...questionary, groupings: findGroupings })
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewGroupingButtonClick = async () => {
		let newGrouping: Grouping
		try {
			newGrouping = await api.post('/groupings', {
				questionaryId: questionary._eq,
			})
		} catch (err) {
			handleApiError(err)
			return
		}
		setQuestionary({
			...questionary,
			groupings: [...questionary.groupings, newGrouping],
		})
	}

	const handleEditQuestionaryNameClick = () => {
		setQuestionaryNameEditable(true)
	}

	const handleCancelEditQuestionaryName = () => {
		setQuestionaryNameEditable(false)
	}

	const handleSaveQuestionaryName = async () => {
		const questionaryName =
			formQuestionaryNameRef.current?.getFieldValue('name')

		try {
			await api.put(`/questionaries/${questionaryId}`, {
				name: questionaryName,
			})
		} catch (err) {
			handleApiError(err)
			return
		}

		setNewQuestionaryName(questionaryName)
		setQuestionaryNameEditable(false)
	}

	return (
		<Container>
			<div className="new-questionary-header">
				<BackButton handleClick={() => console.log('back')} />
				<div className="questionary-name">
					<p>Questionário:</p>
					{questionaryNameEditable ? (
						<Form
							onSubmit={e => e.preventDefault()}
							ref={formQuestionaryNameRef}
						>
							<Input
								name="name"
								variant="standard"
								initialValue={newQuestionaryName}
							/>
							<CheckIcon onClick={handleSaveQuestionaryName} />
							<ClearIcon onClick={handleCancelEditQuestionaryName} />
						</Form>
					) : (
						<>
							<span>
								{newQuestionaryName !== ''
									? newQuestionaryName
									: 'Digite o nome do questionário'}
							</span>
							<EditIcon onClick={handleEditQuestionaryNameClick} />
						</>
					)}
				</div>
				<div className="questionary-buttons">
					<Button
						text="Auditores"
						variant="primary-orange"
						icon={<PeopleAltIcon />}
						className="auditors-button"
						onClick={toggleAuditorsDialogOpen}
					/>
					<Button
						text="Compartilhar"
						icon={<LockIcon />}
						variant="primary"
						className="share-button"
					/>
				</div>
			</div>
			<div className="new-questionary-interactors">
				<Form
					onSubmit={e => e.preventDefault()}
					ref={formSearchInputRef}
					className="search-input"
				>
					<Input
						name="searchGrouping"
						placeholder="Pesquise pelo agrupamento"
						endAdornmentIcon={<SearchRoundedIcon />}
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					variant="secondary"
					text="Adicionar agrupamento +"
					className="new-grouping-button"
					onClick={handleCreateNewGroupingButtonClick}
				/>
			</div>
			<div className="groupings">
				{questionary.groupings?.map(grouping => (
					<GroupingAccordion grouping={grouping} />
				))}
			</div>
			<AuditorsDialog
				open={auditorsDialogOpen}
				toggleOpen={toggleAuditorsDialogOpen}
				questionaryId={questionary._eq}
				currentAuditors={questionary.auditors}
			/>
		</Container>
	)
}
