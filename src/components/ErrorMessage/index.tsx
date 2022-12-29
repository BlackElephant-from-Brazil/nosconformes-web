import React from 'react'

type ErrorMessageProps = {
	className?: string,
	text: string,
	error: boolean,
	icon?: JSX.Element
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, text, error, icon }) => {
	if(!error)
		return <></>

	return (
		<div className={className}>
			{icon}
			<span>{text}</span>
		</div>
	)
}

export { ErrorMessage }