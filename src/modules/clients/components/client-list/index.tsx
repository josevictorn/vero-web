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
import { DeleteClientController } from "../../controllers/delete-client-controller";
import { EditClientController } from "../../controllers/edit-client-controller";
import type { ListClientsControllerChildrenProps } from "../../controllers/list-clients-controller";
import { ClientDeleteDialog } from "../client-delete-dialog";
import { ClientDetailsDialog } from "../client-details-dialog";
import { ClientEditDialog } from "../client-edit-dialog";

export function ClientsList({
	fetchClients,
}: ListClientsControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });
	const [viewingClientId, setViewingClientId] = useState<string | null>(null);
	const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
	const [editingClientId, setEditingClientId] = useState<string | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
	const [deletingClientName, setDeletingClientName] = useState<
		string | undefined
	>();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	function handleDetailsDialogChange(open: boolean) {
		setIsDetailsDialogOpen(open);

		if (!open) {
			setViewingClientId(null);
		}
	}

	function handleEditDialogChange(open: boolean) {
		setIsEditDialogOpen(open);

		if (!open) {
			setEditingClientId(null);
		}
	}

	function handleDeleteDialogChange(open: boolean) {
		setIsDeleteDialogOpen(open);

		if (!open) {
			setDeletingClientId(null);
			setDeletingClientName(undefined);
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
							<DropdownMenuItem
								onSelect={() => {
									setEditingClientId(client.id);
									setIsEditDialogOpen(true);
								}}
							>
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-destructive focus:text-destructive"
								onSelect={() => {
									setDeletingClientId(client.id);
									setDeletingClientName(client.name);
									setIsDeleteDialogOpen(true);
								}}
							>
								Remover
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

			<EditClientController clientId={editingClientId}>
				{(props) => (
					<ClientEditDialog
						onOpenChange={handleEditDialogChange}
						open={isEditDialogOpen}
						{...props}
					/>
				)}
			</EditClientController>

			<DeleteClientController clientId={deletingClientId}>
				{({ isPending, submit }) => (
					<ClientDeleteDialog
						clientName={deletingClientName}
						isPending={isPending}
						onConfirm={submit}
						onOpenChange={handleDeleteDialogChange}
						open={isDeleteDialogOpen}
					/>
				)}
			</DeleteClientController>
		</>
	);
}
