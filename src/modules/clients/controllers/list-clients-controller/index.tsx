import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { Route } from "@/routes/_app/clients";
import { fetchClients } from "../../services";
import type { ClientListItemDTO } from "../../services/types";

export interface ListClientsControllerChildrenProps {
	fetchClients: UseQueryResult<Paginated<ClientListItemDTO>, unknown>;
}

type ListClientsControllerProps =
	ChildrenController<ListClientsControllerChildrenProps>;

export function ListClientsController({ children }: ListClientsControllerProps) {
	const { page } = Route.useSearch();

	const fetch = useQuery({
		queryKey: ["fetchClients", page],
		queryFn: () => fetchClients({ page }),
	});

	return children({ fetchClients: fetch });
}
