import React from 'react'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import { Container } from './styles'

type BackButtonProps = {
	handleClick: () => void
	testid?: string
}

export const BackButton: React.FC<BackButtonProps> = ({
	handleClick,
	testid,
}) => {
	return (
		<Container onClick={handleClick} data-testid={testid}>
			<KeyboardArrowLeftOutlinedIcon />
		</Container>
	)
}
