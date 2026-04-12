import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Table } from "@/common/components/table";
import { TableActions } from "@/common/components/table-actions";
import { DropdownMenuItem } from "@/common/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/common/components/ui/table";
import { Route } from "@/routes/_app/screening-flows";
import { DeleteScreeningFlowController } from "../../controllers/delete-screening-flow-controller";
import { EditScreeningFlowController } from "../../controllers/edit-screening-flow-controller";
import type { ListScreeningFlowsControllerChildrenProps } from "../../controllers/list-screening-flows-controller";
import type { JsonValue } from "../../services/types";
import { ScreeningFlowDeleteDialog } from "../screening-flow-delete-dialog";
import { ScreeningFlowEditDialog } from "../screening-flow-edit-dialog";

function getQuestionsDescription(questions: JsonValue) {
	if (Array.isArray(questions)) {
		return `${questions.length} item(ns)`;
	}

	if (questions !== null && typeof questions === "object") {
		return `${Object.keys(questions).length} chave(s)`;
	}

	return String(questions);
}

export function ScreeningFlowsList({
	fetchScreeningFlows,
}: ListScreeningFlowsControllerChildrenProps) {
	const navigate = useNavigate({ from: Route.fullPath });
	const [editingScreeningFlowId, setEditingScreeningFlowId] = useState<
		string | null
	>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [deletingScreeningFlowId, setDeletingScreeningFlowId] = useState<
		string | null
	>(null);
	const [deletingScreeningFlowName, setDeletingScreeningFlowName] = useState<
		string | undefined
	>();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	function handlePaginate(pageIndex: number) {
		navigate({ search: (prev) => ({ ...prev, page: pageIndex }) });
	}

	function handleEditDialogChange(open: boolean) {
		setIsEditDialogOpen(open);

		if (!open) {
			setEditingScreeningFlowId(null);
		}
	}

	function handleDeleteDialogChange(open: boolean) {
		setIsDeleteDialogOpen(open);

		if (!open) {
			setDeletingScreeningFlowId(null);
			setDeletingScreeningFlowName(undefined);
		}
	}

	return (
		<>
			<Table
				fetchData={fetchScreeningFlows}
				headerData={[
					{ title: "Tipo de caso", className: "w-48" },
					{ title: "Question" },
					{ title: "Criado há" },
					{ title: "" },
				]}
				paginator={{
					total: fetchScreeningFlows.data?.meta.totalCount ?? 0,
					amountPerPage: fetchScreeningFlows.data?.meta.perPage ?? 0,
					currentPage: fetchScreeningFlows.data?.meta.currentPage ?? 1,
					onPageChange: handlePaginate,
				}}
				renderRow={(screeningFlow) => (
					<TableRow key={screeningFlow.id}>
						<TableCell>{screeningFlow.case_type}</TableCell>
						<TableCell>
							{getQuestionsDescription(screeningFlow.questions)}
						</TableCell>
						<TableCell>
							{formatDistanceToNow(screeningFlow.created_at, {
								locale: ptBR,
								addSuffix: true,
							})}
						</TableCell>
						<TableActions>
							<DropdownMenuItem
								onSelect={() => {
									setEditingScreeningFlowId(screeningFlow.id);
									setIsEditDialogOpen(true);
								}}
							>
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-destructive focus:text-destructive"
								onSelect={() => {
									setDeletingScreeningFlowId(screeningFlow.id);
									setDeletingScreeningFlowName(screeningFlow.case_type);
									setIsDeleteDialogOpen(true);
								}}
							>
								Remover
							</DropdownMenuItem>
						</TableActions>
					</TableRow>
				)}
			/>

			<EditScreeningFlowController screeningFlowId={editingScreeningFlowId}>
				{(props) => (
					<ScreeningFlowEditDialog
						onOpenChange={handleEditDialogChange}
						open={isEditDialogOpen}
						{...props}
					/>
				)}
			</EditScreeningFlowController>

			<DeleteScreeningFlowController screeningFlowId={deletingScreeningFlowId}>
				{({ submit, isPending }) => (
					<ScreeningFlowDeleteDialog
						isPending={isPending}
						onConfirm={submit}
						onOpenChange={handleDeleteDialogChange}
						open={isDeleteDialogOpen}
						screeningFlowName={deletingScreeningFlowName}
					/>
				)}
			</DeleteScreeningFlowController>
		</>
	);
}
