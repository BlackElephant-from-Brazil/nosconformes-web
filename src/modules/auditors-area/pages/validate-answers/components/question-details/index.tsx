import React from 'react'
import { Container } from './styles'

export const QuestionDetails: React.FC = () => {
	return (
		<Container>
			<h3 className="question-question">A empresa realiza análise de risco?</h3>
			<div className="tags">
				<span className="protect">Protect</span>
				<span className="extreme">Extrema</span>
				<span className="default">Análise de risco</span>
			</div>

			<div className="description">
				<h4>Descrição</h4>
				<p>Esta é uma descrição da pergunta</p>
			</div>

			<div className="answers">
				<h4>Respostas</h4>
			</div>
		</Container>
	)
}
