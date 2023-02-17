import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { Container } from './styles'

type CompanyGraphProps = {
	points: number
	height: number
	width: number
}

const graphSet = [
	{ name: 'Perigo', value: 333 },
	{ name: 'Atenção', value: 333 },
	{ name: 'Ideal', value: 334 },
]

const COLORS = ['#FF2163', '#FF991C', '#69B345']

export const CompanyGraph: React.FC<CompanyGraphProps> = ({
	points,
	height,
	width,
}) => {
	const dot = () => {
		let color = '#FF2163'
		if (points <= 333) {
			color = '#FF2163'
		} else if (points <= 666) {
			color = '#FF991C'
		} else {
			color = '#69B345'
		}

		const r = 6
		let cx = 0
		let cy = 0
		if (points <= 100) {
			cx = 8
			cy = 44
		} else if (points <= 200) {
			cx = 14
			cy = 30
		} else if (points <= 333) {
			cx = 22
			cy = 18
		} else if (points <= 400) {
			cx = 31
			cy = 14
		} else if (points <= 500) {
			cx = 50
			cy = 9
		} else if (points <= 666) {
			cx = 69
			cy = 14
		} else if (points <= 700) {
			cx = 70
			cy = 14
		} else if (points <= 800) {
			cx = 81
			cy = 22
		} else if (points <= 900) {
			cx = 87
			cy = 30
		} else {
			cx = 92
			cy = 44
		}

		return (
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill="#ffffff"
				stroke={color}
				strokeWidth="5"
			/>
		)
	}

	return (
		<Container graphWidth={width}>
			<PieChart width={width} height={height}>
				<Pie
					data={graphSet}
					cx="50%"
					cy="50%"
					startAngle={180}
					endAngle={0}
					innerRadius="85%"
					outerRadius="100%"
					fill="#8884d8"
					paddingAngle={5}
					cornerRadius="50%"
					dataKey="value"
				>
					{graphSet.map((entry, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				{dot()}
			</PieChart>
			<div className="points-container">
				<span className="points">{points}</span>
				<span className="points-label">Pontos</span>
			</div>
		</Container>
	)
}
