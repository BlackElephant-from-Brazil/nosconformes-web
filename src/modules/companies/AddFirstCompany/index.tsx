import React from 'react'
import { Header } from '../../../components/Header'
import BusinessIcon from '@mui/icons-material/Business'
import { Container, Body } from './styles'
import { Button } from '../../../components/Button'

const AddFirstCompany: React.FC = () => {
	return (
		<Container>
			<Header icon={<BusinessIcon fontSize='large'/>} title="Empresas"/>
			<Body>
				<h1>
					Cadastre novas empresas 🏭
				</h1>
				<div className="add-company-steps">
					<p><span>1</span>Adicione os dados da empresa</p>
					<p><span>2</span>Adicione os dados do gestor</p>
				</div>
				<Button variant='primary' text='Cadastrar primeira empresa ->' />
			</Body>
		</Container>
	)
}

export { AddFirstCompany }