import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { Route } from "@/routes/_app/leads";
import { fetchLeads } from "../../services";
import type { LeadDTO } from "../../services/types";

export interface ListLeadsControllerChildrenProps {
	fetchLeads: UseQueryResult<Paginated<LeadDTO>, unknown>;
}

type ListLeadsControllerProps =
	ChildrenController<ListLeadsControllerChildrenProps>;

export function ListLeadsController({ children }: ListLeadsControllerProps) {
	const { page } = Route.useSearch();

	const fetch = useQuery({
		queryKey: ["fetchLeads", page],
		queryFn: () => fetchLeads({ page }),
	});

	return children({ fetchLeads: fetch });
}
