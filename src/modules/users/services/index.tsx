import request from "@/common/lib/axios";
import type { Account, FetchAccountsQuery } from "./types";

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
