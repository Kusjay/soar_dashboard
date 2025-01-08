'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { WeeklyActivity } from '@/types/types';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

interface BalanceHistoryChartProps {
	data: WeeklyActivity[];
}

const BalanceHistoryChart = ({ data }: BalanceHistoryChartProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div
				className='animate-pulse bg-gray-200 rounded-lg'
				style={{ height: 245, width: '100%' }}
			/>
		);
	}

	return (
		<div className='w-full h-[245px]'>
			<ResponsiveContainer width='100%' height='100%'>
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='day' tick={{ fontSize: 12 }} />
					<YAxis tick={{ fontSize: 12 }} />
					<Tooltip />
					<Line
						type='monotone'
						dataKey='deposit'
						stroke='#8884d8'
						strokeWidth={2}
						dot={{ strokeWidth: 2 }}
					/>
					<Line
						type='monotone'
						dataKey='withdraw'
						stroke='#82ca9d'
						strokeWidth={2}
						dot={{ strokeWidth: 2 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

// Only export the component wrapped in dynamic import
export default dynamic(() => Promise.resolve(BalanceHistoryChart), {
	ssr: false,
});
