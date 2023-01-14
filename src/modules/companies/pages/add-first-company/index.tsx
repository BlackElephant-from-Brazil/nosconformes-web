import React, {  useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import { Header } from '../../../../components/Header'
import { AddCompanyTabs } from '../../components/add-company-tabs'
import { Body, Container, CreateYourFirstCompanyScreen } from './styles'
import { Button } from '../../../../components/Button'


const AddFirstCompany: React.FC = () => {
	const [isRegistering, setIsRegistering] = useState(false)

	const handleAddFirstCompanyButtonClicked = () => {
		setIsRegistering(true)
	}


	return (
		<Container>
			<Header icon={<BusinessIcon />} title="Empresas"/>
			<Body>

				{
					!isRegistering ?
						(<CreateYourFirstCompanyScreen isRegistering={isRegistering} data-testid="add-first-company">
							<h1>
							Cadastre novas empresas 🏭
							</h1>
							<div className="form-steps">
								<p><span>1</span>Adicione os dados da empresa</p>
								<p><span>2</span>Adicione os dados do gestor</p>
							</div>
							<Button buttonStyle='primary' text='Cadastrar primeira empresa ->' className='bt-add-first-company' onClick={handleAddFirstCompanyButtonClicked} />
						</CreateYourFirstCompanyScreen>)
						: <AddCompanyTabs />}
			</Body>
		</Container>
	)
}

export { AddFirstCompany }