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
				setGroupings(data)
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
		return <p>Mundo</p>
	}

	return (
		<Container>
			<Header title="Questionarios" icon={<ArticleIcon />} />
			<Body cardContext>
				<SelectQuestionary
					isOpen={isSelectQuestionaryOpen}
					onClick={toggleSelectQuestionaryOpen}
				>
					<p className="questionary-title">
						Questionário:{' '}
						<span className="questionary-title-name">
							Política de privacidade
						</span>
					</p>

					<KeyboardArrowDownIcon />
				</SelectQuestionary>
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
