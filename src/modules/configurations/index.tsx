import React, { useState } from 'react'
import { HeaderWithTabs, Tab } from '../../components/HeaderWithTabs'
import { Container } from './styles'
import SettingsIcon from '@mui/icons-material/Settings'
import { Profile } from './Profile'
import { PersonalConfigurations } from './PersonalConfigurations'
import { Users } from './Users'



const tabs: Tab[] = [
	{
		title: 'Perfil',
		link: '/perfil',
		element: <Profile />
	},
	{
		title: 'Configurações pessoais',
		link: '/configuracoes-pessoais',
		element: <PersonalConfigurations />
	},
	{
		title: 'Usuários',
		link: '/usuarios',
		element: <Users />
	}
]

export const Configurations: React.FC = () => {
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
			<HeaderWithTabs icon={<SettingsIcon/>} title="Configurações" tabs={tabs} active={tabActive} openTab={handleOpenTab} />
			{renderBody()}
		</Container>
	)
}