import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../../services";
import type { ClientDTO } from "../../services/types";

export interface ClientDetailsControllerChildrenProps {
	client?: ClientDTO;
	isFetchingClient: boolean;
}

interface ClientDetailsControllerProps
	extends ChildrenController<ClientDetailsControllerChildrenProps> {
	clientId: string | null;
}

export function ClientDetailsController({
	children,
	clientId,
}: ClientDetailsControllerProps) {
	const getClient = useQuery({
		queryKey: ["client", clientId],
		queryFn: () => getClientById({ id: clientId ?? "" }),
		enabled: clientId !== null,
	});

	return children({
		client: getClient.data,
		isFetchingClient: getClient.isPending,
	});
}
