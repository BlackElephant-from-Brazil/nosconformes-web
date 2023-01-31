import React from 'react'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Container } from './styles'

export const ImageUploader: React.FC = () => {
	return (
		<Container>
			<InsertPhotoOutlinedIcon />
			<p>
				Clique para <br /> adicionar uma foto
			</p>
		</Container>
	)
}
