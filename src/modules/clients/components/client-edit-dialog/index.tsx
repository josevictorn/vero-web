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
import type { ClientDTO, EditClientBody } from "../../services/types";
import { ClientCreateForm } from "../client-create-form";

type ClientEditDialogProps = BaseFormProps<
	Omit<EditClientBody, "workspaceId">,
	ClientDTO
> & {
	isFetchingClient: boolean;
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function ClientEditDialog({
	open,
	onOpenChange,
	submit,
	initialValues,
	isPending,
	isFetchingClient,
}: ClientEditDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleUpdateClient = async (
		data: Omit<EditClientBody, "workspaceId">
	) => {
		if (!initialValues) {
			return;
		}

		await submit(data);
		onOpenChange(false);
	};

	const content = isFetchingClient ? (
		<div className="space-y-4">
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-7 w-full" />
		</div>
	) : (
		<ClientCreateForm
			initialValues={initialValues}
			isPending={isPending}
			mode="edit"
			onSubmitClient={handleUpdateClient}
			open={open}
			submitLabel="Salvar alterações"
		/>
	);

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Editar cliente</DialogTitle>
						<DialogDescription>
							Atualize os dados do cliente selecionado.
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
					<DrawerTitle>Editar cliente</DrawerTitle>
					<DrawerDescription>
						Atualize os dados do cliente selecionado.
					</DrawerDescription>
				</DrawerHeader>
				<div className="min-h-0 flex-1 overflow-y-auto px-4">{content}</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
