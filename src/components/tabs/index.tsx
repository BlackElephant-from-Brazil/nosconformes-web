import { Tab } from '@mui/material'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { MuiTabs } from './styles'

interface TabPanelProps {
	children?: React.ReactNode
	dir?: string
	index: number
	value: number
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <div>{children}</div>}
		</div>
	)
}

type TabsProps = {
	tabTitles: string[]
	tabContents: React.ReactNode[]
}

export const Tabs: React.FC<TabsProps> = ({ tabTitles, tabContents }) => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index: number) => {
		setValue(index)
	}

	return (
		<>
			<MuiTabs
				value={value}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="inherit"
				variant="fullWidth"
				aria-label="full width tabs example"
			>
				{tabTitles.map(tabTitle => (
					<Tab label={tabTitle} key={tabTitle} />
				))}
			</MuiTabs>
			<SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
				{tabContents.map((tabContent, index) => (
					<TabPanel
						value={value}
						index={index}
						key={`tab-pannel-${index.toString()}`}
					>
						{tabContent}
					</TabPanel>
				))}
			</SwipeableViews>
		</>
	)
}
