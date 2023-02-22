import { AccordionDetails } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Button } from 'components/button'
import ModeIcon from '@mui/icons-material/Mode'
import { Table } from 'components/table'
import { handleApiError } from 'utils/handle-api-error'
import { api } from 'api'
import { Question } from 'interfaces/question.type'
import { Chip } from 'components/chip'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { AccordionSummary, Container } from './styles'

const headerTitles = ['ID', 'Pergunta', 'Função', 'Tag', 'Referência']

export const GroupingAccordion: React.FC = () => {
	const [groupingQuestions, setGroupingQuestions] = useState<Question[]>([])
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
			try {
				const { data } = await api.get('/questions')
				setGroupingQuestions(data)
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [])

	const renderTableBodyInfo = () => {
		const renderedTableRow = groupingQuestions.map(question => {
			return (
				<tr key={question._eq} className="question-table-row">
					<td>
						<p className="table-text">{question.id}</p>
					</td>
					<td>
						<p className="table-text">{question.question}</p>
					</td>
					<td>
						{question.funcs.map(func => (
							<Chip className={func} info={capitalizeFirstLetter(func)} />
						))}
					</td>
					<td>
						<Chip info="Uma tag bem complexa" />
						<Chip info="Uma tag bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.tags[0].text}</p> */}
					</td>
					<td>
						<Chip info="Uma referência bem complexa" />
						<Chip info="Uma referência bem complexa e muito grande também que precisaria ser quebrada" />
						{/* <p>{question.references[0]?.text}</p> */}
					</td>
				</tr>
			)
		})
		return renderedTableRow
	}

	const handleButtonAddClick = () => {
		console.log('add')
	}

	const handleButtonDeleteClick = () => {
		console.log('delete')
	}

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<Container expanded={isExpanded}>
			<AccordionSummary
				expandIcon={
					<ArrowForwardIosSharpIcon
						sx={{ fontSize: '0.9rem' }}
						onClick={toggleExpanded}
					/>
				}
			>
				<div className="accordion-grouping-name">
					<p className="title">Muito bom</p>
					<ModeIcon />
				</div>
				<div
					className="empty-space"
					onClick={toggleExpanded}
					role="presentation"
				/>
				<div className="accordion-buttons">
					<Button
						variant="secondary"
						text="Adicionar perguntas +"
						className="button-add"
						onClick={handleButtonAddClick}
					/>
					<Button
						variant="secondary"
						text="Excluir agrupamento x"
						className="button-delete"
						onClick={handleButtonDeleteClick}
					/>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Table
					headerTitles={headerTitles}
					tableRows={renderTableBodyInfo()}
					className="table-questionary-grouping"
				/>
			</AccordionDetails>
		</Container>
	)
}
