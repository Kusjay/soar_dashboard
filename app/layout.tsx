import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from '../components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='flex min-h-screen bg-white'>
					<div className='hidden md:fixed md:block inset-y-0 z-50 w-64'>
						<Sidebar />
					</div>
					<main className='w-full md:pl-64'>
						<div className='h-full'>{children}</div>
					</main>
				</div>
			</body>
		</html>
	);
}
