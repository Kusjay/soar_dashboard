'use client';

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

export const routes = [
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
