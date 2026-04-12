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
import type {
	EditScreeningFlowBody,
	ScreeningFlowDTO,
} from "../../services/types";
import { ScreeningFlowCreateForm } from "../screening-flow-create-form";

type ScreeningFlowEditDialogProps = BaseFormProps<
	EditScreeningFlowBody,
	ScreeningFlowDTO
> & {
	isFetchingScreeningFlow: boolean;
	onOpenChange: (open: boolean) => void;
	open: boolean;
};

export function ScreeningFlowEditDialog({
	open,
	onOpenChange,
	submit,
	initialValues,
	isPending,
	isFetchingScreeningFlow,
}: ScreeningFlowEditDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleUpdateScreeningFlow = async (data: EditScreeningFlowBody) => {
		if (!initialValues) {
			return;
		}

		await submit(data);
		onOpenChange(false);
	};

	const content = isFetchingScreeningFlow ? (
		<div className="space-y-4">
			<Skeleton className="h-7 w-full" />
			<Skeleton className="h-40 w-full" />
		</div>
	) : (
		<ScreeningFlowCreateForm
			initialValues={initialValues}
			isPending={isPending}
			mode="edit"
			onSubmitScreeningFlow={handleUpdateScreeningFlow}
			open={open}
			submitLabel="Salvar alterações"
		/>
	);

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Editar screening flow</DialogTitle>
						<DialogDescription>
							Atualize os dados do fluxo de triagem selecionado.
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
					<DrawerTitle>Editar screening flow</DrawerTitle>
					<DrawerDescription>
						Atualize os dados do fluxo de triagem selecionado.
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
