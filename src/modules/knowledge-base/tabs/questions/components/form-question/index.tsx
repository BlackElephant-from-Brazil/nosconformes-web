import { Form } from '@unform/web'
import React, { useState } from 'react'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { Input } from 'components/input'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Autocomplete } from 'components/autocomplete'
import { Question } from 'interfaces/question.type'
import { Button } from 'components/button'
import DeleteIcon from '@mui/icons-material/Delete'
import { Switch } from 'components/switch'
import { AnswerGroup, Container } from './styles'

type QuestionForm = {
	question: string
	threat: string
	recommendation: string
	description: string
}

type Func = {
	name: Question['funcs'][0]
	label: string
}

type Grouping = {
	_eq: string
	label: string
}

type Tag = {
	_eq: string
	label: string
}

type Reference = {
	_eq: string
	label: string
}

const availableFuncs: Func[] = [
	{ name: 'protect', label: 'Protect' },
	{ name: 'identify', label: 'Identify' },
	{ name: 'detect', label: 'Detect' },
	{ name: 'respond', label: 'Respond' },
	{ name: 'recover', label: 'Recover' },
]

const availableGroupings: Grouping[] = [
	{
		_eq: 'valid-id-1',
		label: 'Análise de risco',
	},
	{
		_eq: 'valid-id-2',
		label: 'Análise de vulnerabilidade',
	},
]

const availableTags: Tag[] = [
	{
		_eq: 'valid-id-1',
		label: 'ISO 27.001',
	},
	{
		_eq: 'valid-id-2',
		label: 'ISO 27.002',
	},
]

const availableReferences: Reference[] = [
	{
		_eq: 'valid-id-1',
		label: 'Classificação de informações',
	},
	{
		_eq: 'valid-id-2',
		label: 'Classificação de risco',
	},
]

