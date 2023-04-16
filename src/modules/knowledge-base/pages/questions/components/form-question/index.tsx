import { Form } from '@unform/web'
import React, { useEffect, useState } from 'react'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import { Input } from 'components/input'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Autocomplete } from 'components/autocomplete'
import { Question } from 'interfaces/question.type'
import { Button } from 'components/button'
import DeleteIcon from '@mui/icons-material/Delete'
import { Switch } from 'components/switch'
import { Alert } from 'components/alert'
import { handleYupErrors } from 'utils/handle-yup-errors'
import * as Yup from 'yup'
import { api } from 'api'
import { enqueueSnackbar } from 'notistack'
import { handleApiError } from 'utils/handle-api-error'
import { isObjectEmpty } from 'utils/is-object-empty'
import { createFilterOptions } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AnswerGroup, Container } from './styles'

type QuestionForm = {
	question: string
	threat: string
	recommendation: string
	description: string
}

type Func = {
	name: Question['func']
	label: string
}

type Grouping = {
	_eq: string
	name: string
}

type Tag = {
	_eq?: string
	inputValue?: string
	label: string
}

type Reference = {
	_eq?: string
	inputValue?: string
	label: string
}

const availableFuncs: Func[] = [
	{ name: 'protect', label: 'Protect' },
	{ name: 'identify', label: 'Identify' },
	{ name: 'detect', label: 'Detect' },
	{ name: 'respond', label: 'Respond' },
	{ name: 'recover', label: 'Recover' },
]

type FormQuestionProps = {
	toggleDrawer: () => void
	reloadTable: () => void
	question?: Question
}

