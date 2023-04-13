import React from 'react'
import { Body } from 'components/body'
import { Header } from 'components/header'
import ArticleIcon from '@mui/icons-material/Article'
import { Questionary } from 'interfaces/questionary.type'
import { useAuth } from 'hooks/authentication.hook'
import { api } from 'api'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { handleApiError } from 'utils/handle-api-error'
import { useNavigate } from 'react-router-dom'
import { Grouping } from 'interfaces/grouping.type'
import { Tabs } from 'components/tabs'
import { ProgressGraph } from 'components/progress-graph'
import { Container, GroupingItem, SelectQuestionary } from './styles'

export const QuestionaryDetails: React.FC = () => {
	const [questionaries, setQuestionaries] = React.useState<Questionary[]>([])
	const [selectedQuestionary, setSelectedQuestionary] =
		React.useState<Questionary>()
	const [groupings, setGroupings] = React.useState<Grouping[]>([])
	const [finishedGroupings, setFinishedGroupings] = React.useState<Grouping[]>(
		[],
	)
	const [isSelectQuestionaryOpen, setIsSelectQuestionaryOpen] =
		React.useState(false)
	const { employee } = useAuth()
	const navigate = useNavigate()

	React.useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(
					`/questionaries/${employee.companyId}/company`,
				)
				setSelectedQuestionary(data[0])
				data.shift()
				setQuestionaries(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee])

	React.useEffect(() => {
		;(async () => {
			if (!employee) return
			if (!selectedQuestionary) return
			try {
				const { data } = await api.get(
					`/groupings/${selectedQuestionary._eq}/questionary/${employee.companyId}/company`,
				)
				setGroupings(data.groupings)
				setFinishedGroupings(data.finishedGroupings)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee, selectedQuestionary])

	const toggleSelectQuestionaryOpen = () => {
		setIsSelectQuestionaryOpen(!isSelectQuestionaryOpen)
	}

	const handleOpenGroupingDetailsClick = (groupingId: string) => {
		navigate(
			`/questionarios-da-empresa/${selectedQuestionary?._eq}/perguntas-do-agrupamento/${groupingId}`,
		)
	}

	const renderGroupings = () => {
		return (
			<div className="groupings">
				{groupings.length === 0 && (
					<p className="no-groupings">
						Nenhum agrupamento para ser exibido aqui.
					</p>
				)}
				{groupings.map(grouping => (
					<GroupingItem
						onClick={() => handleOpenGroupingDetailsClick(grouping._eq)}
					>
						<p className="grouping-name">{grouping.name}</p>
						<div className="graph">
							<ProgressGraph percentage={grouping.percentage || 0} size={18} />
						</div>
					</GroupingItem>
				))}
			</div>
		)
	}

	const renderConcludeds = () => {
		return (
			<div className="groupings">
				{finishedGroupings.length === 0 && (
					<p className="no-groupings">
						Nenhum agrupamento para ser exibido aqui.
					</p>
				)}
				{finishedGroupings.map(grouping => (
					<GroupingItem
						onClick={() => handleOpenGroupingDetailsClick(grouping._eq)}
					>
						<p className="grouping-name">{grouping.name}</p>
						<div className="graph">
							<ProgressGraph percentage={grouping.percentage || 0} size={18} />
						</div>
					</GroupingItem>
				))}
			</div>
		)
	}

	return (
		<Container>
			<Header title="Questionarios" icon={<ArticleIcon />} />
			<Body cardContext>
				<SelectQuestionary
					isOpen={isSelectQuestionaryOpen}
					onClick={toggleSelectQuestionaryOpen}
				>
					<div className="selected-questionary">
						<p className="questionary-title">
							Questionário:{' '}
							<span className="questionary-title-name">
								{selectedQuestionary?.name}
							</span>
						</p>
						<KeyboardArrowDownIcon />
					</div>

					<div className="questionaries">
						{questionaries.length === 0 && (
							<p className="no-questionaries">
								Nenhum questionário para ser exibido aqui...
							</p>
						)}
						{questionaries.map(questionary => (
							<p
								className="questionary-title"
								onClick={() => setSelectedQuestionary(questionary)}
								role="presentation"
							>
								Questionário:{' '}
								<span className="questionary-title-name">
									{questionary.name}
								</span>
							</p>
						))}
					</div>
				</SelectQuestionary>
				<div className="space-select-questionary" />
				<div className="tabs">
					<Tabs
						tabTitles={['Agrupamentos', 'Concluídos']}
						tabContents={[renderGroupings(), renderConcludeds()]}
						tabTitleClass="tabs-title"
					/>
				</div>
			</Body>
		</Container>
	)
}
