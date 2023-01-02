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
					{headerTitles.map((headerTitle, i) => {
						return (
							<th key={i}>
								{headerTitle}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{
					tableRows.map((tableRow, i) => {
						return (
							<tr key={i}>
								{tableRow}
							</tr>
						)
					})
				}
			</tbody>
		</Container>
	)
}