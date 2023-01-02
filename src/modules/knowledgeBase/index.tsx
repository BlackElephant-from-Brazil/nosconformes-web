import React, { useState } from 'react'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { HeaderWithTabs, Tab } from '../../components/HeaderWithTabs'
import { Container } from './styles'
import { Questionaries } from './Questionaries'
import { Questions } from './Questions'


const tabs: Tab[] = [
	{
		title: 'Perguntas',
		link: '/perguntas',
		element: <Questions />
	},
	{
		title: 'Questionários',
		link: '/questionarios',
		element: <Questionaries />
	},
]

export const KnowledgeBase: React.FC = () => {
	const [tabActive, setTabActive] = useState(tabs[0].link)

	const handleOpenTab = (link: string) => {
		setTabActive(link)
		console.log(link)
	}

	const renderBody = () => {
		for (let count = 0; count <= tabs.length; count++) {
			if (tabs[count].link === tabActive) {
				return tabs[count].element
			}
		}
	}

	return (
		<Container>
			<>
				<HeaderWithTabs icon={<CommentBankIcon/>} title="Configurações" tabs={tabs} active={tabActive} openTab={handleOpenTab} />
				{renderBody()}
			</>
		</Container>
	)
}