import React, { useEffect, useState } from 'react'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Body } from 'components/body'
import { HeaderWithTabs, Tab } from '../../components/header-with-tabs'
import { Container } from './styles'
import { Questions } from './tabs/questions'
import { Questionaries } from './tabs/questionaries'
import { QuestionaryDetails } from './tabs/questionaries/pages/questionary-details'

export const KnowledgeBase: React.FC = () => {
	const [tabs, setTabs] = useState<Tab[]>([])
	const [tabActive, setTabActive] = useState('/perguntas')
	const [questionaryId, setQuestionaryId] = useState('')
	const [loadedBody, setLoadedBody] = useState<JSX.Element | null>(null)

	const handleOpenQuestionaryDetails = (
		link: string,
		currentQuestionaryId: string,
	) => {
		setTabActive(link)
		setQuestionaryId(currentQuestionaryId)
	}

	useEffect(() => {
		setTabs([
			{
				title: 'Perguntas',
				link: '/perguntas',
				element: <Questions />,
			},
			{
				title: 'Questionários',
				link: '/questionarios',
				element: (
					<Questionaries
						openQuestionaryDetails={handleOpenQuestionaryDetails}
					/>
				),
			},
			{
				title: 'Questionários',
				link: '/detalhes-do-questionario',
				element: <QuestionaryDetails questionaryId={questionaryId} />,
				hidden: true,
			},
		])
	}, [questionaryId])

	useEffect(() => {
		setLoadedBody(() => {
			if (tabs.length > 0) {
				for (let count = 0; count < tabs.length; count += 1) {
					if (tabs[count].link === tabActive) {
						return tabs[count].element
					}
				}
			}

			return null
		})
	}, [tabActive, tabs])

	const openTab = (link: string) => {
		setTabActive(link)
	}

	return (
		<Container>
			<HeaderWithTabs
				icon={<CommentBankIcon />}
				title="Base de conhecimento"
				tabs={tabs}
				active={tabActive}
				openTab={openTab}
			/>
			<Body cardContext={tabActive === '/questionarios'}>{loadedBody}</Body>
		</Container>
	)
}
