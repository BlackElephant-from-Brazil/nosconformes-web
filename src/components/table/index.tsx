import React from 'react'
import { Container } from './styles'

type TableProps = {
	headerTitles: string[]
	tableRows: JSX.Element[]
}

export const Table: React.FC<TableProps> = ({ headerTitles, tableRows }) => {
	return (
		<Container>
			<thead>
				<tr>
					{headerTitles.map(headerTitle => {
						return <th key={headerTitle}>{headerTitle}</th>
					})}
				</tr>
			</thead>
			<tbody>
				{tableRows.map(tableRow => {
					return tableRow
				})}
			</tbody>
		</Container>
	)
}
