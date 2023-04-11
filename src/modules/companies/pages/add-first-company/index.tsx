import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import { api } from 'api'
import { useNavigate } from 'react-router-dom'
import { Body } from 'components/body'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Header } from 'components/header'
import { Button } from 'components/button'
import { AddCompanyTabs } from 'modules/companies/components/add-company-tabs'
import { Container, CreateYourFirstCompanyScreen } from './styles'

const AddFirstCompany: React.FC = () => {
	const [isRegistering, setIsRegistering] = useState(false)
	const navigate = useNavigate()

	const handleAddFirstCompanyButtonClicked = () => {
		setIsRegistering(true)
	}

	useEffect(() => {
		;(async () => {
			const { data } = await api.get('/companies')
			if (data.length > 0) {
				navigate('/empresas')
			}
		})()
	}, [navigate])

	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas" />
			<Body>
				<div className="content">
					{!isRegistering ? (
						<CreateYourFirstCompanyScreen
							isRegistering={isRegistering}
							data-testid="add-first-company"
						>
							<h1>Cadastre novas empresas 🏭</h1>
							<div className="form-steps">
								<p>
									<span>1</span>Adicione os dados da empresa
								</p>
								<p>
									<span>2</span>Adicione os dados do gestor
								</p>
							</div>
							<Button
								variant="primary"
								text="Cadastrar primeira empresa"
								className="bt-add-first-company"
								onClick={handleAddFirstCompanyButtonClicked}
								endIcon={<ArrowForwardIcon />}
							/>
						</CreateYourFirstCompanyScreen>
					) : (
						<AddCompanyTabs />
					)}
				</div>
			</Body>
		</Container>
	)
}

export { AddFirstCompany }
