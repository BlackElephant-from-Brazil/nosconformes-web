import React from 'react'

export const handleUserImageError = (
	imgRef: React.RefObject<HTMLImageElement>,
) => {
	if (imgRef.current)
		imgRef.current.src =
			'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
}

export const handleCompanyImageError = (
	imgRef: React.RefObject<HTMLImageElement>,
) => {
	if (imgRef.current)
		imgRef.current.src =
			'https://cdn-icons-png.flaticon.com/512/3061/3061341.png'
}
