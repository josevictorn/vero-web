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
import { useMediaQuery } from "@/common/hooks/use-media-query";
import type {
	CreateClientBody,
	CreateClientResponse,
} from "../../services/types";
import { ClientCreateForm } from "../client-create-form";

type ClientCreateDialogProps = BaseFormProps<
	Omit<CreateClientBody, "workspaceId">,
	CreateClientResponse
> & {
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function ClientCreateDialog({
	open,
	onOpenChange,
	submit,
	isPending,
}: ClientCreateDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleCreateClient = async (
		data: Omit<CreateClientBody, "workspaceId">
	) => {
		await submit(data);
		onOpenChange(false);
	};

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Criar cliente</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para cadastrar um novo cliente.
						</DialogDescription>
					</DialogHeader>
					<ClientCreateForm
						isPending={isPending}
						onSubmitClient={handleCreateClient}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Criar cliente</DrawerTitle>
					<DrawerDescription>
						Preencha os campos abaixo para cadastrar um novo cliente.
					</DrawerDescription>
				</DrawerHeader>
				<ClientCreateForm
					className="px-4"
					isPending={isPending}
					onSubmitClient={handleCreateClient}
				/>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
