'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Point,
	BubbleDataPoint,
} from 'chart.js';

// Dynamic import for Pie component
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
	ssr: false,
});

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to draw text inside slices
const drawLabelsPlugin = {
	id: 'drawLabels',
	afterDraw(chart: ChartJS) {
		const { ctx } = chart;
		const datasets = chart.data.datasets[0];
		const meta = chart.getDatasetMeta(0);

		datasets.data.forEach(
			(
				value: number | [number, number] | Point | BubbleDataPoint | null,
				index: number
			) => {
				if (typeof value === 'number') {
					const { x, y } = meta.data[index].tooltipPosition(true);
					const percentage = `${value}%`;
					const label = chart.data.labels
						? (chart.data.labels[index] as string)
						: '';

					ctx.save();
					ctx.fillStyle = 'white';
					ctx.font = 'bold 14px Arial';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';

					ctx.fillText(percentage, x, y - 10);
					ctx.fillText(label, x, y + 10);

					ctx.restore();
				}
			}
		);
	},
};

ChartJS.register(drawLabelsPlugin);

const PieChartComponent = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const data = {
		labels: ['Entertainment', 'Bill', 'Investment', 'Others'],
		datasets: [
			{
				data: [30, 15, 20, 35],
				backgroundColor: ['#2A2A72', '#FA8128', '#4D90FF', '#000000'],
				borderColor: '#FFFFFF',
				borderWidth: 2,
				offset: [20, 60, 0, 55],
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	};

	if (!isMounted) {
		return null; // Return null on server-side
	}

	return (
		<div className='w-full h-[300px] md:h-[400px] md:w-[400px]'>
			<Pie data={data} options={options} />
		</div>
	);
};

export default PieChartComponent;
