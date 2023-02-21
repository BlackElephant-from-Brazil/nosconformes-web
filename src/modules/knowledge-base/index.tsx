import React, { useState } from 'react'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Body } from 'components/body'
import { HeaderWithTabs, Tab } from '../../components/header-with-tabs'
import { Container } from './styles'
import { Questions } from './tabs/questions'
import { Questionaries } from './tabs/questionaries'
import { NewQuestionary } from './tabs/questionaries/pages/new-questionary'

const tabs: Tab[] = [
	{
		title: 'Perguntas',
		link: '/perguntas',
		element: <Questions />,
	},
	{
		title: 'Questionários',
		link: '/questionarios',
		element: <Questionaries openTab={() => null} />,
	},
	{
		title: 'Questionários',
		link: '/novo-questionario',
		element: <NewQuestionary />,
		hidden: true,
	},
]

export const KnowledgeBase: React.FC = () => {
	const [tabActive, setTabActive] = useState(tabs[0].link)

	const handleOpenTab = (link: string) => {
		setTabActive(link)
	}

	const renderBody = (openTab: (link: string) => void) => {
		for (let count = 0; count <= tabs.length; count += 1) {
			if (tabs[count].link === tabActive) {
				if (tabs[count].link === '/questionarios') {
					return <Questionaries openTab={openTab} />
				}
				return tabs[count].element
			}
		}
		return null
	}

	return (
		<Container>
			<HeaderWithTabs
				icon={<CommentBankIcon />}
				title="Base de conhecimento"
				tabs={tabs}
				active={tabActive}
				openTab={handleOpenTab}
			/>
			<Body>{renderBody(handleOpenTab)}</Body>
		</Container>
	)
}
