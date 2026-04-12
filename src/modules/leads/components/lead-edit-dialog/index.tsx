import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/common/components/ui/drawer";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useMediaQuery } from "@/common/hooks/use-media-query";
import type { EditLeadBody, LeadDTO } from "../../services/types";
import { LeadCreateForm } from "../lead-create-form";

type LeadEditDialogProps = BaseFormProps<
	Omit<EditLeadBody, "workspaceId">,
	LeadDTO
> & {
	isFetchingLead: boolean;
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function LeadEditDialog({
	open,
	onOpenChange,
	submit,
	initialValues,
	isPending,
	isFetchingLead,
}: LeadEditDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleUpdateLead = async (data: Omit<EditLeadBody, "workspaceId">) => {
		if (!initialValues) {
			return;
		}

		await submit(data);
		onOpenChange(false);
	};

	const content = isFetchingLead ? (
		<div className="space-y-4">
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
		</div>
	) : (
		<LeadCreateForm
			initialValues={initialValues}
			isPending={isPending}
			mode="edit"
			onSubmitLead={handleUpdateLead}
			open={open}
			submitLabel="Salvar alterações"
		/>
	);

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Editar lead</DialogTitle>
						<DialogDescription>
							Atualize os dados do lead selecionado.
						</DialogDescription>
					</DialogHeader>
					{content}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Editar lead</DrawerTitle>
					<DrawerDescription>
						Atualize os dados do lead selecionado.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4">{content}</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
