import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { Route } from "@/routes/_app/users";
import { fetchAccounts } from "../../services";
import type { Account } from "../../services/types";

export interface ListUsersControllerChildrenProps {
	fetchAccounts: UseQueryResult<Paginated<Account>, unknown>;
}

type ListUsersControllerProps =
	ChildrenController<ListUsersControllerChildrenProps>;

export function ListUsersController({ children }: ListUsersControllerProps) {
	const { page } = Route.useSearch();

	const fetch = useQuery({
		queryKey: ["fetchAccounts"],
		queryFn: () => fetchAccounts({ page }),
	});

	return children({ fetchAccounts: fetch });
}
