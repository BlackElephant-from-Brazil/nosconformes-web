import React from 'react'

export const handleImageError = (imgRef: React.RefObject<HTMLImageElement>) => {
	if (imgRef.current)
		imgRef.current.src =
			'https://cdn-icons-png.flaticon.com/512/2276/2276400.png'
}
