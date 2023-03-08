import { Header } from 'components/header'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People'
import { Body } from 'components/body'
import { CompanyGraph } from 'components/company-graph'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ProgressGraph } from 'components/progress-graph'
import { useNavigate } from 'react-router-dom'
import { Container } from './styles'

const questionaries = [
	{
		_eq: '1',
		name: 'Política de Segurança da Informação da empresa mutante',
		percentage: 50,
	},
	{
		_eq: '2',
		name: 'Análise de Riscos',
		percentage: 10,
	},
	{
		_eq: '3',
		name: 'Certificação de Dados',
		percentage: 10,
	},
]

const groupings = [
	{
		_eq: '1',
		name: 'Analise de risco',
		percentage: 49,
	},
	{
		_eq: '2',
		name: 'Trabalho remoto',
		percentage: 79,
	},
	{
		_eq: '3',
		name: 'Gestão de ativos',
		percentage: 60,
	},
]

export const AuditorArea: React.FC = () => {
	const [selectCompanyOpen, setSelectCompanyOpen] = React.useState(false)
	const [selectQuestionaryOpen, setSelectQuestionaryOpen] =
		React.useState(false)
	const navigate = useNavigate()

	const toggleSelectCompanyOpen = () => {
		setSelectCompanyOpen(!selectCompanyOpen)
	}

	const toggleSelectQuestionaryOpen = () => {
		setSelectQuestionaryOpen(!selectQuestionaryOpen)
	}

	const handleOpenGrouping = (groupingId: string) => {
		navigate(`/validar-respostas/${groupingId}`)
	}

	return (
		<Container
			selectCompanyOpen={selectCompanyOpen}
			selectQuestionaryOpen={selectQuestionaryOpen}
		>
			<Header icon={<PeopleIcon />} title="Área do auditor" />
			<Body cardContext>
				<div
					className="select-company"
					onClick={toggleSelectCompanyOpen}
					role="presentation"
				>
					<div className="selected-company">
						<img
							src="https://assets.b9.com.br/wp-content/uploads/2020/07/B.png"
							alt="Logo Casas Bahia"
						/>
						<h2>Casas Bahia</h2>
						<CompanyGraph height={100} width={100} points={100} />
						<ExpandMoreIcon className="expand" />
					</div>
					<div className="selectable-companies">Olá, mundo</div>
				</div>
				<div className="space-select-company" />
				<div
					className="select-questionary"
					onClick={toggleSelectQuestionaryOpen}
					role="presentation"
				>
					<div className="selected-questionary">
						<p>
							Questionário 1: <span>Política de Segurança da Informação</span>
						</p>
						<ExpandMoreIcon className="expand" />
					</div>
				</div>
				<div className="space-select-questionary" />
				<div className="progress-container">
					<div className="questionaries-progress">
						<h3>Progresso do cliente</h3>
						<ProgressGraph defaut size={22} percentage={75} />
						<div className="questionaries-container">
							{questionaries.map((questionary, index) => (
								<div className="questionary" key={questionary._eq}>
									<p className="questionary-title">
										Questionário {index}: {questionary.name}
									</p>
									<ProgressGraph
										percentage={questionary.percentage}
										size={14}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="groupings-progress">
						<h3>Agrupamentos</h3>
						<div className="groupings-container">
							{groupings.map(grouping => (
								<div
									className="grouping"
									key={grouping._eq}
									onClick={() => handleOpenGrouping(grouping._eq)}
									role="presentation"
								>
									<p className="grouping-title">{grouping.name}</p>
									<div className="graph">
										<ProgressGraph percentage={grouping.percentage} size={22} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Body>
		</Container>
	)
}
