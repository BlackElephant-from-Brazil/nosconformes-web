import React from 'react'
import { IOSSwitch } from './styles'

type SwitchProps = {
	value: boolean
	onChange: (event: any, value: boolean) => void
}

export const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
	return (
		<IOSSwitch sx={{ m: 1 }} defaultChecked value={value} onChange={onChange} />
	)
}
