const USER_ROLE = {
	ADMIN: "ADMIN",
	LAWYER: "LAWYER",
	ASSISTANT: "ASSISTANT",
	FINANCE: "FINANCE",
	CLIENT: "CLIENT",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface FetchAccountsQuery {
	page?: number | null;
}

export interface Account {
	createdAt: string;
	email: string;
	id: number;
	isActive: boolean;
	name: string;
	role: UserRole;
}
