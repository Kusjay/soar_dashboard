'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { routes } from '../../components/sidebar-routes';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { usePathname } from 'next/navigation';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Pencil } from 'lucide-react';

const Page = () => {
	const pathname = usePathname();
	const [activeTab, setActiveTab] = useState('edit-profile');

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
								<div className='h-full bg-white'>
									<div className='flex flex-col h-full py-4'>
										<div className='flex items-center px-6 mb-14 mt-4'>
											<Image
												src='/assets/logo.svg'
												width={35}
												height={35}
												alt='Soar logo'
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

						<h2 className='text-xl font-bold'>Settings</h2>

						<Image
							src='/assets/user.svg'
							width={40}
							height={40}
							alt='user icon'
						/>
					</div>

					<div className='relative w-full'>
						<input
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
						<h2 className='text-2xl font-bold'>Settings</h2>
					</div>

					<div className='flex items-center space-x-2'>
						<div className='relative w-full max-w-xs'>
							<input
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
						/>
						<Image
							src='/assets/alert.svg'
							width={50}
							height={50}
							alt='alert icon'
							className='mr-2'
						/>
						<Image
							src='/assets/user.svg'
							width={50}
							height={50}
							alt='user icon'
						/>
					</div>
				</div>
			</div>
			<div className='ml-7 mr-7'>
				<Card className='p-6 bg-white'>
					{/* Custom Tabs */}
					<div className='flex border-b'>
						<button
							onClick={() => setActiveTab('edit-profile')}
							className={`pb-4 px-4 ${
								activeTab === 'edit-profile'
									? 'text-gray-900 border-b-2 border-gray-900 font-medium'
									: 'text-gray-500'
							}`}
						>
							Edit Profile
						</button>
						<button
							onClick={() => setActiveTab('preferences')}
							className={`pb-4 px-4 ${
								activeTab === 'preferences'
									? 'text-gray-900 border-b-2 border-gray-900 font-medium'
									: 'text-gray-500'
							}`}
						>
							Preferences
						</button>
						<button
							onClick={() => setActiveTab('security')}
							className={`pb-4 px-4 ${
								activeTab === 'security'
									? 'text-gray-900 border-b-2 border-gray-900 font-medium'
									: 'text-gray-500'
							}`}
						>
							Security
						</button>
					</div>

					{activeTab === 'edit-profile' && (
						<div className='mt-6'>
							<div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
								{/* Profile Image Column */}
								<div className='md:col-span-2'>
									<div className='relative w-24 h-24 mx-auto md:mx-0'>
										<Image
											src='/assets/user.svg'
											alt='user icon'
											className='rounded-full object-cover'
											fill
											style={{ width: '100%', height: '100%' }}
										/>
										<button className='absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg'>
											<Pencil className='w-4 h-4' />
										</button>
									</div>
								</div>

								{/* First Form Column */}
								<div className='md:col-span-5 space-y-4'>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Your Name</label>
										<Input defaultValue='Charlene Reed' className='h-12' />
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Email</label>
										<Input
											defaultValue='charlenereed@gmail.com'
											className='h-12'
										/>
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Date of Birth</label>
										<Input defaultValue='25 January 1990' className='h-12' />
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>
											Permanent Address
										</label>
										<Input
											defaultValue='San Jose, California, USA'
											className='h-12'
										/>
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Postal Code</label>
										<Input defaultValue='45962' className='h-12' />
									</div>
								</div>

								{/* Second Form Column */}
								<div className='md:col-span-5 space-y-4'>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>User Name</label>
										<Input defaultValue='Charlene Reed' className='h-12' />
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Password</label>
										<Input
											type='password'
											defaultValue='********'
											className='h-12'
										/>
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>
											Present Address
										</label>
										<Input
											defaultValue='San Jose, California, USA'
											className='h-12'
										/>
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>City</label>
										<Input defaultValue='San Jose' className='h-12' />
									</div>
									<div className='space-y-1.5'>
										<label className='text-sm font-medium'>Country</label>
										<Input defaultValue='USA' className='h-12' />
									</div>
								</div>
							</div>

							{/* Save Button */}
							<div className='flex justify-end mt-8'>
								<Button className='w-full md:w-auto px-8 h-12 bg-gray-900 hover:bg-gray-800'>
									Save
								</Button>
							</div>
						</div>
					)}
				</Card>
			</div>
		</div>
	);
};

export default Page;
