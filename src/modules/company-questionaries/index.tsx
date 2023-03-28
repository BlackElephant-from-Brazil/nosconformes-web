import { Body } from 'components/body'
import { Header } from 'components/header'
import React from 'react'
import CommentBankIcon from '@mui/icons-material/CommentBank'
import { Container } from './styles'

export const CompanyQuestionaries: React.FC = () => {
	return (
		<Container>
			<Header title="Questionarios" icon={<CommentBankIcon />} />
			<Body>
				<p>Olá, Questionarios</p>
			</Body>
		</Container>
	)
}
