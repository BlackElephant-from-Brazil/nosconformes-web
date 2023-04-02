import { Body } from 'components/body'
import { Header } from 'components/header'
import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { CompanyGraph } from 'components/company-graph'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from 'components/button'
import { useNavigate } from 'react-router-dom'
import { Company } from 'interfaces/company.type'
import { useAuth } from 'hooks/authentication.hook'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { formatSite } from 'utils/format-site'
import { Questionary } from 'interfaces/questionary.type'
import { Grouping as GroupingType } from 'interfaces/grouping.type'
import { RightDrawer } from 'components/right-drawer'
import CloseIcon from '@mui/icons-material/Close'
import {
	AllGroupings,
	CompanyDetails,
	CompanyGroupings,
	CompanySimpleActionPlan,
	Container,
	Grouping,
} from './styles'

export const CompanyDashboard: React.FC = () => {
	const [company, setCompany] = useState<Company>()
	const [questionaries, setQuestionaries] = useState<Questionary[]>()
	const [selectedQuestionary, setSelectedQuestionary] = useState<Questionary>()
	const [groupings, setGroupings] = useState<GroupingType[]>([])
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [isQuestionariesMenuOpen, setIsQuestionariesMenuOpen] = useState(false)
	const [isDrawerQuestionariesMenuOpen, setIsDrawerQuestionariesMenuOpen] =
		useState(false)
	const { employee } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			if (!employee) {
				navigate('/empresas')
				return
			}
			try {
				const { data } = await api.get(`companies/${employee.companyId}`)
				setCompany(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee, navigate])

	useEffect(() => {
		;(async () => {
			if (!employee) return
			try {
				const { data } = await api.get(
					`questionaries/${employee?.companyId}/company`,
				)
				setSelectedQuestionary(data[0])
				data.shift()
				setQuestionaries(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee, navigate])

	useEffect(() => {
		;(async () => {
			if (!selectedQuestionary) return
			if (!employee) return
			try {
				const { data } = await api.get(
					`groupings/${selectedQuestionary._eq}/questionary/${employee?.companyId}/company`,
				)
				setGroupings(data)
			} catch (err) {
				handleApiError(err)
			}
		})()
	}, [employee, selectedQuestionary])

	const toggleDrawer = () => {
		setIsDrawerQuestionariesMenuOpen(false)
		setDrawerOpen(!drawerOpen)
	}

	const handleToggleQuestionariesMenuOpen = () => {
		setIsQuestionariesMenuOpen(!isQuestionariesMenuOpen)
	}

	const handleToggleDrawerQuestionariesMenuOpen = () => {
		setIsDrawerQuestionariesMenuOpen(!isDrawerQuestionariesMenuOpen)
	}

	const handleOpenActionPlanPage = () => {
		navigate('/plano-de-acao')
	}

	return (
		<Container>
			<Header title="Dashboard" icon={<DashboardIcon />} />
			<Body cardContext>
				<CompanyDetails>
					<div className="graph">
						<CompanyGraph points={150} size="large" />
						<span>
							Seus pontos estão abaixo da <span className="media">média</span>
						</span>
					</div>
					<div className="divider" />
					<div className="company">
						<img src={company?.logo} alt={`Logo da empresa ${company?.name}`} />
						<div className="details">
							<h2>{company?.name}</h2>
							<p>{company?.sector}</p>
							<a href={company?.site} target="_blank" rel="noreferrer">
								{formatSite(company?.site)}
							</a>
						</div>
					</div>
				</CompanyDetails>
				<div className="company-info">
					<CompanyGroupings isMenuOpen={isQuestionariesMenuOpen}>
						<h2>Agrupamentos</h2>
						<div className="questionaries">
							<div
								className="selected-questionary"
								onClick={handleToggleQuestionariesMenuOpen}
								role="presentation"
							>
								<p>{selectedQuestionary?.name}</p>
								<KeyboardArrowDownIcon />
							</div>
							<div className="questionaries-list" />
							{/* TODO: INSER HERE OTHER QUESTIONARIES */}
						</div>
						<div className="space-questionaries" />
						<div className="groupings">
							{groupings.slice(0, 3).map(grouping => (
								<Grouping key={grouping.name}>
									<div className="points">40</div>
									<div className="grouping-info">
										<h3 className="questionary-name">{grouping.name}</h3>
										<p className="progress">Você progrediu apenas 10%.</p>
									</div>
								</Grouping>
							))}
						</div>
						<p className="ellipsis" onClick={toggleDrawer} role="presentation">
							...
						</p>
					</CompanyGroupings>
					<CompanySimpleActionPlan>
						<h2>Plano de ação</h2>
						<h3>Nós iremos ajudar sua empresa a melhorar a pontuação</h3>
						<div className="improve-points">
							<CompanyGraph size="medium" points={340} />
							<div className="arrow">
								<p>Para</p>
								<ArrowRightAltIcon />
							</div>
							<CompanyGraph size="medium" points={1000} />
						</div>
						<Button
							text="Gerar plano de ação"
							variant="primary"
							className="bt-generate-plan"
							onClick={handleOpenActionPlanPage}
						/>
					</CompanySimpleActionPlan>
				</div>
			</Body>
			<RightDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}>
				<AllGroupings isMenuOpen={isDrawerQuestionariesMenuOpen}>
					<CloseIcon
						className="close-drawer-icon"
						onClick={toggleDrawer}
						data-testid="close-drawer-button"
					/>
					<h2 className="drawer-title">Agrupamentos</h2>
					<div className="questionaries">
						<div
							className="selected-questionary"
							onClick={handleToggleDrawerQuestionariesMenuOpen}
							role="presentation"
						>
							<p>{selectedQuestionary?.name}</p>
							<KeyboardArrowDownIcon />
						</div>
						<div className="questionaries-list" />
						{/* TODO: INSER HERE OTHER QUESTIONARIES */}
					</div>
					<div className="space-questionaries" />
					<div className="groupings">
						{groupings.map(grouping => (
							<Grouping key={grouping.name}>
								<div className="points">40</div>
								<div className="grouping-info">
									<h3 className="questionary-name">{grouping.name}</h3>
									<p className="progress">Você progrediu apenas 10%.</p>
								</div>
							</Grouping>
						))}
					</div>
				</AllGroupings>
			</RightDrawer>
		</Container>
	)
}
