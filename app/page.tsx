'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, Menu, ChevronRight } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from '@/components/ui/sheet';
import { routes } from '@/components/sidebar-routes';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { WeeklyActivity } from '@/types/types';

// Dynamically import components with no SSR
const BarChartComponent = dynamic(() => import('@/components/barchart'), {
	ssr: false,
	loading: () => <div className='h-[400px] w-full bg-gray-100 animate-pulse' />,
});

const PieChartComponent = dynamic(() => import('@/components/piechart'), {
	ssr: false,
	loading: () => <div className='h-[400px] w-full bg-gray-100 animate-pulse' />,
});

const BalanceHistoryChart = dynamic(
	() => import('@/components/balancehistorychart'),
	{
		ssr: false,
		loading: () => (
			<div className='animate-pulse bg-gray-200 rounded-lg h-[245px] w-full' />
		),
	}
);

const recentTransactions = [
	{
		id: '1',
		type: 'Deposit from my Card',
		amount: -850,
		date: '28 January 2021',
		icon: '/assets/Group 313.svg',
	},
	{
		id: '2',
		type: 'Deposit Paypal',
		amount: 2500,
		date: '25 January 2021',
		icon: '/assets/Group 314.svg',
	},
	{
		id: '3',
		type: 'Jemi Wilson',
		amount: 5400,
		date: '21 January 2021',
		icon: '/assets/Group 315.svg',
	},
];

const weeklyActivity: WeeklyActivity[] = [
	{ day: 'Sat', deposit: 200, withdraw: 400 },
	{ day: 'Sun', deposit: 100, withdraw: 300 },
	{ day: 'Mon', deposit: 300, withdraw: 200 },
	{ day: 'Tue', deposit: 400, withdraw: 500 },
	{ day: 'Wed', deposit: 200, withdraw: 100 },
	{ day: 'Thu', deposit: 300, withdraw: 400 },
	{ day: 'Fri', deposit: 400, withdraw: 300 },
];

