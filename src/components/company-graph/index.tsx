import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { Container } from './styles'

type CompanyGraphProps = {
	points: number
	size: 'small' | 'medium' | 'large'
}

const graphSet = [
	{ name: 'Perigo', value: 333 },
	{ name: 'Atenção', value: 334 },
	{ name: 'Ideal', value: 333 },
]

const COLORS = ['#FF2163', '#FF991C', '#69B345']

export const CompanyGraph: React.FC<CompanyGraphProps> = ({ points, size }) => {
	const graphSizeInPx = (() => {
		switch (size) {
			case 'small':
				return 100
			case 'medium':
				return 200
			case 'large':
				return 300
			default:
				return 100
		}
	})()
	return (
		<Container graphWidth={graphSizeInPx} size={size}>
			<PieChart width={graphSizeInPx} height={graphSizeInPx}>
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
					<Cell fill="#FF2163" enableBackground="#8884d8" fillRule="evenodd" />
					<Cell fill="#FF991C" enableBackground="#8884d8" />
					<Cell fill="#69B345" enableBackground="#8884d8" />
				</Pie>
				{/* {dot()} */}
			</PieChart>
			<div className="points-container">
				<span className="points">{points}</span>
				<span className="points-label">Pontos</span>
			</div>
		</Container>
	)
}
