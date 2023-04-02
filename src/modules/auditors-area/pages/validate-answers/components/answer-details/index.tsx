import { Question } from 'interfaces/question.type'
import React from 'react'
import { capitalizeFirstLetter } from 'utils/captalize-firs-letter'
import { numberToClassName } from 'utils/number-to-classname'
import { showPriority } from 'utils/show-priority'
import { Container } from './styles'

type AnswerDetailsProps = {
	question?: Question
}

export const AnswerDetails: React.FC<AnswerDetailsProps> = ({ question }) => {
	if (!question)
		return (
			<Container>
				<h3>Nenhuma pergunta foi selecionada...</h3>
			</Container>
		)
	return (
		<Container>
			<h3 className="question-question">{question.question}</h3>
			<div className="tags">
				<span className={question.func}>
					{capitalizeFirstLetter(question.func)}
				</span>
				<span className={`${numberToClassName(question.priority)}`}>
					{showPriority(question.priority)}
				</span>
				<span className={`${numberToClassName(question.probability)}`}>
					{question.probability}
				</span>
				<span className={`${numberToClassName(question.impact)}`}>
					{question.impact}
				</span>
				{question.groupings.map(grouping => (
					<span className="default">{grouping.name}</span>
				))}
				{question.tags.map(tag => (
					<span className="default">{tag.label}</span>
				))}
				{question.references.map(reference => (
					<span className="default">{reference.label}</span>
				))}
			</div>

			<div className="description">
				<h4>Descrição</h4>
				<p>{question.description}</p>
			</div>

			<div className="answers">
				<h4>Respostas</h4>
				{question.answer === null && (
					<p>Essa pergunta ainda não foi respondida...</p>
				)}
			</div>
		</Container>
	)
}