const Page = () => {
	const pathname = usePathname();

	return (
		<div className='min-h-screen bg-gray-100'>
			<div className='bg-white border-b border-gray-100 w-full px-4 md:px-8 py-6 mb-6'>
				{/* Mobile Header */}
				<div className='flex flex-col md:hidden gap-4'>
					<div className='flex items-center justify-between'>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Menu className='h-6 w-6' />
								</Button>
							</SheetTrigger>
							<SheetContent side='left' className='w-64 p-0'>
								<SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
								<div className='h-full bg-white'>
									<div className='flex flex-col h-full py-4'>
										<div className='flex items-center px-6 mb-14 mt-4'>
											<Image
												src='/assets/logo.svg'
												width={35}
												height={35}
												alt='Soar logo'
												priority
											/>
											<h1 className='text-2xl font-bold text-gray-900 ml-2'>
												Soar Task
											</h1>
										</div>
										<div className='space-y-1 px-3'>
											{routes.map((route) => (
												<Link
													key={route.href}
													href={route.href}
													className={cn(
														'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
														pathname === route.href
															? 'text-gray-900 bg-gray-200'
															: 'text-gray-500'
													)}
												>
													<div className='flex items-center flex-1'>
														<route.icon className={cn('h-5 w-5 mr-3')} />
														{route.label}
													</div>
												</Link>
											))}
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>

						<h2 className='text-xl font-bold'>Overview</h2>

						<Image
							src='/assets/user.svg'
							width={40}
							height={40}
							alt='user icon'
							priority
						/>
					</div>

					<div className='relative w-full'>
						<Input
							type='text'
							placeholder='Search for something'
							className='px-10 py-2 rounded-full border bg-bgColor border-bgColor h-12 w-full'
						/>
						<Search
							className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500'
							size={20}
						/>
					</div>
				</div>

				{/* Desktop Header */}
				<div className='hidden md:flex items-center justify-between'>
					<div className='flex items-center'>
						<h2 className='text-2xl font-bold'>Overview</h2>
					</div>

					<div className='flex items-center space-x-2'>
						<div className='relative w-full max-w-xs'>
							<Input
								type='text'
								placeholder='Search for something'
								className='px-10 py-2 rounded-full border bg-bgColor border-bgColor h-12 w-full'
							/>
							<Search
								className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500'
								size={20}
							/>
						</div>

						<Image
							src='/assets/settings.svg'
							width={50}
							height={50}
							alt='settings icon'
							className='mr-2'
							priority
						/>
						<Image
							src='/assets/alert.svg'
							width={50}
							height={50}
							alt='alert icon'
							className='mr-2'
							priority
						/>
						<Image
							src='/assets/user.svg'
							width={50}
							height={50}
							alt='user icon'
							priority
						/>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='px-8'>
				<Tabs defaultValue='overview' className='space-y-4'>
					<TabsContent value='overview' className='space-y-4'>
						<div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
							<div>
								<div className='font-medium text-xl mb-3'>My Cards</div>
								<Image
									src='/assets/black_card.svg'
									width={350}
									height={235}
									alt='black card logo'
									className='m-0 p-0'
									priority
								/>
							</div>
							<div>
								<div className='font-medium text-l ml-72 mb-4'>See All</div>
								<Image
									src='/assets/white_card.svg'
									width={350}
									height={235}
									alt='white card logo'
									className='m-0 p-0'
									priority
								/>
							</div>

							<div>
								<div className='font-medium text-xl mb-3'>
									Recent Transaction
								</div>
								<Card className='col-span-3'>
									<div className='p-6'>
										<div className='space-y-4'>
											{recentTransactions.map((transaction) => (
												<div
													key={transaction.id}
													className='flex items-center justify-between'
												>
													<div className='flex items-center space-x-4'>
														<Image
															src={transaction.icon}
															alt='transaction icon'
															width={50}
															height={50}
															priority
														/>
														<div>
															<div className='font-medium'>
																{transaction.type}
															</div>
															<div className='text-sm text-gray-500'>
																{transaction.date}
															</div>
														</div>
													</div>
													<div
														className={`font-medium ${
															transaction.amount > 0
																? 'text-green-600'
																: 'text-red-600'
														}`}
													>
														{transaction.amount > 0 ? '+' : ''}
														{transaction.amount}
													</div>
												</div>
											))}
										</div>
									</div>
								</Card>
							</div>
						</div>

						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
							<div className='col-span-4'>
								<h3 className='text-lg font-medium mb-4 mt-3'>
									Weekly Activity
								</h3>
								<Card>
									<div className='p-6'>
										<BarChartComponent />
									</div>
								</Card>
							</div>

							<div className='col-span-3'>
								<h3 className='text-lg font-medium mb-4 mt-3'>
									Expense Statistics
								</h3>
								<Card>
									<div className='p-6'>
										<PieChartComponent />
									</div>
								</Card>
							</div>
						</div>

						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
							<div className='col-span-3 mb-7'>
								<h3 className='text-lg font-medium mb-4 mt-3'>
									Quick Transfer
								</h3>
								<Card>
									<div className='pr-6 pl-6 pt-8 pb-8'>
										<div className='flex gap-7 justify-center items-center'>
											<div className='justify-items-center'>
												<Image
													src='/assets/ceo_img.svg'
													width={70}
													height={70}
													alt='user'
													className='mb-3'
												/>
												<h3 className='font-bold'>Livia Bator</h3>
												<h3 className='text-roleTitleColor font-bold'>CEO</h3>
											</div>

											<div className='justify-items-center'>
												<Image
													src='/assets/director_img.svg'
													width={70}
													height={70}
													alt='user'
													className='mb-3'
												/>
												<h3>Randy Press</h3>
												<h3 className='text-roleTitleColor'>Director</h3>
											</div>

											<div className='justify-items-center'>
												<Image
													src='/assets/designer_img.svg'
													width={70}
													height={70}
													alt='user'
													className='mb-3'
												/>
												<h3>Workman</h3>
												<h3 className='text-roleTitleColor'>Designer</h3>
											</div>

											<div>
												<Button className='bg-white hover:bg-white rounded-full w-12 h-12 flex items-center justify-center'>
													<ChevronRight color='#718EBF' />
												</Button>
											</div>
										</div>

										<div className='flex items-center justify-center mt-5'>
											<div className='text-roleTitleColor mr-12'>
												Write Amount
											</div>
											<div className='relative'>
												<Input
													placeholder='525.50'
													className='rounded-full bg-bgColor border-bgColor h-12 w-56'
												/>
												<Button className='absolute -bottom-0 left-1/2 flex items-center justify-center gap-2 rounded-full h-12 w-28'>
													<Image
														src='/assets/send.svg'
														width={20}
														height={20}
														alt='send'
													/>
													Send
												</Button>
											</div>
										</div>
									</div>
								</Card>
							</div>

							<div className='col-span-4 mb-7'>
								<h3 className='text-lg font-medium mb-4 mt-3'>
									Balance History
								</h3>
								<Card>
									<div className='p-6'>
										<BalanceHistoryChart data={weeklyActivity} />
									</div>
								</Card>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { Search, Menu, ChevronRight } from 'lucide-react';
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetTrigger,
// 	SheetTitle,
// } from '@/components/ui/sheet';
// import { routes } from '@/components/sidebar-routes';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation';
// import { Card } from '@/components/ui/card';
// import { Tabs, TabsContent } from '@/components/ui/tabs';
// import dynamic from 'next/dynamic';
// import PieChartComponent from '@/components/piechart';
// import { Input } from '@/components/ui/input';
// import {
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// } from 'recharts';
// import { WeeklyActivity } from '@/types/types';

// // Dynamically import BarChartComponent with no SSR
// const BarChartComponent = dynamic(() => import('@/components/barchart'), {
// 	ssr: false,
// });

// const Page = () => {
// 	const pathname = usePathname();
// 	const [isClient, setIsClient] = useState(false);

// 	useEffect(() => {
// 		setIsClient(true);
// 	}, []);

// 	const [recentTransactions] = useState([
// 		{
// 			id: '1',
// 			type: 'Deposit from my Card',
// 			amount: -850,
// 			date: '28 January 2021',
// 			icon: '/assets/Group 313.svg',
// 		},
// 		{
// 			id: '2',
// 			type: 'Deposit Paypal',
// 			amount: 2500,
// 			date: '25 January 2021',
// 			icon: '/assets/Group 314.svg',
// 		},
// 		{
// 			id: '3',
// 			type: 'Jemi Wilson',
// 			amount: 5400,
// 			date: '21 January 2021',
// 			icon: '/assets/Group 315.svg',
// 		},
// 	]);

// 	const weeklyActivity: WeeklyActivity[] = [
// 		{ day: 'Sat', deposit: 200, withdraw: 400 },
// 		{ day: 'Sun', deposit: 100, withdraw: 300 },
// 		{ day: 'Mon', deposit: 300, withdraw: 200 },
// 		{ day: 'Tue', deposit: 400, withdraw: 500 },
// 		{ day: 'Wed', deposit: 200, withdraw: 100 },
// 		{ day: 'Thu', deposit: 300, withdraw: 400 },
// 		{ day: 'Fri', deposit: 400, withdraw: 300 },
// 	];

// 	if (!isClient) {
// 		return null; // or a loading spinner
// 	}

// 	return (
// 		<div className='min-h-screen bg-gray-100'>
// 			<div className='bg-white border-b border-gray-100 w-full px-4 md:px-8 py-6 mb-6'>
// 				{/* Mobile Header */}
// 				<div className='flex flex-col md:hidden gap-4'>
// 					<div className='flex items-center justify-between'>
// 						<Sheet>
// 							<SheetTrigger asChild>
// 								<Button variant='ghost' size='icon'>
// 									<Menu className='h-6 w-6' />
// 								</Button>
// 							</SheetTrigger>
// 							<SheetContent side='left' className='w-64 p-0'>
// 								<SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
// 								<div className='h-full bg-white'>
// 									<div className='flex flex-col h-full py-4'>
// 										<div className='flex items-center px-6 mb-14 mt-4'>
// 											<Image
// 												src='/assets/logo.svg'
// 												width={35}
// 												height={35}
// 												alt='Soar logo'
// 												priority
// 											/>
// 											<h1 className='text-2xl font-bold text-gray-900 ml-2'>
// 												Soar Task
// 											</h1>
// 										</div>
// 										<div className='space-y-1 px-3'>
// 											{routes.map((route) => (
// 												<Link
// 													key={route.href}
// 													href={route.href}
// 													className={cn(
// 														'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
// 														pathname === route.href
// 															? 'text-gray-900 bg-gray-200'
// 															: 'text-gray-500'
// 													)}
// 												>
// 													<div className='flex items-center flex-1'>
// 														<route.icon className={cn('h-5 w-5 mr-3')} />
// 														{route.label}
// 													</div>
// 												</Link>
// 											))}
// 										</div>
// 									</div>
// 								</div>
// 							</SheetContent>
// 						</Sheet>

// 						<h2 className='text-xl font-bold'>Overview</h2>

// 						<Image
// 							src='/assets/user.svg'
// 							width={40}
// 							height={40}
// 							alt='user icon'
// 							priority
// 						/>
// 					</div>

// 					<div className='relative w-full'>
// 						<input
// 							type='text'
// 							placeholder='Search for something'
// 							className='px-10 py-2 rounded-full border bg-bgColor border-bgColor h-12 w-full'
// 						/>
// 						<Search
// 							className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500'
// 							size={20}
// 						/>
// 					</div>
// 				</div>

// 				{/* Desktop Header */}
// 				<div className='hidden md:flex items-center justify-between'>
// 					<div className='flex items-center'>
// 						<h2 className='text-2xl font-bold'>Overview</h2>
// 					</div>

// 					<div className='flex items-center space-x-2'>
// 						<div className='relative w-full max-w-xs'>
// 							<input
// 								type='text'
// 								placeholder='Search for something'
// 								className='px-10 py-2 rounded-full border bg-bgColor border-bgColor h-12 w-full'
// 							/>
// 							<Search
// 								className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500'
// 								size={20}
// 							/>
// 						</div>

// 						<Image
// 							src='/assets/settings.svg'
// 							width={50}
// 							height={50}
// 							alt='settings icon'
// 							className='mr-2'
// 							priority
// 						/>
// 						<Image
// 							src='/assets/alert.svg'
// 							width={50}
// 							height={50}
// 							alt='alert icon'
// 							className='mr-2'
// 							priority
// 						/>
// 						<Image
// 							src='/assets/user.svg'
// 							width={50}
// 							height={50}
// 							alt='user icon'
// 							priority
// 						/>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Main Content */}
// 			<div className='px-8'>
// 				<Tabs defaultValue='overview' className='space-y-4'>
// 					<TabsContent value='overview' className='space-y-4'>
// 						<div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
// 							<div>
// 								<div className='font-medium text-xl mb-3'>My Cards</div>
// 								<Image
// 									src='/assets/black_card.svg'
// 									width={350}
// 									height={235}
// 									alt='black card logo'
// 									className='m-0 p-0'
// 									priority
// 								/>
// 							</div>
// 							<div>
// 								<div className='font-medium text-l ml-72 mb-4'>See All</div>
// 								<Image
// 									src='/assets/white_card.svg'
// 									width={350}
// 									height={235}
// 									alt='white card logo'
// 									className='m-0 p-0'
// 									priority
// 								/>
// 							</div>

// 							<div>
// 								<div className='font-medium text-xl mb-3'>
// 									Recent Transaction
// 								</div>
// 								<Card className='col-span-3'>
// 									<div className='p-6'>
// 										<div className='space-y-4'>
// 											{recentTransactions.map((transaction) => (
// 												<div
// 													key={transaction.id}
// 													className='flex items-center justify-between'
// 												>
// 													<div className='flex items-center space-x-4'>
// 														<Image
// 															src={transaction.icon}
// 															alt='transaction icon'
// 															width={50}
// 															height={50}
// 															priority
// 														/>
// 														<div>
// 															<div className='font-medium'>
// 																{transaction.type}
// 															</div>
// 															<div className='text-sm text-gray-500'>
// 																{transaction.date}
// 															</div>
// 														</div>
// 													</div>
// 													<div
// 														className={`font-medium ${
// 															transaction.amount > 0
// 																? 'text-green-600'
// 																: 'text-red-600'
// 														}`}
// 													>
// 														{transaction.amount > 0 ? '+' : ''}
// 														{transaction.amount}
// 													</div>
// 												</div>
// 											))}
// 										</div>
// 									</div>
// 								</Card>
// 							</div>
// 						</div>

// 						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
// 							<div className='col-span-4'>
// 								<h3 className='text-lg font-medium mb-4 mt-3'>
// 									Weekly Activity
// 								</h3>
// 								<Card className='hidden md:block'>
// 									<div className='p-6'>
// 										<BarChartComponent />
// 									</div>
// 								</Card>
// 								<div className='md:hidden'>
// 									<BarChartComponent />
// 								</div>
// 							</div>

// 							<div className='col-span-3'>
// 								<h3 className='text-lg font-medium mb-4 mt-3'>
// 									Expense Statistics
// 								</h3>
// 								<Card className='hidden md:block'>
// 									<div className='p-6'>
// 										<PieChartComponent />
// 									</div>
// 								</Card>
// 								<div className='md:hidden'>
// 									<PieChartComponent />
// 								</div>
// 							</div>
// 						</div>

// 						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
// 							<div className='col-span-3 mb-7'>
// 								<h3 className='text-lg font-medium mb-4 mt-3'>
// 									Quick Transfer
// 								</h3>
// 								<Card className='hidden md:block'>
// 									<div className='pr-6 pl-6 pt-8 pb-8'>
// 										<div className='flex gap-7 justify-center items-center'>
// 											<div className='justify-items-center'>
// 												<Image
// 													src='/assets/ceo_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3 className='font-bold'>Livia Bator</h3>
// 												<h3 className='text-roleTitleColor font-bold'>CEO</h3>
// 											</div>

// 											<div className='justify-items-center'>
// 												<Image
// 													src='/assets/director_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3>Randy Press</h3>
// 												<h3 className='text-roleTitleColor'>Director</h3>
// 											</div>

// 											<div className='justify-items-center'>
// 												<Image
// 													src='/assets/designer_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3>Workman</h3>
// 												<h3 className='text-roleTitleColor'>Designer</h3>
// 											</div>

// 											<div className=''>
// 												<Button className='bg-white hover:bg-white rounded-full w-12 h-12 flex items-center justify-center'>
// 													<ChevronRight color='#718EBF' />
// 												</Button>
// 											</div>
// 										</div>

// 										<div className='flex items-center justify-center mt-5 relative'>
// 											<div className='text-roleTitleColor mr-12'>
// 												Write Amount
// 											</div>
// 											<div className='relative'>
// 												<Input
// 													placeholder='525.50'
// 													className='rounded-full bg-bgColor border-bgColor h-12 w-56'
// 												/>
// 												<Button className='absolute -bottom-0 left-1/2  flex items-center justify-center gap-2 rounded-full h-12 w-28'>
// 													<Image
// 														src='/assets/send.svg'
// 														width={20}
// 														height={20}
// 														alt='send'
// 													/>
// 													Send
// 												</Button>
// 											</div>
// 										</div>
// 									</div>
// 								</Card>
// 								<div className='md:hidden'>
// 									<div className='pr-6 pl-0 pt-8 pb-8'>
// 										{/* <div className='flex gap-7 justify-center items-center'> */}
// 										<div className='flex'>
// 											<div className='justify-items-center mr-4'>
// 												<Image
// 													src='/assets/ceo_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3 className='font-bold'>Livia Bator</h3>
// 												<h3 className='text-roleTitleColor font-bold'>CEO</h3>
// 											</div>

// 											<div className='justify-items-center mr-4'>
// 												<Image
// 													src='/assets/director_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3>Randy Press</h3>
// 												<h3 className='text-roleTitleColor'>Director</h3>
// 											</div>

// 											<div className='justify-items-center mr-3'>
// 												<Image
// 													src='/assets/designer_img.svg'
// 													width={70}
// 													height={70}
// 													alt='user'
// 													className='mb-3'
// 												/>
// 												<h3>Workman</h3>
// 												<h3 className='text-roleTitleColor'>Designer</h3>
// 											</div>

// 											<div className='mt-7'>
// 												<Button className='bg-white hover:bg-white rounded-full w-12 h-12 flex items-center justify-center'>
// 													<ChevronRight color='#718EBF' />
// 												</Button>
// 											</div>
// 										</div>

// 										<div className='flex items-center justify-center mt-5 relative'>
// 											<div className='text-roleTitleColor mr-5 text-sm'>
// 												Write Amount
// 											</div>
// 											<div className='relative'>
// 												<Input
// 													placeholder='525.50'
// 													className='rounded-full bg-bgColor border-bgColor h-12 w-56'
// 												/>
// 												<Button className='absolute -bottom-0 left-1/2  flex items-center justify-center gap-2 rounded-full h-12 w-28'>
// 													<Image
// 														src='/assets/send.svg'
// 														width={20}
// 														height={20}
// 														alt='send'
// 													/>
// 													Send
// 												</Button>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>

// 							<div className='col-span-4 mb-7'>
// 								<h3 className='text-lg font-medium mb-4 mt-3'>
// 									Balance History
// 								</h3>
// 								<Card className='hidden md:block'>
// 									<div className='pt-2 pb-2 pr-2 pl-2'>
// 										<LineChart
// 											width={600}
// 											height={245}
// 											data={weeklyActivity}
// 											margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// 										>
// 											<CartesianGrid strokeDasharray='3 3' />
// 											<XAxis dataKey='day' />
// 											<YAxis />
// 											<Tooltip />
// 											<Line
// 												type='monotone'
// 												dataKey='deposit'
// 												stroke='#8884d8'
// 											/>
// 											<Line
// 												type='monotone'
// 												dataKey='withdraw'
// 												stroke='#82ca9d'
// 											/>
// 										</LineChart>
// 									</div>
// 								</Card>

// 								<div className='md:hidden'>
// 									<div className='pt-2 pb-2 pr-0 pl-0'>
// 										<LineChart
// 											width={400}
// 											height={245}
// 											data={weeklyActivity}
// 											margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
// 										>
// 											<CartesianGrid strokeDasharray='3 3' />
// 											<XAxis dataKey='day' />
// 											<YAxis />
// 											<Tooltip />
// 											<Line
// 												type='monotone'
// 												dataKey='deposit'
// 												stroke='#8884d8'
// 											/>
// 											<Line
// 												type='monotone'
// 												dataKey='withdraw'
// 												stroke='#82ca9d'
// 											/>
// 										</LineChart>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</TabsContent>
// 				</Tabs>
// 			</div>
// 		</div>
// 	);
// };

// export default Page;
