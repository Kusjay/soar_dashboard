'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import {
	LayoutDashboard,
	CreditCard,
	PiggyBank,
	History,
	Settings,
	Users,
	Wallet,
	Construction,
	HandCoins,
} from 'lucide-react';
import Image from 'next/image';

const routes = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		href: '/',
	},
	{
		label: 'Transactions',
		icon: History,
		href: '/transactions',
	},
	{
		label: 'Accounts',
		icon: Users,
		href: '/accounts',
	},
	{
		label: 'Investments',
		icon: PiggyBank,
		href: '/investments',
	},
	{
		label: 'Credit Cards',
		icon: CreditCard,
		href: '/credit-cards',
	},
	{
		label: 'Loans',
		icon: Wallet,
		href: '/loans',
	},
	{
		label: 'Services',
		icon: Construction,
		href: '/services',
	},
	{
		label: 'My Privilages',
		icon: HandCoins,
		href: '/privilages',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		// <div className='h-full bg-gray-100'>
		<div className='h-full bg-white border-r border-gray-100'>
			<div className='flex flex-col h-full py-4'>
				<div className='flex content-center px-6 mb-14 mt-4'>
					<Image
						src='/assets/logo.svg'
						width={35}
						height={35}
						alt='Soar logo'
					/>
					<h1 className='text-2xl font-bold text-gray-900'>Soar Task</h1>
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
	);
}
