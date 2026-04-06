import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Table } from "@/common/components/table";
import { Badge } from "@/common/components/ui/badge";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { cn } from "@/common/lib/utils";
import { Route } from "@/routes/_app/users";
import type { ListUsersControllerChildrenProps } from "../../controllers/list-users-controller";
import { userRoleBadgeClassMap, userRoleMap } from "../../utils";
import { UserStatus } from "./user-status";

export function UsersList({ fetchAccounts }: ListUsersControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	return (
		<Table
			fetchData={fetchAccounts}
			headerData={[
				{ title: "Nome", className: "w-48" },
				{ title: "E-mail" },
				{ title: "Perfil" },
				{ title: "Status" },
				{ title: "Criado há" },
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
						<UserStatus isActive={accounts.isActive} />
					</TableCell>
					<TableCell>
						{formatDistanceToNow(accounts.createdAt, {
							locale: ptBR,
							addSuffix: true,
						})}
					</TableCell>
				</TableRow>
			)}
		/>
	);
}
