import React, { useState } from 'react'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Body } from 'components/body'
import { HeaderWithTabs, Tab } from '../../components/header-with-tabs'
import { Container } from './styles'
import { Questionaries } from './tabs/Questionaries'
import { Questions } from './tabs/questions'

const tabs: Tab[] = [
	{
		title: 'Perguntas',
		link: '/perguntas',
		element: <Questions />,
	},
	{
		title: 'Questionários',
		link: '/questionarios',
		element: <Questionaries />,
	},
]

export const KnowledgeBase: React.FC = () => {
	const [tabActive, setTabActive] = useState(tabs[0].link)

	const handleOpenTab = (link: string) => {
		setTabActive(link)
	}

	const renderBody = () => {
		for (let count = 0; count <= tabs.length; count += 1) {
			if (tabs[count].link === tabActive) {
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
			<Body>{renderBody()}</Body>
		</Container>
	)
}
