import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Table } from "@/common/components/table";
import { TableActions } from "@/common/components/table-actions";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { Route } from "@/routes/_app/leads";
import { DeleteLeadController } from "../../controllers/delete-lead-controller";
import { EditLeadController } from "../../controllers/edit-lead-controller";
import type { ListLeadsControllerChildrenProps } from "../../controllers/list-leads-controller";
import { LeadDeleteDialog } from "../lead-delete-dialog";
import { LeadEditDialog } from "../lead-edit-dialog";

export function LeadsList({ fetchLeads }: ListLeadsControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });
	const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
	const [deletingLeadName, setDeletingLeadName] = useState<
		string | undefined
	>();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	function handleEditDialogChange(open: boolean) {
		setIsEditDialogOpen(open);

		if (!open) {
			setEditingLeadId(null);
		}
	}

	function handleDeleteDialogChange(open: boolean) {
		setIsDeleteDialogOpen(open);

		if (!open) {
			setDeletingLeadId(null);
			setDeletingLeadName(undefined);
		}
	}

	return (
		<>
			<Table
				fetchData={fetchLeads}
				headerData={[
					{ title: "Nome", className: "w-48" },
					{ title: "E-mail" },
					{ title: "Telefone" },
					{ title: "Criado há" },
					{ title: "" },
				]}
				paginator={{
					total: fetchLeads.data?.meta.totalCount ?? 0,
					amountPerPage: fetchLeads.data?.meta.perPage ?? 0,
					currentPage: fetchLeads.data?.meta.currentPage ?? 1,
					onPageChange: handlePaginate,
				}}
				renderRow={(lead) => (
					<TableRow key={lead.id}>
						<TableCell>{lead.name}</TableCell>
						<TableCell>{lead.email}</TableCell>
						<TableCell>{lead.cellphone}</TableCell>
						<TableCell>
							{formatDistanceToNow(lead.created_at, {
								locale: ptBR,
								addSuffix: true,
							})}
						</TableCell>
						<TableActions>
							<DropdownMenuItem
								onSelect={() => {
									setEditingLeadId(lead.id);
									setIsEditDialogOpen(true);
								}}
							>
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-destructive focus:text-destructive"
								onSelect={() => {
									setDeletingLeadId(lead.id);
									setDeletingLeadName(lead.name);
									setIsDeleteDialogOpen(true);
								}}
							>
								Remover
							</DropdownMenuItem>
						</TableActions>
					</TableRow>
				)}
			/>

			<EditLeadController leadId={editingLeadId}>
				{(props) => (
					<LeadEditDialog
						onOpenChange={handleEditDialogChange}
						open={isEditDialogOpen}
						{...props}
					/>
				)}
			</EditLeadController>

			<DeleteLeadController leadId={deletingLeadId}>
				{({ isPending, submit }) => (
					<LeadDeleteDialog
						isPending={isPending}
						leadName={deletingLeadName}
						onConfirm={submit}
						onOpenChange={handleDeleteDialogChange}
						open={isDeleteDialogOpen}
					/>
				)}
			</DeleteLeadController>
		</>
	);
}
