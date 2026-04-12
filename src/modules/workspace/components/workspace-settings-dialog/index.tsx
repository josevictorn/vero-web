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
import type { EditWorkspaceBody, WorkspaceDTO } from "../../services/types";
import { WorkspaceSettingsForm } from "../workspace-settings-form";

type WorkspaceSettingsDialogProps = BaseFormProps<EditWorkspaceBody, WorkspaceDTO> &
	{
		isFetchingWorkspace: boolean;
		onOpenChange: (open: boolean) => void;
		open: boolean;
	};

export function WorkspaceSettingsDialog({
	open,
	onOpenChange,
	submit,
	initialValues,
	isPending,
	isFetchingWorkspace,
}: WorkspaceSettingsDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleUpdateWorkspace = async (data: EditWorkspaceBody) => {
		await submit(data);
		onOpenChange(false);
	};

	let content: React.ReactNode;

	if (isFetchingWorkspace) {
		content = (
			<div className="space-y-4">
				<Skeleton className="h-7 w-full" />
				<Skeleton className="h-7 w-full" />
				<Skeleton className="h-7 w-full" />
				<Skeleton className="h-7 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		);
	} else if (initialValues) {
		content = (
			<WorkspaceSettingsForm
				initialValues={initialValues}
				isPending={isPending}
				onSubmitWorkspace={handleUpdateWorkspace}
				open={open}
			/>
		);
	} else {
		content = (
			<p className="text-muted-foreground text-sm">
				Nenhum escritório encontrado para configurar.
			</p>
		);
	}

	if (isDesktop) {
		return (
			<Dialog onOpenChange={onOpenChange} open={open}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>Configurações do escritório</DialogTitle>
						<DialogDescription>
							Visualize e atualize as informações do escritório.
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
					<DrawerTitle>Configurações do escritório</DrawerTitle>
					<DrawerDescription>
						Visualize e atualize as informações do escritório.
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
