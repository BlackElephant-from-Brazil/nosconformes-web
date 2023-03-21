/* eslint-disable prettier/prettier */
import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { Checkbox } from 'components/checkbox/input'
import { Container, TableContent } from './styles'

type TableProps = {
	headerTitles: string[]
	tableRows: JSX.Element[]
	className?: string
	selectAllRows?: (event: React.ChangeEvent<HTMLInputElement>) => void
	isSelectable?: boolean
	pages?: number
	currentPage?: number
	selectPage?: (page: number) => void
}

export const Table: React.FC<TableProps> = ({
	headerTitles,
	tableRows,
	className,
	selectAllRows,
	isSelectable,
	pages,
	currentPage = 1,
	selectPage,
}) => {
	const renderPagination = () => {
		if (!pages || pages <= 1) return
		return (
			<div className="pagination">
				<KeyboardArrowLeftIcon
					className={currentPage === 1 ? 'disabled' : ''}
					onClick={() => selectPage?.((currentPage) - 1)}
					pointerEvents={currentPage === 1 ? 'none' : 'auto'}
				/>
				{pages <= 5
					? Array.from({ length: pages }, (_, i) => {
						const pageNumber = i + 1
						if (pageNumber === currentPage) {
							return (
								<a
									href="#"
									className="active"
									onClick={() => selectPage?.(pageNumber)}
								>
									{pageNumber}
								</a>
							)
						}
						return (
							<a href="#" onClick={() => selectPage?.(pageNumber)}>
								{pageNumber}
							</a>
						)
					  })
					: (
						Array.from({ length: pages }, (_, i) => {
							const pageNumber = i + 1
							if (pageNumber === currentPage) {
								return (
									<a
										href="#"
										className="active"
										onClick={() => selectPage?.(pageNumber)}
									>
										{pageNumber}
									</a>
								)
							}
							if (pageNumber === 1 || pageNumber === pages) {
								return (
									<a href="#" onClick={() => selectPage?.(pageNumber)}>
										{pageNumber}
									</a>
								)
							}
							if (
								pageNumber === currentPage - 1 ||
								pageNumber === currentPage + 1
							) {
								return (
									<a href="#" onClick={() => selectPage?.(pageNumber)}>
										{pageNumber}
									</a>
								)
							}
							if (
								pageNumber === currentPage - 2 ||
								pageNumber === currentPage + 2
							) {
								return (
									<a href="#" onClick={() => selectPage?.(pageNumber)}>
										...
									</a>
								)
							}
							return null
					  }))
				}
				<KeyboardArrowRightIcon
					className={currentPage === pages ? 'disabled' : ''}
					onClick={() => selectPage?.((currentPage || 0) + 1)}
					pointerEvents={currentPage === pages ? 'none' : 'auto'}
				/>
			</div>
		)
	}

	return (
		<Container>
			<TableContent className={className}>
				<thead>
					<tr>
						{isSelectable && (
							<th>
								<Checkbox onChange={event => selectAllRows?.(event)} />
							</th>
						)}
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
			{renderPagination()}
		</Container>
	)
}
