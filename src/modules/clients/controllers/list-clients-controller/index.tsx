import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { Route } from "@/routes/_app/clients";
import { fetchClients, generateContract } from "../../services";
import type {
	ClientListItemDTO,
	GenerateContractResponse,
} from "../../services/types";

export interface ListClientsControllerChildrenProps {
	fetchClients: UseQueryResult<Paginated<ClientListItemDTO>, unknown>;
	generateContractRequest: UseMutationResult<
		GenerateContractResponse,
		// biome-ignore lint/suspicious/noExplicitAny: axios error type requires 'any'
		AxiosError<unknown, any>,
		string,
		unknown
	>;
}

type ListClientsControllerProps =
	ChildrenController<ListClientsControllerChildrenProps>;

export function ListClientsController({
	children,
}: ListClientsControllerProps) {
	const { page } = Route.useSearch();

	const fetch = useQuery({
		queryKey: ["fetchClients", page],
		queryFn: () => fetchClients({ page }),
	});

	const generateContractRequest = useMutation({
		mutationFn: (clientId: string) => generateContract({ id: clientId }),
		onSuccess: () => {
			toast.success("Contrato gerado com sucesso");
		},
		onError: (error: AxiosError) => {
			const errorResponse = error.response?.data as ErrorResponse | undefined;

			toast.error("Erro ao gerar contrato", {
				description: errorResponse?.message,
			});
		},
	});

	return children({ fetchClients: fetch, generateContractRequest });
}
