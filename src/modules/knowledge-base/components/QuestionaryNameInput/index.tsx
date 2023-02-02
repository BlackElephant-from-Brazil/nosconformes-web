import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { Input } from 'components/input'
import { Container } from './styles'

type QuestionaryNameInput = {
	className?: string
}

export const QuestionaryNameInput: React.FC<QuestionaryNameInput> = ({
	className,
}) => {
	const [editQuestionaryName, setEditQuestionaryName] = useState(false)

	const toggleEditQuestionaryName = () => {
		setEditQuestionaryName(!editQuestionaryName)
	}

	const renderQuestionaryInput = () => {
		if (editQuestionaryName) {
			return (
				<>
					<Input
						placeholder="Digite o nome do questionário"
						name="name"
						autoFocus
						className="input-questionary-name"
					/>
					<CloseIcon onClick={toggleEditQuestionaryName} />
					<CheckIcon onClick={toggleEditQuestionaryName} />
				</>
			)
		}
		return (
			<>
				<p>Digite o nome do questionário</p>
				<EditIcon onClick={toggleEditQuestionaryName} />
			</>
		)
	}

	return (
		<Container className={className}>
			<label htmlFor="name">Questionário: </label>
			{renderQuestionaryInput()}
		</Container>
	)
}
