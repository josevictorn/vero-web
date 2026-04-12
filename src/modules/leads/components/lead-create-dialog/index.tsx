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
import type { CreateLeadBody, CreateLeadResponse } from "../../services/types";
import { LeadCreateForm } from "../lead-create-form";

type LeadCreateDialogProps = BaseFormProps<
	Omit<CreateLeadBody, "workspaceId">,
	CreateLeadResponse
> & {
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function LeadCreateDialog({
	open,
	onOpenChange,
	submit,
	isPending,
}: LeadCreateDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleCreateLead = async (
		data: Omit<CreateLeadBody, "workspaceId">
	) => {
		await submit(data);
		onOpenChange(false);
	};

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Criar lead</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para criar um novo lead.
						</DialogDescription>
					</DialogHeader>
					<LeadCreateForm
						isPending={isPending}
						onSubmitLead={handleCreateLead}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Criar lead</DrawerTitle>
					<DrawerDescription>
						Preencha os campos abaixo para criar um novo lead.
					</DrawerDescription>
				</DrawerHeader>
				<LeadCreateForm
					className="px-4"
					isPending={isPending}
					onSubmitLead={handleCreateLead}
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
