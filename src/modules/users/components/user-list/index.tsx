import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Table } from "@/common/components/table";
import { TableActions } from "@/common/components/table-actions";
import { Badge } from "@/common/components/ui/badge";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { cn } from "@/common/lib/utils";
import { Route } from "@/routes/_app/users";
import { UserEditDialog } from "../user-edit-dialog";
import { EditUserController } from "../../controllers/edit-user-controller";
import type { ListUsersControllerChildrenProps } from "../../controllers/list-users-controller";
import { userRoleBadgeClassMap, userRoleMap } from "../../utils";

export function UsersList({ fetchAccounts }: ListUsersControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });
	const [editingUserId, setEditingUserId] = useState<number | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	function handleEditDialogChange(open: boolean) {
		setIsEditDialogOpen(open);

		if (!open) {
			setEditingUserId(null);
		}
	}

	return (
		<>
			<Table
				fetchData={fetchAccounts}
				headerData={[
					{ title: "Nome", className: "w-48" },
					{ title: "E-mail" },
					{ title: "Perfil" },
					{ title: "Criado há" },
					{ title: "" },
				]}
				paginator={{
					total: fetchAccounts.data?.meta.totalCount ?? 0,
					amountPerPage: fetchAccounts.data?.meta.perPage ?? 0,
					currentPage: fetchAccounts.data?.meta.currentPage ?? 1,
					onPageChange: handlePaginate,
				}}
				renderRow={(accounts) => (
					<TableRow key={accounts.id}>
						<TableCell>{accounts.name}</TableCell>
						<TableCell>{accounts.email}</TableCell>
						<TableCell>
							<Badge
								className={cn("px-1.5", userRoleBadgeClassMap[accounts.role])}
								variant="outline"
							>
								{userRoleMap[accounts.role]}
							</Badge>
						</TableCell>
						<TableCell>
							{formatDistanceToNow(accounts.created_at, {
								locale: ptBR,
								addSuffix: true,
							})}
						</TableCell>
						<TableActions>
							<DropdownMenuItem
								onSelect={() => {
									setEditingUserId(accounts.id);
									setIsEditDialogOpen(true);
								}}
							>
								Editar
							</DropdownMenuItem>
						</TableActions>
					</TableRow>
				)}
			/>

			<EditUserController userId={editingUserId}>
				{(props) => (
					<UserEditDialog
						onOpenChange={handleEditDialogChange}
						open={isEditDialogOpen}
						{...props}
					/>
				)}
			</EditUserController>
		</>
	);
}
