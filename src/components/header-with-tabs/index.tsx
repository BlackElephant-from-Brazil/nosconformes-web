import React from 'react'
import { Container, Tabs } from './styles'

export type Tab = {
	title: string
	link: string
	element: JSX.Element
	hidden?: boolean
}

type HeaderWithTabsProps = {
	icon: JSX.Element
	title: string
	tabs: Tab[]
	active: string
	openTab: (link: string) => void
}

export const HeaderWithTabs: React.FC<HeaderWithTabsProps> = ({
	icon,
	title,
	tabs,
	active,
	openTab,
}) => {
	return (
		<Container>
			<div className="header-content">
				<div className="title">
					{icon}
					<h1>{title}</h1>
				</div>
				<Tabs>
					{tabs.map(({ link, title: tabTitle, hidden }) => {
						if (hidden) return null
						return (
							<li
								onClick={() => openTab(link)}
								key={tabTitle}
								className={link === active ? 'active' : ''}
								role="presentation"
							>
								<p>{tabTitle}</p>
							</li>
						)
					})}
				</Tabs>
			</div>
		</Container>
	)
}
