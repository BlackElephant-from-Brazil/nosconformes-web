import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { Container, TableContent } from './styles'

type TableProps = {
	headerTitles: string[]
	tableRows: JSX.Element[]
	pagination?: boolean
	className?: string
}

export const Table: React.FC<TableProps> = ({
	headerTitles,
	tableRows,
	pagination,
	className,
}) => {
	return (
		<Container>
			<TableContent className={className}>
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
			</TableContent>
			{pagination && (
				<div className="pagination">
					<KeyboardDoubleArrowLeftIcon />
					<KeyboardArrowLeftIcon />
					<a href="">1</a>
					<p>...</p>
					<a href="">4</a>
					<a href="" className="active">
						5
					</a>
					<a href="">6</a>
					<p>...</p>
					<a href="">12</a>
					<KeyboardArrowRightIcon className="disabled" />
					<KeyboardDoubleArrowRightIcon />
				</div>
			)}
		</Container>
	)
}