export const FormQuestion: React.FC = () => {
	const [selectedFuncs, setSelectedFuncs] = React.useState<Func[]>([])
	const [selectedGoupings, setSelectedGroupings] = React.useState<Grouping[]>(
		[],
	)
	const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
	const [selectedReferences, setSelectedReferences] = React.useState<
		Reference[]
	>([])
	const [accordingButtons, setAccordingButtons] = useState<string[]>([])
	const [partialAccordingButtons, setPartialAccordingButtons] = useState<
		string[]
	>([])
	const formRef = React.useRef<FormHandles>(null)

	const handleFormQuestionSubmit: SubmitHandler<QuestionForm> = data => {
		const createdQuestion = {
			id: 'NC QQCOISA',
			question: data.question,
			funcs: [...selectedFuncs.map(func => func.name)],
			groupings: [...selectedGoupings.map(grouping => grouping._eq)],
			tags: [...selectedTags.map(tag => tag._eq)],
			references: [...selectedReferences.map(reference => reference._eq)],
			threat: data.threat,
			recommendation: data.recommendation,
			description: data.description,
			accordingButtons: [...accordingButtons],
			partialAccordingButtons: [...partialAccordingButtons],
		}

		// TODO: CREATE VALIDATION IN THIS DATA

		console.log(createdQuestion)
	}

	const handleAddNewAccordingAttachmentButtonClick = () => {
		setAccordingButtons([...accordingButtons, ''])
	}

	const handleDeleteAccordingAttachmentButtonClick = (
		indexToRemove: number,
	) => {
		const newAccordingButtons = accordingButtons.filter(
			(_, index) => index !== indexToRemove,
		)
		setAccordingButtons(newAccordingButtons)
	}

	const handleAccordingButtonChange = (index: number, text: string) => {
		const newAccordingButtons = accordingButtons.map((ab, i) => {
			if (i === index) {
				return text
			}
			return ab
		})
		setAccordingButtons(newAccordingButtons)
	}

	const handleAddNewPartialAccordingAttachmentButtonClick = () => {
		setPartialAccordingButtons([...partialAccordingButtons, ''])
	}

	const handleDeletePartialAccordingAttachmentButtonClick = (
		indexToRemove: number,
	) => {
		const newPartialAccordingButtons = partialAccordingButtons.filter(
			(_, index) => index !== indexToRemove,
		)
		setPartialAccordingButtons(newPartialAccordingButtons)
	}

	const handlePartialAccordingButtonChange = (index: number, text: string) => {
		const newPartialAccordingButtons = partialAccordingButtons.map((pab, i) => {
			if (i === index) {
				return text
			}
			return pab
		})
		setPartialAccordingButtons(newPartialAccordingButtons)
	}

	return (
		<Container>
			<Form onSubmit={handleFormQuestionSubmit} ref={formRef}>
				<div className="id">
					<h2>ID NC221009-02</h2>
					<FileCopyIcon />
				</div>
				<Input
					name="question"
					variant="standard"
					className="question"
					placeholder="Qual é a pergunta?"
				/>
				<div className="form-autocomplete">
					<h3>Função</h3>
					<Autocomplete
						handleChange={(_, funcs: any) => setSelectedFuncs(funcs as Func[])}
						options={availableFuncs}
						selectedValues={selectedFuncs}
						optionLabel={func => func.label}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Agrupamento</h3>
					<Autocomplete
						handleChange={(_, groupings: any) =>
							setSelectedGroupings(groupings as Grouping[])
						}
						options={availableGroupings}
						selectedValues={selectedGoupings}
						optionLabel={grouping => grouping.label}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Tag</h3>
					<Autocomplete
						handleChange={(_, tags: any) => setSelectedTags(tags as Tag[])}
						options={availableTags}
						selectedValues={selectedTags}
						optionLabel={tag => tag.label}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Referência</h3>
					<Autocomplete
						handleChange={(_, references: any) =>
							setSelectedReferences(references as Reference[])
						}
						options={availableReferences}
						selectedValues={selectedReferences}
						optionLabel={reference => reference.label}
					/>
				</div>
				<div className="form-input">
					<Input name="threat" label="Ameaça" />
				</div>
				<div className="form-input">
					<Input name="recommendation" label="Recomendação" />
				</div>
				<div className="form-input">
					<Input name="description" label="Descrição" />
				</div>
				<AnswerGroup>
					<h3 className="answers-group-title">Respostas</h3>

					<div className="answer-group-item">
						<h3>Conforme</h3>
						<hr />
						<div className="button-field">
							<Button
								text="Adicionar botão de anexo +"
								buttonStyle="secondary"
								className="bt-add-input-field"
								onClick={handleAddNewAccordingAttachmentButtonClick}
							/>
						</div>
						<div className="input-attachment-group">
							{accordingButtons.map((buttonText, index) => {
								formRef.current?.setFieldValue(
									`accordingButton${index}`,
									buttonText,
								)
								return (
									<div className="input-attachment-field">
										<Input
											placeholder="Escreva o texto que aparecerá no botão de anexo"
											name={`accordingButton${index}`}
											className="input-attachment"
											onChange={e =>
												handleAccordingButtonChange(index, e.target.value)
											}
										/>
										<DeleteIcon
											onClick={() =>
												handleDeleteAccordingAttachmentButtonClick(index)
											}
										/>
									</div>
								)
							})}
						</div>
					</div>

					<div className="answer-group-item">
						<h3>Parcialmente conforme</h3>
						<hr />
						<div className="switch-field">
							<p>Permitir que usuário deixe um comentário</p>
							<Switch />
						</div>
						<div className="button-field">
							<Button
								text="Adicionar botão de anexo +"
								buttonStyle="secondary"
								className="bt-add-input-field"
								onClick={handleAddNewPartialAccordingAttachmentButtonClick}
							/>
						</div>
						<div className="input-attachment-group">
							{partialAccordingButtons.map((buttonText, index) => {
								formRef.current?.setFieldValue(
									`partialAccordingButtons${index}`,
									buttonText,
								)
								return (
									<div className="input-attachment-field">
										<Input
											placeholder="Escreva o texto que aparecerá no botão de anexo"
											name={`partialAccordingButtons${index}`}
											className="input-attachment"
											onChange={e =>
												handlePartialAccordingButtonChange(
													index,
													e.target.value,
												)
											}
										/>
										<DeleteIcon
											onClick={() =>
												handleDeletePartialAccordingAttachmentButtonClick(index)
											}
										/>
									</div>
								)
							})}
						</div>
					</div>

					<div className="answer-group-item">
						<h3>Não conforme</h3>
						<hr />
						<div className="switch-field">
							<p>Permitir que usuário deixe um comentário</p>
							<Switch />
						</div>
					</div>
				</AnswerGroup>

				<div className="button-group-form-question">
					<Button
						buttonStyle="primary"
						text="Cadastrar pergunta"
						type="submit"
						className="button-submit-question"
					/>
				</div>
			</Form>
		</Container>
	)
}
