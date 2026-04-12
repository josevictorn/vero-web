import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { Route } from "@/routes/_app/screening-flows";
import { fetchScreeningFlows } from "../../services";
import type { ScreeningFlowDTO } from "../../services/types";

export interface ListScreeningFlowsControllerChildrenProps {
	fetchScreeningFlows: UseQueryResult<Paginated<ScreeningFlowDTO>, unknown>;
}

type ListScreeningFlowsControllerProps =
	ChildrenController<ListScreeningFlowsControllerChildrenProps>;

export function ListScreeningFlowsController({
	children,
}: ListScreeningFlowsControllerProps) {
	const { page } = Route.useSearch();

	const fetch = useQuery({
		queryKey: ["fetchScreeningFlows", page],
		queryFn: () => fetchScreeningFlows({ page }),
	});

	return children({ fetchScreeningFlows: fetch });
}
