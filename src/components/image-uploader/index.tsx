import React, { useEffect } from 'react'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { Button } from 'components/button'
import { api } from 'api'
import { handleApiError } from 'utils/handle-api-error'
import { Container } from './styles'

type ImageUploaderProps = {
	initialImage?: string
	onDelete: () => void
	onEdit: (file: File) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
	initialImage,
	onDelete,
	onEdit,
}) => {
	const inputImageRef = React.useRef<HTMLInputElement>(null)
	const [image, setImage] = React.useState<string>()

	useEffect(() => {
		;(async () => {
			try {
				if (initialImage) {
					const response = await api.get(initialImage, {
						responseType: 'arraybuffer',
					})
					const base64Image = Buffer.from(response.data, 'binary').toString(
						'base64',
					)
					setImage(`data:image/jpeg;base64,${base64Image}`)
				}
			} catch (error) {
				handleApiError(error)
			}
		})()
	}, [initialImage])

	const handleOpenSelectImage = () => {
		inputImageRef.current?.click()
	}

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			onEdit(file)
		}
	}

	return (
		<Container>
			{initialImage ? (
				<div className="filled-image">
					<img src={initialImage} alt="Imagem ilustrativa do contexto." />
					<div className="buttons">
						<Button text="Deletar" variant="secondary" onClick={onDelete} />
						<Button
							text="Editar"
							variant="secondary"
							onClick={handleOpenSelectImage}
						/>
					</div>
				</div>
			) : (
				<div
					className="insert-image"
					onClick={handleOpenSelectImage}
					role="presentation"
				>
					<InsertPhotoOutlinedIcon />
					<p>
						Clique para <br /> adicionar uma foto
					</p>
				</div>
			)}
			<input
				type="file"
				accept=".jpeg,.jpg,.png"
				ref={inputImageRef}
				hidden
				onChange={handleChangeInput}
			/>
		</Container>
	)
}
