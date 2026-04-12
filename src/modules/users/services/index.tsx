import request from "@/common/lib/axios";
import type {
	Account,
	CreateAccountBody,
	FetchAccountsQuery,
	UpdateUserBody,
} from "./types";

export async function fetchAccounts({ page }: FetchAccountsQuery) {
	const response = await request<Paginated<Account>>({
		method: "GET",
		url: "/users",
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

export async function updateUser({
	id,
	name,
	email,
	password,
	role,
}: UpdateUserBody) {
	const response = await request<Account>({
		method: "PATCH",
		url: `/users/${id}`,
		data: {
			name,
			email,
			password,
			role,
		},
	});

	return response.data;
}

export async function getUserById(id: number) {
	const response = await request<Account>({
		method: "GET",
		url: `/users/${id}`,
	});

	return response.data;
}
