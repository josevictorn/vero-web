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
	CreateScreeningFlowBody,
	CreateScreeningFlowResponse,
} from "../../services/types";
import { ScreeningFlowCreateForm } from "../screening-flow-create-form";

type ScreeningFlowCreateDialogProps = BaseFormProps<
	CreateScreeningFlowBody,
	CreateScreeningFlowResponse
> & {
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function ScreeningFlowCreateDialog({
	open,
	onOpenChange,
	submit,
	isPending,
}: ScreeningFlowCreateDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleCreateScreeningFlow = async (data: CreateScreeningFlowBody) => {
		await submit(data);
		onOpenChange(false);
	};

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Criar screening flow</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para criar um novo fluxo de triagem.
						</DialogDescription>
					</DialogHeader>
					<ScreeningFlowCreateForm
						isPending={isPending}
						onSubmitScreeningFlow={handleCreateScreeningFlow}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={onOpenChange} open={open}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Criar screening flow</DrawerTitle>
					<DrawerDescription>
						Preencha os campos abaixo para criar um novo fluxo de triagem.
					</DrawerDescription>
				</DrawerHeader>
				<ScreeningFlowCreateForm
					className="px-4"
					isPending={isPending}
					onSubmitScreeningFlow={handleCreateScreeningFlow}
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
