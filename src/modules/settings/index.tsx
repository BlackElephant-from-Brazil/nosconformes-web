import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Body } from 'components/body'
import { HeaderWithTabs, Tab } from '../../components/header-with-tabs'
import { Container } from './styles'
import { Profile } from './tabs/profile'
import { Users } from './tabs/users'

const tabs: Tab[] = [
	{
		title: 'Perfil',
		link: '/perfil',
		element: <Profile />,
	},
	{
		title: 'Usuários',
		link: '/usuarios',
		element: <Users />,
	},
]

export const Settings: React.FC = () => {
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
				icon={<SettingsIcon />}
				title="Configurações"
				tabs={tabs}
				active={tabActive}
				openTab={handleOpenTab}
			/>
			<Body>{renderBody()}</Body>
		</Container>
	)
}
