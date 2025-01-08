'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Dynamically import BarChart with no SSR
const BarChart = dynamic(
	() => import('@mui/x-charts/BarChart').then((mod) => mod.BarChart),
	{ ssr: false }
);

const highlightScope = {
	highlight: 'series',
	fade: 'global',
} as const;

const series = [
	{
		label: 'Withdraw',
		data: [320, 280, 450, 380, 290, 420, 350],
		color: '#000000',
	},
	{
		label: 'Deposit',
		data: [400, 350, 480, 420, 380, 450, 390],
		color: '#396AFF',
	},
].map((s) => ({ ...s, highlightScope }));

export default function BarChartComponent() {
	const [isMounted, setIsMounted] = useState(false);
	const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Box className='w-full'>
			{isMounted && (
				<BarChart
					height={400}
					xAxis={[
						{
							scaleType: 'band',
							data: days,
						},
					]}
					yAxis={[
						{
							min: 0,
							max: 500,
						},
					]}
					series={series}
					slotProps={{
						bar: {
							rx: 13,
							ry: 13,
						},
					}}
				/>
			)}
		</Box>
	);
}
