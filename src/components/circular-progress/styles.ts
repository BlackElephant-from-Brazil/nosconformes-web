import { CircularProgress, styled } from '@mui/material'

type ContainerProps = {
	isButton?: boolean
}

export const Container = styled(CircularProgress)<ContainerProps>`
	color: #1f4cd5;
	position: fixed;
	top: 50%;
	left: 50%;
`
