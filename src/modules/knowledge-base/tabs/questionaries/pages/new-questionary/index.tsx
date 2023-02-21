import { BackButton } from 'components/back-button'
import { Button } from 'components/button'
import React, { useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LockIcon from '@mui/icons-material/Lock'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHandles } from '@unform/core'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Grouping } from 'interfaces/grouping.type'
import { Container } from './styles'
import { GroupingAccordion } from './components/grouping-accordion'

export const NewQuestionary: React.FC = () => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [auditorsDialogOpen, setAuditorsDialogOpen] = useState(false)
	const [groupings, setGroupings] = useState<Grouping[]>([])

	const toggleAuditorsDialogOpen = () => {
		setAuditorsDialogOpen(!auditorsDialogOpen)
	}

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchGrouping')

		try {
			const { data: findGroupings } = await api.get(
				`/groupings?query=${searchInputValue}`,
			)
			setGroupings(findGroupings)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewGroupingButtonClick = () => {
		console.log('create new grouping')
	}

	return (
		<Container>
			<div className="new-questionary-header">
				<div className="questionary-name">
					<BackButton handleClick={() => console.log('back')} />
					<p>Questionário:</p>
					<span>Digite o nome do questionário</span>
				</div>
				<div className="questionary-buttons">
					<Button
						text="Auditores"
						buttonStyle="primary-orange"
						icon={<PeopleAltIcon />}
						className="auditors-button"
						onClick={toggleAuditorsDialogOpen}
					/>
					<Button
						text="Compartilhar"
						icon={<LockIcon />}
						buttonStyle="primary"
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
					buttonStyle="secondary"
					text="Adicionar agrupamento +"
					className="new-grouping-button"
					onClick={handleCreateNewGroupingButtonClick}
				/>
			</div>
			<GroupingAccordion />
		</Container>
	)
}
