import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Table } from "@/common/components/table";
import { TableActions } from "@/common/components/table-actions";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { Route } from "@/routes/_app/clients";
import { ClientDetailsController } from "../../controllers/client-details-controller";
import type { ListClientsControllerChildrenProps } from "../../controllers/list-clients-controller";
import { ClientDetailsDialog } from "../client-details-dialog";

export function ClientsList({ fetchClients }: ListClientsControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });
	const [viewingClientId, setViewingClientId] = useState<string | null>(null);
	const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	function handleDetailsDialogChange(open: boolean) {
		setIsDetailsDialogOpen(open);

		if (!open) {
			setViewingClientId(null);
		}
	}

	return (
		<>
			<Table
				fetchData={fetchClients}
				headerData={[
					{ title: "Nome", className: "w-48" },
					{ title: "E-mail" },
					{ title: "Telefone" },
					{ title: "Criado há" },
					{ title: "" },
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
						<TableActions>
							<DropdownMenuItem
								onSelect={() => {
									setViewingClientId(client.id);
									setIsDetailsDialogOpen(true);
								}}
							>
								Detalhes
							</DropdownMenuItem>
						</TableActions>
					</TableRow>
				)}
			/>

			<ClientDetailsController clientId={viewingClientId}>
				{({ client, isFetchingClient }) => (
					<ClientDetailsDialog
						client={client}
						isFetchingClient={isFetchingClient}
						onOpenChange={handleDetailsDialogChange}
						open={isDetailsDialogOpen}
					/>
				)}
			</ClientDetailsController>
		</>
	);
}
