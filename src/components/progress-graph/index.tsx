import React, { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Container } from './styles'

type ProgressGraphProps = {
	defaut?: boolean
	percentage: number
	size?: number
}

export const ProgressGraph: React.FC<ProgressGraphProps> = ({
	defaut,
	percentage,
	size = 32,
}) => {
	const [width, setWidth] = useState(0)
	const [color, setColor] = useState('#6D7C99')
	const [backgroundColor, setBackgroundColor] = useState('#CFD7E8')
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (defaut) {
			setColor('#6D7C99')
			setBackgroundColor('#CFD7E8')
			return
		}
		if (percentage < 25) {
			setColor('#FF2163')
			setBackgroundColor('#FFADC6')
		} else if (percentage < 50) {
			setColor('#FF991C')
			setBackgroundColor('#FFF494')
		} else if (percentage < 75) {
			setColor('#1F4CD5')
			setBackgroundColor('#ADC8FF')
		} else if (percentage <= 100) {
			setColor('#69B345')
			setBackgroundColor('#C7FAAE')
		}
	}, [defaut, percentage])

	useEffect(() => {
		if (!containerRef.current) return
		const widthSize = containerRef.current.offsetWidth - 70 || 0
		setWidth(widthSize)
	}, [])

	return (
		<Container color={color} size={size} ref={containerRef}>
			<BarChart
				width={width}
				height={size}
				data={[{ percentage }]}
				layout="vertical"
				margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
			>
				<Bar
					dataKey="percentage"
					fill={color}
					background={{ fill: backgroundColor, radius: size / 2 }}
					radius={size / 2}
				/>
				<XAxis type="number" hide domain={[0, 100]} />
				<YAxis dataKey="name" type="category" visibility={0} hide />
			</BarChart>
			<div className="percentage-number">
				<p color={color}>{percentage}%</p>
			</div>
		</Container>
	)
}
