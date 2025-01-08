export interface Transaction {
	id: string;
	type: string;
	amount: number;
	date: string;
	icon?: string;
}

export interface CardDetails {
	balance: number;
	cardHolder: string;
	validThru: string;
	cardNumber: string;
}

export interface QuickTransferUser {
	id: string;
	name: string;
	role: string;
	avatar: string;
}

export interface ExpenseStatistic {
	category: string;
	percentage: number;
	color: string;
}

export interface WeeklyActivity {
	day: string;
	deposit: number;
	withdraw: number;
}

export interface BalanceHistory {
	date: string;
	amount: number;
}
