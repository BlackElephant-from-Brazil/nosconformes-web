import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import { api } from 'api'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../../../components/header'
import { AddCompanyTabs } from '../../components/add-company-tabs'
import { Body, Container, CreateYourFirstCompanyScreen } from './styles'
import { Button } from '../../../../components/button'

const AddFirstCompany: React.FC = () => {
	const [isRegistering, setIsRegistering] = useState(false)
	const navigate = useNavigate()

	const handleAddFirstCompanyButtonClicked = () => {
		setIsRegistering(true)
	}

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		; (async () => {
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
							buttonStyle="primary"
							text="Cadastrar primeira empresa ->"
							className="bt-add-first-company"
							onClick={handleAddFirstCompanyButtonClicked}
						/>
					</CreateYourFirstCompanyScreen>
				) : (
					<AddCompanyTabs />
				)}
			</Body>
		</Container>
	)
}

export { AddFirstCompany }