export const FormQuestion: React.FC<FormQuestionProps> = ({
	reloadTable,
	toggleDrawer,
	question,
}) => {
	const [selectedFunc, setSelectedFunc] = React.useState<Func>()
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
	const [displayErrors, setDisplayErrors] = useState('')
	const [errorFuncs, setErrorFuncs] = useState(false)
	const [errorTags, setErrorTags] = useState(false)
	const [errorReferences, setErrorReferences] = useState(false)
	const [availableGroupings, setAvailableGroupings] = useState<Grouping[]>([])
	const [groupingsOpen, setGroupingsOpen] = useState(false)
	const [availableTags, setAvailableTags] = useState<Tag[]>([])
	const [tagsOpen, setTagsOpen] = useState(false)
	const [availableReferences, setAvailableReferences] = useState<Reference[]>(
		[],
	)
	const [referencesOpen, setReferencesOpen] = useState(false)
	const filterTag = createFilterOptions<Tag>()
	const filterReference = createFilterOptions<Reference>()
	const [
		partialAccordingAllowInformation,
		setPartialAccordingAllowInformation,
	] = useState(true)
	const [nonAccordingAllowInformation, setNonAccordingAllowInformation] =
		useState(true)
	const [questionId, setQuestionId] = useState<string>('')
	const [selectedPriority, setSelectedPriority] = useState<number>()
	const [errorPriority, setErrorPriority] = useState(false)
	const [selectedProbability, setSelectedProbability] = useState<number>()
	const [errorProbability, setErrorProbability] = useState(false)
	const [selectedImpact, setSelectedImpact] = useState<number>()
	const [errorImpact, setErrorImpact] = useState(false)

	useEffect(() => {
		if (!groupingsOpen) {
			setAvailableGroupings([])
		} else {
			;(async () => {
				try {
					const { data } = await api.get('/groupings')
					setAvailableGroupings(data)
				} catch (error) {
					handleApiError(error)
				}
			})()
		}
	}, [groupingsOpen, setAvailableGroupings])

	useEffect(() => {
		if (!tagsOpen) {
			setAvailableTags([])
		} else {
			;(async () => {
				try {
					const { data } = await api.get('/tags')
					setAvailableTags(data)
				} catch (error) {
					handleApiError(error)
				}
			})()
		}
	}, [tagsOpen, setAvailableTags])

	useEffect(() => {
		if (!referencesOpen) {
			setAvailableReferences([])
		} else {
			;(async () => {
				try {
					const { data } = await api.get('/references')
					setAvailableReferences(data)
				} catch (error) {
					handleApiError(error)
				}
			})()
		}
	}, [referencesOpen, setAvailableReferences])

	useEffect(() => {
		if (question && !isObjectEmpty(question)) {
			// setSelectedFuncs(
			// 	question.funcs.map(func => {
			// 		const funcData = availableFuncs.find(
			// 			availableFunc => availableFunc.name === func,
			// 		)
			// 		return funcData
			// 	}),
			// )
			// setSelectedGroupings(
			// 	question.groupings.map(grouping => {
			// 		const groupingData = availableGroupings.find(
			// 			availableGrouping => availableGrouping._eq === grouping,
			// 		)
			// 		return groupingData
			// 	}),
			// )
			// setSelectedTags(
			// 	question.tags.map(tag => {
			// 		const tagData = availableTags.find(
			// 			availableTag => availableTag._eq === tag,
			// 		)
			// 		return tagData
			// 	}),
			// )
			// setSelectedReferences(
			// 	question.references.map(reference => {
			// 		const referenceData = availableReferences.find(
			// 			availableReference => availableReference._eq === reference,
			// 		)
			// 		return referenceData
			// 	}),
			// )
			formRef.current?.setData({
				question: question.question,
				threat: question.threat,
				recommendation: question.recommendation,
				description: question.description,
			})
			setAccordingButtons(question.accordingButtons.map(ab => ab.label))
			setPartialAccordingButtons(
				question.partialAccordingButtons.map(pab => pab.label),
			)
		}
	}, [question])

	useEffect(() => {
		;(async () => {
			try {
				if (!question || isObjectEmpty(question)) {
					const { data } = await api.get('questions/new-id')
					setQuestionId(data)
				} else {
					setQuestionId(question.id)
				}
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [question])

	const togglePartialAccordingAllowInformation = () => {
		setPartialAccordingAllowInformation(!partialAccordingAllowInformation)
	}

	const toggleNonAccordingAllowInformation = () => {
		setNonAccordingAllowInformation(!nonAccordingAllowInformation)
	}

	const handleFormQuestionSubmit: SubmitHandler<QuestionForm> = async data => {
		setDisplayErrors('')
		setErrorFuncs(false)
		setErrorReferences(false)
		setErrorTags(false)
		const questionData = {
			id: questionId,
			question: data.question.trim(),
			func: selectedFunc?.name,
			groupings: [...selectedGoupings.map(grouping => grouping._eq)],
			tags: [
				...selectedTags.map(tag => {
					return tag._eq === undefined ? tag.label : tag._eq
				}),
			],
			references: [
				...selectedReferences.map(reference =>
					reference._eq === undefined ? reference.label : reference._eq,
				),
			],
			priority: selectedPriority,
			probability: selectedProbability,
			impact: selectedImpact,
			threat: data.threat.trim(),
			recommendation: data.recommendation.trim(),
			description: data.description.trim(),
			accordingButtons: [...accordingButtons],
			partialAccordingButtons: [...partialAccordingButtons],
			partialAccordingAllowInformation,
			nonAccordingAllowInformation,
		}

		try {
			const schema = Yup.object().shape({
				question: Yup.string().required(
					'A pergunta precisa estar preenchida. ',
				),
				funcs: Yup.array().min(1, 'Escolha pelo menos uma função. '),
				tags: Yup.array().min(1, 'Escolha pelo menos uma tag. '),
				references: Yup.array().min(1, 'Escolha pelo menos uma referência. '),
				threat: Yup.string().required('Preencha o campo de ameaça. '),
				recommendation: Yup.string().required(
					'Preencha o campo de recomendação. ',
				),
				description: Yup.string().required('Preencha o campo de descrição. '),

				accordingButtons: Yup.array().min(
					1,
					'Adicione pelo menos um botão anexo de conformidade. ',
				),

				partialAccordingButtons: Yup.array().min(
					1,
					'Adicione pelo menos um botão anexo de conformidade parcial. ',
				),
			})

			await schema.validate(questionData, {
				abortEarly: false,
			})
		} catch (err) {
			const validationErrors = handleYupErrors(err, formRef, setDisplayErrors)
			setErrorFuncs(!!validationErrors?.funcs)
			setErrorReferences(!!validationErrors?.references)
			setErrorTags(!!validationErrors?.tags)
			return
		}

		try {
			if (question && !isObjectEmpty(question)) {
				await api.put(`/questions/${question._eq}`, {
					...questionData,
				})
				enqueueSnackbar('Pergunta atualizada com sucesso', {
					variant: 'success',
				})
			} else {
				await api.post('/questions', {
					...questionData,
				})
				enqueueSnackbar('Pergunta cadastrada com sucesso!', {
					variant: 'success',
				})
			}
			reloadTable()
			toggleDrawer()
		} catch (err) {
			handleApiError(err)
		}
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
					<h2>{questionId}</h2>
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
						error={errorFuncs}
						handleChange={(_, func: any) => setSelectedFunc(func)}
						options={availableFuncs}
						selectedValues={selectedFunc}
						optionLabel={func => func.label}
						multiple={false}
						disableCloseOnSelect={false}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>
						Agrupamento <span>(Opcional)</span>
					</h3>
					<Autocomplete
						handleChange={(_, groupings: any) =>
							setSelectedGroupings(groupings as Grouping[])
						}
						options={availableGroupings}
						selectedValues={selectedGoupings}
						optionLabel={grouping => grouping.name}
						open={groupingsOpen}
						setOpen={() => setGroupingsOpen(true)}
						setClose={() => setGroupingsOpen(false)}
						loading={groupingsOpen && availableGroupings.length === 0}
						isOptionEqualToValue={(option, value) => option._eq === value._eq}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Tag</h3>
					<Autocomplete
						error={errorTags}
						handleChange={(_, tags: any) => {
							if (tags[tags.length - 1]?.inputValue) {
								const newTag = { label: tags[tags.length - 1].inputValue }
								const tagsToSave = tags.filter(
									(tag: any) => tag.inputValue === undefined,
								)
								setSelectedTags([...tagsToSave, newTag])
							} else {
								setSelectedTags(tags)
							}
						}}
						filterOptions={(options, params) => {
							const filtered = filterTag(options, params)
							const { inputValue } = params
							const isExisting = options.some(
								option => inputValue === option.label,
							)
							if (inputValue !== '' && !isExisting) {
								filtered.push({
									inputValue,
									label: `Criar tag "${inputValue}"`,
								})
							}

							return filtered
						}}
						options={availableTags}
						selectedValues={selectedTags}
						optionLabel={tag => tag.label}
						open={tagsOpen}
						setOpen={() => setTagsOpen(true)}
						setClose={() => setTagsOpen(false)}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Referência</h3>
					<Autocomplete
						error={errorReferences}
						handleChange={(_, references: any) => {
							if (references[references.length - 1]?.inputValue) {
								const newReference = {
									label: references[references.length - 1].inputValue,
								}
								const referencesToSave = references.filter(
									(reference: any) => reference.inputValue === undefined,
								)
								setSelectedReferences([...referencesToSave, newReference])
							} else {
								setSelectedReferences(references)
							}
						}}
						filterOptions={(options, params) => {
							const filtered = filterReference(options, params)
							const { inputValue } = params
							const isExisting = options.some(
								option => inputValue === option.label,
							)
							if (inputValue !== '' && !isExisting) {
								filtered.push({
									inputValue,
									label: `Criar referência "${inputValue}"`,
								})
							}

							return filtered
						}}
						options={availableReferences}
						selectedValues={selectedReferences}
						optionLabel={reference => reference.label}
						open={referencesOpen}
						setOpen={() => setReferencesOpen(true)}
						setClose={() => setReferencesOpen(false)}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Prioridade</h3>
					<Autocomplete
						error={errorPriority}
						handleChange={(_, priority: any) =>
							setSelectedPriority(priority.value)
						}
						options={[
							{ label: 'Baixa', value: 1 },
							{ label: 'Média', value: 2 },
							{ label: 'Alta', value: 3 },
							{ label: 'Crítica', value: 4 },
							{ label: 'Extrema', value: 5 },
						]}
						selectedValues={selectedPriority}
						optionLabel={priority => priority.label}
						multiple={false}
						disableCloseOnSelect={false}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Probabilidade</h3>
					<Autocomplete
						error={errorProbability}
						handleChange={(_, probability: any) =>
							setSelectedProbability(probability)
						}
						options={[1, 2, 3, 4, 5]}
						selectedValues={selectedProbability}
						optionLabel={probability => probability}
						multiple={false}
						disableCloseOnSelect={false}
					/>
				</div>
				<div className="form-autocomplete">
					<h3>Impacto</h3>
					<Autocomplete
						error={errorImpact}
						handleChange={(_, impact: any) => setSelectedImpact(impact)}
						options={[1, 2, 3, 4, 5]}
						selectedValues={selectedImpact}
						optionLabel={impact => impact}
						multiple={false}
						disableCloseOnSelect={false}
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
								text="Adicionar botão de anexo"
								endIcon={<AddIcon />}
								variant="secondary"
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
											initialValue={buttonText}
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
							<Switch
								value={partialAccordingAllowInformation}
								onChange={togglePartialAccordingAllowInformation}
							/>
						</div>
						<div className="button-field">
							<Button
								text="Adicionar botão de anexo"
								endIcon={<AddIcon />}
								variant="secondary"
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
											initialValue={buttonText}
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
							<Switch
								value={nonAccordingAllowInformation}
								onChange={toggleNonAccordingAllowInformation}
							/>
						</div>
					</div>
				</AnswerGroup>
				<Alert text={displayErrors} type="error" />

				<div className="button-group-form-question">
					<Button
						variant="primary"
						text="Cadastrar pergunta"
						type="submit"
						className="button-submit-question"
					/>
				</div>
			</Form>
		</Container>
	)
}
