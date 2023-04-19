import { BackButton } from 'components/back-button'
import { Button } from 'components/button'
import React, { useEffect, useState } from 'react'
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
import { Menu } from 'components/menu'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderWithTabs } from 'components/header-with-tabs'
import { Body } from 'components/body'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Container } from 'components/container'
import AddIcon from '@mui/icons-material/Add'
import { GroupingAccordion } from './components/grouping-accordion'
import { CompaniesDialog } from './components/companies-dialog'
import { NewQuestionaryHeader, NewQuestionaryInteractiors } from './styles'

export const QuestionaryDetails: React.FC = () => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const formQuestionaryNameRef = React.useRef<FormHandles>(null)
	const [companiesDialogOpen, setCompaniesDialogOpen] = useState(false)
	const [questionaryNameEditable, setQuestionaryNameEditable] = useState(false)
	const [newQuestionaryName, setNewQuestionaryName] = useState('')
	const [questionary, setQuestionary] = useState({} as Questionary)
	const [addGroupingMenuOpen, setAddGroupingMenuOpen] = useState(false)
	const [menuAddGroupingAnchorEl, setMenuAddGroupingAnchorEl] =
		useState<HTMLElement | null>(null)
	const [availableGroupings, setAvailableGroupings] = useState<Grouping[]>([])
	const { questionaryId } = useParams()
	const [isPageLoading, setIsPageLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			try {
				const { data: findQuestionary } = await api.get(
					`/questionaries/${questionaryId}`,
				)
				setQuestionary(findQuestionary)
				setNewQuestionaryName(findQuestionary.name)
				setIsPageLoading(false)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [questionaryId])

	useEffect(() => {
		;(async () => {
			try {
				const { data: findGroupings } = await api.get(
					`/questionaries/available-groupings/${questionaryId}`,
				)
				setAvailableGroupings(findGroupings)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [questionaryId])

	const toggleCompaniesDialogOpen = () => {
		setCompaniesDialogOpen(!companiesDialogOpen)
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

	const toggleAddGroupingMenuOpen = () => {
		setAddGroupingMenuOpen(!addGroupingMenuOpen)
	}

	const handleCreateNewGroupingButtonClick = async () => {
		try {
			const { data: newGrouping } = await api.post('/groupings', {
				questionaryId: questionary._eq,
			})
			setQuestionary({
				...questionary,
				groupings: [...questionary.groupings, newGrouping],
			})

			toggleAddGroupingMenuOpen()
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleEditQuestionaryNameClick = () => {
		setQuestionaryNameEditable(true)
	}

	const handleCancelEditQuestionaryName = () => {
		setQuestionaryNameEditable(false)
	}

	const handleSaveQuestionaryName = async () => {
		const questionaryName = formQuestionaryNameRef.current
			?.getFieldValue('name')
			.trim()

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

	const handleDeleteGrouping = (groupingId: string) => {
		setQuestionary({
			...questionary,
			groupings: questionary.groupings.filter(
				grouping => grouping._eq !== groupingId,
			),
		})
	}

	const handleAddGroupingButtonClick = (
		event?: React.MouseEvent<HTMLButtonElement>,
	) => {
		setMenuAddGroupingAnchorEl(event?.currentTarget || null)
		setAddGroupingMenuOpen(true)
	}

	const handleAddGroupingToQuestionary = async (groupingId: string) => {
		try {
			await api.put(`/questionaries/${questionaryId}/groupings/${groupingId}`)
		} catch (err) {
			handleApiError(err)
			return
		}

		try {
			const { data: findGrouping } = await api.get(`/groupings/${groupingId}`)
			setQuestionary({
				...questionary,
				groupings: [...questionary.groupings, findGrouping],
			})
		} catch (err) {
			handleApiError(err)
			return
		}
		setAvailableGroupings([
			...availableGroupings.filter(grouping => grouping._eq !== groupingId),
		])
		toggleAddGroupingMenuOpen()
	}

	const handleBackButtonClick = () => {
		navigate(-1)
	}

	return (
		<Container>
			<HeaderWithTabs
				icon={<CommentBankIcon />}
				title="Base de conhecimento"
				tabs={[
					{
						title: 'Perguntas',
						link: '/base-de-conhecimento/perguntas',
					},
					{
						title: 'Questionários',
						link: '/base-de-conhecimento/questionarios',
					},
				]}
				active="/base-de-conhecimento/questionarios"
			/>
			<Body isLoading={isPageLoading}>
				<NewQuestionaryHeader>
					<BackButton handleClick={handleBackButtonClick} />
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
							text="Compartilhar"
							endIcon={<LockIcon />}
							variant="primary"
							className="share-button"
							onClick={toggleCompaniesDialogOpen}
						/>
					</div>
				</NewQuestionaryHeader>
				<NewQuestionaryInteractiors>
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
						text="Adicionar agrupamento"
						endIcon={<AddIcon />}
						className="new-grouping-button"
						onClick={e => handleAddGroupingButtonClick(e)}
					/>
				</NewQuestionaryInteractiors>
				<div className="groupings">
					{questionary.groupings?.map(grouping => (
						<GroupingAccordion
							groupingId={grouping._eq}
							questionaryId={questionary._eq}
							onDelete={handleDeleteGrouping}
						/>
					))}
				</div>
				<CompaniesDialog
					open={companiesDialogOpen}
					toggleOpen={toggleCompaniesDialogOpen}
					questionaryId={questionary._eq}
					currentCompanies={questionary.companies}
				/>
				<Menu
					open={addGroupingMenuOpen}
					closeMenu={toggleAddGroupingMenuOpen}
					menuItems={[
						{
							label: 'Novo agrupamento +',
							click: handleCreateNewGroupingButtonClick,
							isPrimary: true,
						},
						...availableGroupings.map(grouping => ({
							label: grouping.name,
							click: () => handleAddGroupingToQuestionary(grouping._eq),
						})),
					]}
					menuId="add-grouping-menu"
					anchorEl={menuAddGroupingAnchorEl}
				/>
			</Body>
		</Container>
	)
}
