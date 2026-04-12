import { Button } from "@/common/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/components/ui/dialog";

interface ScreeningFlowDeleteDialogProps {
	isPending: boolean;
	onConfirm: () => Promise<void>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
	screeningFlowName?: string;
}

export function ScreeningFlowDeleteDialog({
	open,
	onOpenChange,
	onConfirm,
	isPending,
	screeningFlowName,
}: ScreeningFlowDeleteDialogProps) {
	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remover screening flow</DialogTitle>
					<DialogDescription>
						Tem certeza que deseja remover
						{screeningFlowName
							? ` ${screeningFlowName}`
							: " este fluxo de triagem"}
						? Essa ação não pode ser desfeita.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						disabled={isPending}
						onClick={() => onOpenChange(false)}
						variant="outline"
					>
						Cancelar
					</Button>
					<Button
						disabled={isPending}
						isLoading={isPending}
						onClick={async () => {
							await onConfirm();
							onOpenChange(false);
						}}
						variant="destructive"
					>
						Remover
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
