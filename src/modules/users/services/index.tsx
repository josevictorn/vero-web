import request from "@/common/lib/axios";
import type { Account, CreateAccountBody, FetchAccountsQuery } from "./types";

export async function fetchAccounts({ page }: FetchAccountsQuery) {
	const response = await request<Paginated<Account>>({
		method: "GET",
		url: "/accounts",
		params: {
			page,
		},
	});

	return response.data;
}

export async function createAccount({
	name,
	email,
	password,
	role,
}: CreateAccountBody) {
	const response = await request<Account>({
		method: "POST",
		url: "/users",
		data: {
			name,
			email,
			password,
			role,
		},
	});

	return response.data;
}
