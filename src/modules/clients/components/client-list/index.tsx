import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Table } from "@/common/components/table";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { Route } from "@/routes/_app/clients";
import type { ListClientsControllerChildrenProps } from "../../controllers/list-clients-controller";

export function ClientsList({ fetchClients }: ListClientsControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	return (
		<Table
			fetchData={fetchClients}
			headerData={[
				{ title: "Nome", className: "w-48" },
				{ title: "E-mail" },
				{ title: "Telefone" },
				{ title: "Criado há" },
			]}
			paginator={{
				total: fetchClients.data?.meta.totalCount ?? 0,
				amountPerPage: fetchClients.data?.meta.perPage ?? 0,
				currentPage: fetchClients.data?.meta.currentPage ?? 1,
				onPageChange: handlePaginate,
			}}
			renderRow={(client) => (
				<TableRow key={client.id}>
					<TableCell>{client.name}</TableCell>
					<TableCell>{client.email}</TableCell>
					<TableCell>{client.cellphone}</TableCell>
					<TableCell>
						{formatDistanceToNow(client.created_at, {
							locale: ptBR,
							addSuffix: true,
						})}
					</TableCell>
				</TableRow>
			)}
		/>
	);
}
