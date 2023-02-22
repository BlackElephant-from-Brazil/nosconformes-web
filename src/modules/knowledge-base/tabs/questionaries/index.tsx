import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Input } from 'components/input'
import React, { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { api } from 'api'
import { Questionary } from 'interfaces/questionary.type'
import { handleApiError } from 'utils/handle-api-error'
import { Button } from 'components/button'
import { Container } from './styles'

type QuestionariesProps = {
	openTab: (link: string, active?: string) => void
}

export const Questionaries: React.FC<QuestionariesProps> = ({ openTab }) => {
	const formSearchInputRef = React.useRef<FormHandles>(null)
	const [questionaries, setQuestionaries] = useState<Questionary[]>([])

	const handleSearchInputChange = async () => {
		const searchInputValue =
			formSearchInputRef.current?.getFieldValue('searchQuestionary')

		try {
			const { data: findQuestionaries } = await api.get(
				`/questionaries?query=${searchInputValue}`,
			)
			setQuestionaries(findQuestionaries)
		} catch (err) {
			handleApiError(err)
		}
	}

	const handleCreateNewQuestionaryButtonClick = () => {
		openTab('/novo-questionario', '/questionarios')
	}

	return (
		<Container>
			<div className="questionaries-list-utilities">
				<Form onSubmit={e => e.preventDefault()} ref={formSearchInputRef}>
					<Input
						name="searchQuestion"
						placeholder="Pesquise pelo nome do questionário"
						endAdornmentIcon={<SearchRoundedIcon />}
						className="search-input"
						onChange={handleSearchInputChange}
					/>
				</Form>
				<Button
					variant="primary"
					text="Cadastrar novo questionário +"
					className="new-questionary-button"
					onClick={handleCreateNewQuestionaryButtonClick}
				/>
			</div>
		</Container>
	)
}
